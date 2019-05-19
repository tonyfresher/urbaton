import React from 'react';
import b_ from 'b_';

import './search-bar.css';

const b = b_.with('search-bar');

class SearchBar extends React.Component {
    render() {
        return (
            <div className={b()}>
                <div className={b('lens')} />
                <input className={b('input')} type="text" placeholder="Поиск" />
            </div>
        );
    }
}

export default SearchBar;
