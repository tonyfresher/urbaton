import React from 'react';
import b_ from 'b_';

import ProgressBar from '../progress-bar';
import ActionButton from '../action-button';
import './money-block.css';

const b = b_.with('money-block');

class MoneyBlock extends React.Component {
    pay() {}

    render() {
        const {
            cost,
            showButton
        } = this.props;

        const money = 10000;

        return (
            <div className={b()}>
                <ProgressBar value={money} max={cost} />
                <div className={b('caption')}>
                    <div className={b('progress')}>
                        <span className={b('percentage')}>
                            {`${(Math.min(money, cost) / cost * 100).toFixed(0)}%`}
                        </span>
                        <span className={b('caption-label')}>
                            {'Сбор средств'}
                        </span>
                    </div>
                    <div className={b('money')}>
                        <span className={b('money-count')}>{`${money}/${cost} ₽`}</span>
                        <span className={b('caption-label')}>
                            {'Собрано'}
                        </span>
                    </div>
                </div>
                {showButton && (
                    <ActionButton
                        title="Поддержать"
                        onClick={this.pay}
                    />
                )}
            </div>
        );
    }
}

export default MoneyBlock;
