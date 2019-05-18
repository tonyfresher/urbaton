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

        return issues
    
    def create_issue(self, name, description, image, coordinates):
        QUERY = '''
            INSERT INTO issues(uuid, name, description, image, coordinates)
            VALUES ({}, {}, {}, {}, {})
        '''.format(*args)

    def get_issue_by_id(self, request_id):
        QUERY = '''
            SELECT issue.uid, issue.name, issue.description, issue.image, issue.coordinates, issue.votes 
            FROM issues as issue
                JOIN survey_audience_requests as request ON request.survey_id = survey.id
            WHERE request.uuid = %(request_id)s;
        '''
        issue = self._fetch(QUERY, request_id=request_id)

        logging.info(
            'Fetched issue: \n{issue}'
                .format(issue=str(issue))
        )

        return issue

    def put_issue(self, name='', description='', image='', coorditates={}):
        # name = 
        QUERY = '''
            UPDATE issues
            SET 
        '''

    def delete_issue_by_id(self, request_id):
        QUERY = '''
        '''

    def get_issue_votes_by_id(self, request_id):
        QUERY = '''
            SELECT issue.votes
            FROM issues as issue
            WHERE request.uuid = %(request_id)s
        '''
        votes = self._fetch(QUERY, request_id=request_id)

        logging.info(
            'Fetched {} votes from issue with {}'
                .format(str(votes), str(request_id))
        )

        return votes

    def post_issue_vote_by_id(self, request_id):
        QUERY = '''
        '''

    def _execute(self, query, **kwargs) -> None:
        with self.connection.cursor() as cursor:
            cursor.execute(query, kwargs)
        
        self.connection.commit()

    def _fetch(self, query, **kwargs):
        with self.connection.cursor(cursor_factory=NamedTupleCursor) as cursor:
            cursor.execute(query, kwargs)

            fetched = cursor.fetchall()

            return fetched

postgres = PostgresClient(settings.PG_HOST, settings.PG_PORT, settings.PG_DBNAME,
                          settings.PG_USER, settings.PG_PASS)
