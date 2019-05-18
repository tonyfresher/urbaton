import psycopg2 as pg
from psycopg2.extras import NamedTupleCursor

from settings import settings


class PostgresClient:
    def __init__(self, host, port, dbname, user, password):
        self.connection = pg.connect(host=host, port=port, dbname=dbname,
                                     user=user, password=password,
                                     target_session_attrs='read-write', sslmode='verify-full')

    def get_issues(self): ...

postgres = PostgresClient(settings.PG_HOST, settings.PG_PORT, settings.PG_DBNAME,
                          settings.PG_USER, settings.PG_PASS)
