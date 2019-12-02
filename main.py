from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import os

'''
=========================================================
                    FLASK PRE-INIT
        DO NOT EDIT BELOW. CONSULT OTHERS BEFORE.
=========================================================
'''
# Application Entry Point
app = Flask(__name__)

# Grab login credentialfor CloudSQL
if os.environ.get('GAE_ENV'):
    app.config.from_json('secrets_gae.json')
else:
    app.config.from_json('secrets.json')

# MySQL Entry Point
mysql = MySQL(app)
_API_VERSION_ = 1
'''
=========================================================
                    FLASK ROUTES
                   ADD THINGS HERE
=========================================================
'''

'''
=========================================================
                    FLASK ROUTES
                     API VER 1
=========================================================
'''
# Post data to drink database
@app.route(f'/apiv{_API_VERSION_}/recipes_drink', methods=['POST'])
def recipes_drink():
    if request.method == 'POST':
        json_obj = request.get_json()

        drink_columns = []
        drink_values = []

        if 'name' in json_obj:
            drink_columns.append('name')
            drink_values.append(json_obj['name'])

        if 'image_url' in json_obj:
            drink_columns.append('image_url')
            drink_values.append(json_obj['image_url'])

        if 'steps_url' in json_obj:
            drink_columns.append('steps')
            drink_values.append(json_obj['steps_url'])

        # Attempt to insert data into the database
        con = mysql.connect

        try:
            cur_insert = con.cursor()

            drink_columns = ','.join(drink_columns)
            query_values = ','.join(['%s' for _ in drink_values])

            query_drink = f'''
            INSERT INTO drinkrecipes({drink_columns}) VALUES ({query_values});
            '''

            cur_insert.execute(query_drink, tuple(drink_values))

            con.commit()
            cur_insert.close()

        except Exception as e:
            # Duplicate data conflict
            if 1062 in e.args:
                return jsonify({'results': str(e), 'response': 409}), 409
            else:
                return jsonify({'results': str(e), 'response': 400}), 400

        primary_key = cur_insert.lastrowid

        if 'tags' in json_obj:
            tag_search = con.cursor()
            tag_insert = con.cursor()

            tags = json_obj['tags']

            query_tag_search_values = ','.join(['%s' for _ in tags])
            query_tag_search = f'''
                SELECT name, tag_id FROM tags WHERE name IN ({query_tag_search_values});
            '''

            tag_search.execute(query_tag_search, tuple(tags))
            rv_tag_search = tag_search.fetchall()
            tag_search.close()

            query_tag_insert_params = [element for pack in rv_tag_search for element in [primary_key, pack[1]]]

            query_tag_insert_values = ','.join(['(%s, %s)' for _ in rv_tag_search])
            query_tag_insert = f'''
            INSERT INTO drinkrecipestags(drinkrecipe_id, tag_id) VALUES {query_tag_insert_values};
            '''

            tag_insert.execute(query_tag_insert, tuple(query_tag_insert_params))
            con.commit()
            tag_insert.close()

        if 'ingredients' in json_obj:
            ingredient_search = con.cursor()
            ingredient_insert = con.cursor()

            ingredients = json_obj['ingredients']

            query_ingredient_search_values = ','.join(['%s' for _ in ingredients])
            query_ingredient_search = f'''
            SELECT name, ingredient_id FROM ingredients WHERE name IN ({query_ingredient_search_values});
            '''

            ingredient_search.execute(query_ingredient_search, tuple(ingredients))
            rv_ingredient_search = ingredient_search.fetchall()
            ingredient_search.close()

            ingredient_insert_values = ','.join(['(%s, %s)' for _ in ingredients])
            ingredient_insert_params = [element for pack in rv_ingredient_search for element in [primary_key, pack[1]]]

            query_ingredient_insert = f'''
            INSERT INTO ingredientdrinkrecipes(drinkrecipe_id, ingredient_id) VALUES {ingredient_insert_values};
            '''

            ingredient_insert.execute(query_ingredient_insert, tuple(ingredient_insert_params))
            con.commit()
            ingredient_insert.close()

    return jsonify({'results': 'POST RECEIVED'}), 201


