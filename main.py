from flask import Flask, request
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

# Drink recipe Search
'''
@Purpose: Searches the database for specific drink
@Params:    names       [STRING]            Search for specific name.
            tags        [STRING]            Searches recipes with specific tags.
            results     [UNSIGNED INT]      Specifies number of return results.
@Return: Returns drink(s) information
@Example: {{base_url}}/recipes_food/search/?params={{params}}&searchName={{names}}&results={{results}}&tags={{tags}}
'''
@app.route('/apiv{}/recipes_drink/search'.format(_API_VERSION_), methods=['GET'])
def drink_search():
    if request.method == 'GET':
        names = request.args.get('searchname', default='', type=str)
        tags = request.args.get('tags', default=None, type=str)
        results = request.args.get('results', default=10, type=int)

        cur = mysql.connect.cursor()
        cur.execute('''
        SELECT * FROM drinkrecipes 
        WHERE name LIKE '%{}%';
        '''.format(names, tags))

        rv = cur.fetchall()

        return str(rv)

    pass


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
