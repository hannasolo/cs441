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
        name = request.args.get('searchname', default='', type=str)
        tags = request.args.get('tags', default='', type=str)
        results = request.args.get('results', default=10, type=int)

        cur = mysql.connect.cursor()

        # Check if the tags parameter has been passed in
        if len(tags) != 0:
            tags_splited = tuple(tags.split(','))
            query_tags = [' AND (']

            for _ in tags_splited:
                query_tags.append(f't.name LIKE %s OR ')

            sql_tags = ''.join(query_tags)[:-3] + ') LIMIT %s;'

        sql_query = ''.join(['''
        SELECT DISTINCT dr.drinkrecipe_id, dr.name, steps, ratings, image_url FROM drinkrecipes dr
        INNER JOIN drinkrecipestags drt ON dr.drinkrecipe_id = drt.drinkrecipe_id
        INNER JOIN tags t ON t.tag_id = drt.tag_id
        WHERE dr.name LIKE %s
        ''', sql_tags])

        query_parameters = (f'%{name}%',) + tags_splited + (results,)

        cur.execute(sql_query, query_parameters)

        rv = cur.fetchall()

        # Formatting for the JSON response
        names_json = ('id', 'name', 'steps_url', 'ratings', 'image_url')
        json_response = {'recipes': []}

        for recipe in rv:
            json_response['recipes'].append(
                dict(zip(names_json, recipe)))

        cur.close()

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
