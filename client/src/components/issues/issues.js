import React from 'react';
import b_ from 'b_';

import Issue from '../issue';

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
        const res = await fetch('http://localhost:5000/issues');
        const json = await res.json();

        try {
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
                {issues.map(issue => (
                    <Issue
                        image={issue.image}
                        name={issue.name}
                        description={issue.description}
                        votes={issue.votes}
                    />
                ))}
            </div>
        );
    }
}

export default Issues;
