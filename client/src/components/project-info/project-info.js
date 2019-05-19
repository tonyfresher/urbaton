import React from 'react';
import b_ from 'b_';

import './project-info.css';

const b = b_.with('project-info');

class ProjectInfo extends React.Component {
    render() {
        const {
            name,
            description,
            cost
        } = this.props;

        return (
            <div className={b()}>
                <h2>{name}</h2>
                <span>{cost}</span>
                <span>{description}</span>
            </div>
        );
    }
}

export default ProjectInfo;
