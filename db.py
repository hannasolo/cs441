import MySQLdb
from flask import current_app, g
from flask.cli import with_appcontext

def get_db():
    if 'db' not in g:
        g.db = MySQLdb.connect(
            host
        )
