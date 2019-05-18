import React from 'react';
import b_ from 'b_';
import './issues.css';

import Issue from '../issue'

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
