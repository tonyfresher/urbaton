import psycopg2 as pg
from psycopg2.extras import NamedTupleCursor
from typing import List, NamedTuple, Dict, Any


class PostgresClient:
    def __init__(self, host, port, dbname, user, password, cert):
        self.connection = pg.connect(host=host, port=port, dbname=dbname,
                                     user=user, password=password, sslrootcert=cert)

    def get_issues(self): ...

postgres = PostgresClient(host, port, dbname, user, password, cert)
