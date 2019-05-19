import React from 'react';
import { Link } from 'react-router-dom';
import b_ from 'b_';

import './action-button.css';

const b = b_.with('action-button');

class ActionButton extends React.Component {
    render() {
        return (
            <div className={b()}>
                <Link to="/create">
                    <div className={b('button')}>
                        <svg className={b('plus')} viewBox="0 0 24 24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                            <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                    </div>
                </Link>
            </div>
        );
    }
}

export default ActionButton;
