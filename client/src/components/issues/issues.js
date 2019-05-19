import React from 'react';
import b_ from 'b_';

import IssueCard from '../issue-card';

import IssuesFilter from '../issues-filter';
import SearchBar from '../search-bar';
import Loader from '../loader';
import './issues.css';

const b = b_.with('issues');

function shouldShowIssue(issue, query) {
    return issue.name.toLowerCase().includes(query.toLowerCase()) ||
        issue.coordinates.address.toLowerCase().includes(query.toLowerCase()) ||
        issue.description.toLowerCase().includes(query.toLowerCase());
}

class Issues extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            query: '',
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

    onInput = event => {
        const { value: query } = event.target;

        this.setState(() => ({ query }));
    }

    renderLoader() {
        return (<Loader />);
    }

    renderList() {
        const {
            query,
            issues
        } = this.state;

        return (
            <>
                <IssuesFilter />
                <SearchBar onInput={this.onInput} />
                {issues
                    .filter(issue => shouldShowIssue(issue, query))
                    .map(issue => (
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
            </>
        );
    }

    render() {
        const { loaded } = this.state;

        return (
            <div className={b()}>
                {loaded ? this.renderList() : this.renderLoader()}
            </div>
        );
    }
}

export default Issues;
