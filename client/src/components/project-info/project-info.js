import React from 'react';
import b_ from 'b_';

import MoneyBlock from '../money-block';
import './project-info.css';

const b = b_.with('project-info');

class ProjectInfo extends React.Component {
    render() {
        const {
            uid,
            name,
            description,
            cost
        } = this.props;

        return (
            <div className={b()}>
                <h2 className={b('name')}>{name}</h2>
                <span className={b('description')}>{description}</span>
                <MoneyBlock
                    projectUid={uid}
                    cost={cost}
                    showButton
                />
            </div>
        );
    }
}

export default ProjectInfo;
