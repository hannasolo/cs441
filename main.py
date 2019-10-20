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
if os.environ.get('GAE_ENV') == None:
    app.config.from_json('secrets.json')
else:
    app.config.from_json('secrets_gae.json')

# MySQL Entry Point
mysql = MySQL(app)

'''
=========================================================
                    FLASK ROUTES
                   ADD THINGS HERE
=========================================================
'''

@app.route('/')
def users():
    cur = mysql.connection.cursor()
    cur.execute(''' SELECT * FROM mock_table WHERE first_name="tim"''')
    rv = cur.fetchall()

    return str(rv)

