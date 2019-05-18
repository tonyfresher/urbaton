import React from 'react';
import b_ from 'b_';
import './search-bar.css';

const b = b_.with('search-bar');

class Issues extends React.Component {
    render() {
        return (
            <div className={b()}>
                <input type="text" />
            </div>
        );
    }
}

export default Issues;
