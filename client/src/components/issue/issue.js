import React from 'react';
import b_ from 'b_';
import './issue.css';

const b = b_.with('issue');

class Issue extends React.Component {
    render() {
        return (
            <div className={b()}>
                <img />
                <div>Привет!</div>
                <div>Как дела?</div>
            </div>
        );
    }
}

export default Issue;
