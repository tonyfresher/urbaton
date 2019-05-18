import React from 'react';
import { Link } from 'react-router-dom';
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
        const json = [
            {
                "coordinates": {
                    "sdfsdfs": "sdfsdf"
                },
                "description": "asdasdasd",
                "image": "asdasd",
                "name": "Anton",
                "uid": "90e08891-976b-4f23-b4a7-a7c7d3405595",
                "votes": 0
            },
            {
                "coordinates": {
                    "asdasd": "1"
                },
                "description": "CHANGED DESCRIPTION",
                "image": "IMAGE_NOT",
                "name": "Antonius",
                "uid": "7ef22cf0-b705-4713-936e-1225b9d28b16",
                "votes": 1
            }
        ];

        this.setState({
            loaded: true,
            issues: json
        });

        // const res = await fetch('https://api.example.com/items');
        // const json = await res.json();

        // try {
        //     this.setState({
        //         loaded: true,
        //         issues: json
        //     });
        // } catch (error) {
        //     this.setState({
        //         loaded: true,
        //         error
        //     });
        // }
    }

    render() {
        const { issues } = this.state;

        return (
            <div className={b()}>
                {issues.map(issue => (
                    <Link to={`/issue/${issue.uid}`}>
                        <Issue
                            image={issue.image}
                            name={issue.name}
                            description={issue.description}
                            votes={issue.votes}
                        />
                    </Link>
                ))}
            </div>
        );
    }
}

export default Issues;
