import React from 'react';
import b_ from 'b_';

import './back-button.css';

const b = b_.with('back-button');

function goBack() {
    window.history.back();
}

class BackButton extends React.Component {
    render() {
        return (
            <button className={b()} type="button" onClick={goBack}>
                <svg className={b('arrow')} viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
            </button>
        );
    }
}

export default BackButton;
