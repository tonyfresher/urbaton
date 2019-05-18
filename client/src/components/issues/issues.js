import React from 'react';
import b_ from 'b_';
import './issues.css';

const b = b_.with('app');

class Issues extends React.Component {
    render() {
        return (
            <div className={b()}>
                <div>Привет!</div>
                <div>Как дела?</div>
            </div>
        );
    }
}

export default Issues;
