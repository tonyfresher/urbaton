import React from 'react';
import b_ from 'b_';
import { isEmpty } from 'lodash';

import Loader from '../loader';
import VotesBlock from '../votes-block';
import ProjectInfo from '../project-info';
import './issue-info.css';

const b = b_.with('issue-info');

async function getIssue(issueUid) {
    const res = await fetch(`http://130.193.41.152:5000/issues/${issueUid}`);

    return res.json();
}

async function getProject(issueUid) {
    const res = await fetch(`http://130.193.41.152:5000/issues/${issueUid}/projects`);
    return res.json();
}

class IssueInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            issue: {},
            project: {},
            error: null
        };
    }

    async componentDidMount() {
        const { uid } = this.props;

        try {
            const issueJson = await getIssue(uid);
            const projectJson = await getProject(uid);

            this.setState({
                loaded: true,
                issue: issueJson,
                project: projectJson
            });
        } catch (error) {
            this.setState({
                loaded: true,
                error
            });
        }
    }

    renderLoader() {
        return (<Loader />);
    }

    renderInfo() {
        const {
            issue,
            project
        } = this.state;

        return (
            <>
                <img className={b('image')} src={issue.image} alt="Фото" />
                <div className={b('info')}>
                    <h2 className={b('name')}>{issue.name}</h2>
                    <span className={b('address')}>{issue.coordinates.address}</span>
                    <span className={b('description')}>{issue.description}</span>
                    {isEmpty(project)
                        ? (<VotesBlock uid={issue.uid} votes={issue.votes} showButton />)
                        : (
                            <ProjectInfo
                                name={project.name}
                                description={project.description}
                                cost={project.cost}
                            />
                        )}
                </div>
            </>
        );
    }

    render() {
        const { loaded } = this.state;

        return (
            <div className={b()}>
                {loaded ? this.renderInfo() : this.renderLoader()}
            </div>
        );
    }
}

export default IssueInfo;
