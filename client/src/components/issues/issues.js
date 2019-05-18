import React from 'react';
import b_ from 'b_';

import Issue from '../issue';

import './issues.css';

const b = b_.with('issues');

class Issues extends React.Component {
    render() {
        return (
            <div className={b()}>
                <Issue />
            </div>
        );
    }
}

export default Issues;
