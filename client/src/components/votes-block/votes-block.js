import React from 'react';
import b_ from 'b_';

import ProgressBar from '../progress-bar';
import ActionButton from '../action-button';
import './votes-block.css';

const b = b_.with('votes-block');

class VotesBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            voted: false
        };
    }

    toggleVote = event => {
        const { voted } = this.state;
        const { uid } = this.props;

        event.preventDefault();

        this.setState(({ voted }) => ({ voted: !voted }));

        fetch(`http://130.193.41.152:5000/issues/${uid}/votes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ enable: !voted })
        });
    }

    render() {
        const { voted } = this.state;
        const {
            uid,
            votes,
            showButton
        } = this.props;

        const votesCount = votes + (voted ? 1 : 0);

        return (
            <div className={b()}>
                <ProgressBar value={votesCount || 0} />
                <div className={b('caption')}>
                    <div className={b('progress')}>
                        <span className={b('percentage')}>
                            {`${(Math.min(votesCount, 150) / 150 * 100).toFixed(0)}%`}
                        </span>
                        <span className={b('caption-label')}>
                            {'Голосование'}
                        </span>
                    </div>
                    <button className={b('vote-button', { checked: voted })} onClick={this.toggleVote}>
                        <div className={b('votes-count-wrapper')}>
                            <div className={b('thumb')} />
                            <span className={b('votes-count')}>{`${votesCount} голосов`}</span>
                        </div>
                        <span className={b('caption-label')}>
                            {'Собрано'}
                        </span>
                    </button>
                </div>
                {showButton && <ActionButton
                    title={voted ? 'Убрать голос' : 'Проголосовать' }
                    onClick={this.toggleVote}
                    />}
            </div>
        );
    }
}

export default VotesBlock;
