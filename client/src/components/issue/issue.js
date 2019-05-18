import React from 'react';
import { Link } from 'react-router-dom';
import b_ from 'b_';

import './issue.css';

const b = b_.with('issue');

class Issue extends React.Component {
    render() {
        const {
            uid,
            image,
            name,
            address,
            description,
            votes
        } = this.props;

        return (
            <Link className={b()} to={`/issue/${uid}`}>
                <img className={b('image')} src={image} alt="Фото" />
                <div className={b('info')}>
                    <h2 className={b('name')}>{name}</h2>
                    <span className={b('address')}>{address}</span>
                    <span className={b('description')}>{description}</span>
                    <div className={b('votes')}>{votes}</div>
                </div>
            </Link>
        );
    }
}

export default Issue;
