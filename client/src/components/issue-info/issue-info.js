import React from 'react';
import b_ from 'b_';

import Loader from '../loader';
import VotesBlock from '../votes-block';
import './issue-info.css';

const b = b_.with('issue-info');

class IssueInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            issue: {},
            project: null,
            error: null
        };
    }

    async componentDidMount() {
        const { uid } = this.props;

        try {
            const res = await fetch(`http://130.193.41.152:5000/issues/${uid}`);
            const json = await res.json();

            this.setState({
                loaded: true,
                issue: json
            });
        } catch (error) {
            this.setState({
                loaded: true,
                error
            });
        }
    }

    renderLoader() {
        return (<Loader />);
    }

    renderInfo() {
        const {
            issue: {
                uid,
                image,
                name,
                coordinates: { address } = {},
                description,
                votes
            }
        } = this.state;

        return (
            <>
                <img className={b('image')} src={image} alt="Фото" />
                <div className={b('info')}>
                    <h2 className={b('name')}>{name}</h2>
                    <span className={b('address')}>{address}</span>
                    <span className={b('description')}>{description}</span>
                    <VotesBlock uid={uid} votes={votes} showButton />
                </div>
            </>
        );
    }

    render() {
        const { loaded } = this.state;

        return (
            <div className={b()}>
                {loaded ? this.renderInfo() : this.renderLoader()}
            </div>
        );
    }
}

export default IssueInfo;
