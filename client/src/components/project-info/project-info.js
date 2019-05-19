import React from 'react';
import b_ from 'b_';

import ActionButton from '../action-button';
import './project-info.css';

const b = b_.with('project-info');

class ProjectInfo extends React.Component {
    render() {
        const {
            name,
            description
        } = this.props;

        return (
            <div className={b()}>
                <h2 className={b('name')}>{name}</h2>
                <span className={b('description')}>{description}</span>
                <ActionButton title="Поддержать" />
            </div>
        );
    }
}

export default ProjectInfo;
