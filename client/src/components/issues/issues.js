import React from 'react';
import b_ from 'b_';

import IssueCard from '../issue-card';

import IssuesFilter from '../issues-filter';
import SearchBar from '../search-bar';
import './issues.css';

const b = b_.with('issues');

class Issues extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            issues: [],
            error: null
        };
    }

    async componentDidMount() {
        try {
            const res = await fetch('http://130.193.41.152:5000/issues');
            const json = await res.json();

            this.setState({
                loaded: true,
                issues: json
            });
        } catch (error) {
            this.setState({
                loaded: true,
                error
            });
        }
    }

    render() {
        const { issues } = this.state;

        return (
            <div className={b()}>
                <IssuesFilter />
                <SearchBar />
                {issues.map(issue => (
                    <IssueCard
                        uid={issue.uid}
                        image={issue.image}
                        name={issue.name}
                        address={issue.coordinates.address}
                        description={issue.description}
                        votes={issue.votes}
                        key={issue.uid}
                    />
                ))}
            </div>
        );
    }
}

export default Issues;
