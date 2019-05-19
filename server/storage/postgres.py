from psycopg2.extras import NamedTupleCursor
from settings import settings

import psycopg2 as pg
import logging
import json


class PostgresClient:
    def __init__(self, host, port, dbname, user, password):
        self.connection = pg.connect(host=host, port=port, dbname=dbname,
                                     user=user, password=password,
                                     target_session_attrs='read-write', sslmode='verify-full')

    def get_issues(self):
        QUERY = '''
            SELECT
                issues.uid,
                issues.name,
                issues.description,
                issues.image,
                issues.coordinates,
                issues.votes 
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
        QUERY = '''
            INSERT INTO issues(uid, name, description, image, coordinates)
            VALUES (%(uid)s, %(name)s, %(description)s, %(image)s, %(coordinates)s)
        '''
        self._execute(
            QUERY,
            uid=uid,
            name=name,
            description=description,
            image=image,
            coordinates=json.dumps(coordinates)
        )
        logging.info('Successfully created')

    def get_issue_by_id(self, request_id):
        QUERY = f'''
            SELECT uid, name, description, image, coordinates, votes 
            FROM issues
            WHERE issues.uid = %(request_id)s;
        '''
        response = self._fetch(QUERY, request_id=request_id)

        if not response:
            return {}

        issue = self._fetch(QUERY, request_id=request_id)[0]
        logging.info(f'Fetched issue: {issue}')

        return self.get_dict(issue)

    def put_issue(self, request_id, name, description, image, coordinates):
        QUERY = self.get_query(request_id, name, description, image, coordinates)

        self._execute(
            QUERY,
            request_id=request_id,
            name=name,
            description=description,
            image=image,
            coordinates=json.dumps(coordinates)
        )
        logging.info('Successfully updated')

    def delete_issue_by_id(self, request_id):
        QUERY = '''
            DELETE FROM issues
            WHERE issues.uid = %(request_id)s
        '''
        self._execute(QUERY, request_id=request_id)
        logging.info('Successfully deleted')

    def get_issue_votes_by_id(self, request_id):
        QUERY = '''
            SELECT votes
            FROM issues
            WHERE issues.uid = %(request_id)s
        '''
        votes = self._fetch(QUERY, request_id=request_id)
        logging.info(f'Fetched {votes} votes from issue with {request_id}')

        return votes

    def post_issue_votes_by_id(self, request_id):
        QUERY = '''
            UPDATE issues
            SET votes = issues.votes + 1
            WHERE issues.uid = %(request_id)s
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
            'uid': issue.uid,
            'name': issue.name,
            'description': issue.description,
            'image': issue.image,
            'coordinates': issue.coordinates,
            'votes': issue.votes,
        }

    @staticmethod
    def get_project_dict(project):
        return {
            'uid': project.uid,
            'name': project.name,
            'description': project.description,
            'cost': project.cost
        }

    @staticmethod
    def get_query(request_id, name, description, image, coordinates):
        QUERY = 'UPDATE issues SET '
        if name:
            QUERY += 'name = %(name)s, '
        if description:
            QUERY += 'description = %(description)s, '
        if image:
            QUERY += 'image = %(image)s, '
        if coordinates:
            QUERY += 'coordinates = %(coordinates)s '
        else:
            QUERY = QUERY[:-2] + ' '

        return QUERY + 'WHERE issues.uid = %(request_id)s'

    def get_project(self, request_id):
        QUERY = '''
            SELECT
                projects.uid,
                projects.name,
                projects.description,
                projects.cost
            FROM projects
            JOIN issues
            ON projects.uid = issues.project
            WHERE issues.uid = %(request_id)s;
        '''

        response = self._fetch(QUERY, request_id=request_id)

        if not response:
            return {}

        project = self._fetch(QUERY, request_id=request_id)[0]
        logging.info(f'Fetched issue: {project}')

        return self.get_project_dict(project)

    def create_project(self, uid, name, description, cost, account):
        QUERY = '''
            INSERT INTO projects(uid, name, description, cost)
            VALUES (%(uid)s, %(name)s, %(description)s, %(cost)s, %(account)s)
        '''
        self._execute(
            QUERY,
            uid=uid,
            name=name,
            description=description,
            cost=cost)
        logging.info('Successfully created')

    def update_project_in_issues(self, request_id, project_id):
        QUERY='''UPDATE issues
            SET project = %(project_id)s
            WHERE issues.uid = %(request_id)s
        '''

        self._execute(QUERY, request_id=request_id, project_id=project_id)

        logging.info("Project connected to issue")


postgres = PostgresClient(settings.PG_HOST, settings.PG_PORT, settings.PG_DBNAME,
                          settings.PG_USER, settings.PG_PASS)