# Drink recipe Search
'''
@Purpose: Searches the database for specific drink
@Params:    name        [STRING]            Search for specific name.
            tags        [STRING]            Searches recipes with specific tags.
            results     [UNSIGNED INT]      Specifies number of return results.
@Return: Returns drink(s) information
@Example:{{base_url}}/recipes_drink/search?params={{params}}&searchName={{name}}&results={{results}}&tags={{tags}}
'''
@app.route('/apiv{}/recipes_drink/search'.format(_API_VERSION_), methods=['GET'])
def drink_search():
    if request.method == 'GET':
        names = request.args.get('names', default='', type=str)
        tags = request.args.get('tags', default='', type=str)
        results = request.args.get('results', default=10, type=int)

        cur = mysql.connect.cursor()

        # Check if name parameter has been passed in
        if len(names) != 0:
            names_spliced = tuple(names.split(' '))
            query_names = []
            parameter_names = []

            # Build query for name
            for name in names_spliced:
                query_names.append('''OR dr.name LIKE %s''')
                parameter_names.append(''.join(['%', name, '%']))

            # Parameterize names for type sanitation
            names_spliced = tuple(parameter_names)

            query_names.pop()
            sql_names = ' '.join(query_names)
        else:
            names_spliced = ('%%',)
            sql_names = ''

        # Check if the tags parameter has been passed in
        if len(tags) != 0:
            tags_spliced = tuple(tags.split(','))
            query_tags = ['''HAVING tags_name LIKE %s''']
            parameter_tags = []

            # Build query for tags
            for tag in tags_spliced:
                parameter_tags.append(''.join(['%', tag.replace('&', '%%'), '%']))
                query_tags.append(''' OR tags_name LIKE %s''')

            # Parameterize tags for type sanitation
            tags_spliced = tuple(parameter_tags)

            query_tags.pop()
            sql_tags = ''.join(query_tags)
        else:
            tags_spliced = ()
            sql_tags = ''

        # Combine the sql query
        sql_query = f'''
        SELECT dr.drinkrecipe_id, dr.name, dr.steps, dr.ratings, dr.image_url, GROUP_CONCAT(t.name) 
            as tags_name FROM drinkrecipes dr
            INNER JOIN drinkrecipestags drt on dr.drinkrecipe_id = drt.drinkrecipe_id
            INNER JOIN tags t on drt.tag_id = t.tag_id
            WHERE dr.name LIKE %s {sql_names}
            GROUP BY dr.drinkrecipe_id, dr.name, dr.steps, dr.ratings, dr.image_url ASC {sql_tags}
            LIMIT %s;
        '''

        # Parameterize look-up
        query_parameters = (names_spliced + tags_spliced + (results,))

        cur.execute(sql_query, query_parameters)

        # Fetch and close cursor
        rv = cur.fetchall()
        cur.close()

        # Formatting for the JSON response
        names_json = ('id', 'name', 'steps_url', 'ratings', 'image_url', 'tags')
        json_response = {'recipes': []}

        for recipe in rv:
            recipe = list(recipe)
            recipe[5] = recipe[5].split(',')
            json_response['recipes'].append(
                dict(zip(names_json, recipe)))

        json_response['results'] = len(rv)

        return jsonify(json_response)


# Food recipe Search
'''
@Purpose: Searches the database for specific food
@Params:    name        [STRING]            Search for specific name.
            tags        [STRING]            Searches recipes with specific tags.
            results     [UNSIGNED INT]      Specifies number of return results.
@Return: Returns food(s) information
@Example: {{base_url}}/recipes_food/search/?params={{params}}&searchName={{name}}&results={{results}}&tags={{tags}}
'''
@app.route('/apiv{}/recipes_food/search'.format(_API_VERSION_), methods=['GET'])
def food_search():
    if request.method == 'GET':
        name = request.args.get('searchname', default='', type=str)
        tags = request.args.get('tags', default=None, type=str)
        results = request.args.get('results', default=10, type=int)

        cur = mysql.connect.cursor()

        cur.execute('''
        SELECT * FROM foodrecipes 
        WHERE name LIKE '%{}%' AND (tags LIKE '%{}%')
        LIMIT {};
        '''.format(name, tags, results))

        rv = cur.fetchall()
        return str(rv)


# Get Food Recipe
'''
@Purpose: Retrieves a specific recipe based on name or ID
@Params:    name       [STRING]            Search for specific name.
@Return: Returns food information
@Example: {{base_url}}/recipes_food/get/?params={{params}}&id={{name}}
'''
@app.route('/apiv{}/recipes_food/get'.format(_API_VERSION_), methods=['GET'])
def get_food():
    if request.method == 'GET':
        id = request.args.get('id', default='', type=str)
        cur = mysql.connect.cursor()
        cur.execute('''
        SELECT * FROM foodrecipes 
        WHERE foodrecipe_id LIKE '%{}%')
        '''.format(id))

        rv = cur.fetchall()
        return str(rv)


'''
=========================================================
                    FLASK ROUTES
                    TEST DATABASE
=========================================================
'''

'''
@Purpose: This is an example route for a get function
@Example: {{url}}/test/{{id}}
@Result: Returns a tuple of ({{id}}, {{name}}, {{last_name}})
'''

"""
@app.route('/test/<int:id>', methods=['GET'])
def example(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM mock_table WHERE table_id={}'.format(id))
    rv = cur.fetchall()

    return str(rv)
"""


@app.route('/')
def index():
    return str('Welcome to the drink recipe API')
