import React from 'react';
import b_ from 'b_';

import './issue.css';

const b = b_.with('issue');

class Issue extends React.Component {
    render() {
        const {
            image,
            name,
            description,
            votes
        } = this.props;

        return (
            <div className={b()}>
                <img className={b('image')} src={image} alt="Фото" />
                <div className={b('name')}>{name}</div>
                <div className={b('description')}>{description}</div>
                <div className={b('votes')}>{votes}</div>
            </div>
        );
    }
}

export default Issue;
