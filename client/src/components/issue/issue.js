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
                <div className={b('info')}>
                    <h2 className={b('name')}>{name}</h2>
                    <span className={b('description')}>{description}</span>
                    <div className={b('votes')}>{votes}</div>
                </div>
            </div>
        );
    }
}

export default Issue;
