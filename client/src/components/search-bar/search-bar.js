import React from 'react';
import b_ from 'b_';
import './search-bar.css';

const b = b_.with('search-bar');

class Issues extends React.Component {
    render() {
        return (
            <div className={b()}>
                <div>Привет!</div>
                <div>Как дела?</div>
            </div>
        );
    }
}

export default Issues;
