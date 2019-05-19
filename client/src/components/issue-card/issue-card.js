import React from 'react';
import { Link } from 'react-router-dom';
import b_ from 'b_';

import VotesBlock from '../votes-block';
import './issue-card.css';

const b = b_.with('issue-card');

class IssueCard extends React.Component {
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
                    <VotesBlock votes={votes} />
                </div>
            </Link>
        );
    }
}

export default IssueCard;
