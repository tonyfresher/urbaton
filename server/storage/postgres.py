from psycopg2.extras import NamedTupleCursor
from settings import settings

import psycopg2 as pg
import logging


class PostgresClient:
    def __init__(self, host, port, dbname, user, password):
        self.connection = pg.connect(host=host, port=port, dbname=dbname,
                                     user=user, password=password,
                                     target_session_attrs='read-write', sslmode='verify-full')

    def get_issues(self):
        QUERY = '''
            SELECT
                uuid, name, description, image, coordinates, votes 
            FROM issues;
        '''

        issues = self._fetch(QUERY)
        issues_str = '\n'.join(map(str, issues))
        logging.info(f'Fetched {len(issues)} issues:\n{issues_str}')
        issues_dict = [
            self.get_dict(issue)
            for issue in issues
        ]

        return issues_dict
    
    def create_issue(self, uid, name, description, image, coordinates):
        QUERY = f'''
            INSERT INTO issues(uuid, name, description, image, coordinates)
            VALUES ({uid}, {name}, {description}, {image}, {coordinates})
        '''
        self._execute(QUERY)
        logging.info('Successfully created')

    def get_issue_by_id(self, request_id):
        QUERY = f'''
            SELECT uid, name, description, image, coordinates, votes 
            FROM issues
            WHERE uuid = {request_id};
        '''
        issue = self._fetch(QUERY, request_id=request_id)
        logging.info(f'Fetched issue: {issue}')

        return self.get_dict(issue)

    def put_issue(self, request_id, name, description, image, coorditates):
        QUERY = f'''
            UPDATE issues
            SET name = {name},
                description = {description},
                image = {image},
                coordinated = {coorditates}
            WHERE uuid = {request_id}
        '''
        self._execute(QUERY, request_id=request_id)
        logging.info('Successfully updated')

    def delete_issue_by_id(self, request_id):
        QUERY = f'''
            DELETE FROM issues
            WHERE uuid = {request_id}
        '''
        self._execute(QUERY, request_id=request_id)
        logging.info('Successfully deleted')

    def get_issue_votes_by_id(self, request_id):
        QUERY = f'''
            SELECT votes
            FROM issues
            WHERE uuid = {request_id}
        '''
        votes = self._fetch(QUERY, request_id=request_id)
        logging.info(f'Fetched {votes} votes from issue with {request_id}')

        return votes

    def post_issue_vote_by_id(self, request_id):
        QUERY = f'''
            UPDATE issues
            SET vote = vote + 1
            WHERE uuid = {request_id}
        '''
        self._execute(QUERY, request_id=request_id)
        logging.info("Vote added")

    def _execute(self, query, **kwargs) -> None:
        with self.connection.cursor() as cursor:
            cursor.execute(query, kwargs)
        
        self.connection.commit()

    def _fetch(self, query, **kwargs):
        with self.connection.cursor(cursor_factory=NamedTupleCursor) as cursor:
            cursor.execute(query, kwargs)

            fetched = cursor.fetchall()

            return fetched

    @staticmethod
    def get_dict(issue):
        return {
            'uid': issue.uuid,
            'name': issue.name,
            'description': issue.description,
            'image': issue.image,
            'coordinates': issue.coordinates,
            'votes': issue.votes,
        }

postgres = PostgresClient(settings.PG_HOST, settings.PG_PORT, settings.PG_DBNAME,
                          settings.PG_USER, settings.PG_PASS)
