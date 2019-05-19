import React from 'react';
import b_ from 'b_';

import './action-button.css';

const b = b_.with('action-button');

class ActionButton extends React.Component {
    render() {
        const {
            title,
            onClick
        } = this.props;

        return (
            <div className={b()}>
                <button className={b('button')} type="button" onClick={onClick}>
                    <span>{title}</span>
                </button>
            </div>
        );
    }
}

export default ActionButton;
