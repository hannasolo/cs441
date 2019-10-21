from flask import Flask
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
@Params:    params      [UNSIGNED INT]      Specifies specific return results.
            names       [STRING]            Search for specific name.
            results     [UNSIGNED INT]      Specifies number of return results.
            tags        [STRING]            Searches recipes with specific tags.

@Example: {{base_url}}/recipes_food/?params={{params}}&searchName={{names}}&results={{results}}&tags={{tags}}
'''

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
