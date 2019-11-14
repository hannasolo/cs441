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

# Grab login credentials for CloudSQL
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
        name = json_obj['name']
        #image_url = request.form.get('image_url')

        con = mysql.connect
        cur = con.cursor()

        cur.execute(f'''
        INSERT INTO drinkrecipes(name) VALUES ('AAA');        
        ''')

        con.commit()
        cur.close()

        print(name)

    return 'POST RECEIVED'


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


@app.route('/test/<int:id>', methods=['GET'])
def example(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM mock_table WHERE table_id={}'.format(id))
    rv = cur.fetchall()

    return str(rv)


@app.route('/')
def users():
    cur = mysql.connection.cursor()
    cur.execute(''' SELECT * FROM mock_table WHERE first_name="tim"''')
    rv = cur.fetchall()

    return str(rv)
