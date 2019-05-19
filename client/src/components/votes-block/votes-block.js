import React from 'react';
import b_ from 'b_';

import ProgressBar from '../progress-bar';
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
        const { uid, voted } = this.state;

        event.preventDefault();

        this.setState(({ voted }) => ({ voted: !voted }));

        fetch(`http://130.193.41.152:5000/issues/${uid}/votes`, {
            method: 'PUT',
            body: JSON.stringify({ enable: !voted })
        });
    }

    render() {
        const { voted } = this.state;
        const { uid, votes } = this.props;

        return (
            <div className={b()}>
                <ProgressBar value={votes} />
                <div className={b('caption')}>
                    <div className={b('progress')}>
                        <span className={b('percentage')}>
                            {`${(Math.min(votes, 150) / 150 * 100).toFixed(0)}%`}
                        </span>
                        <span className={b('caption-label')}>
                            {'Голосование'}
                        </span>
                    </div>
                    <button className={b('vote-button', { checked: voted })} onClick={this.toggleVote}>
                        <div className={b('votes-count-wrapper')}>
                            <div className={b('thumb')} />
                            <span className={b('votes-count')}>{`${votes} голосов`}</span>
                        </div>
                        <span className={b('caption-label')}>
                            {'Собрано'}
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}

export default VotesBlock;
