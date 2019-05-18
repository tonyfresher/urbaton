import React from 'react';
import b_ from 'b_';

import SearchBar from '../../components/search-bar';
import Issues from '../../components/issues';
import './list.css';

const b = b_.with('page-list');

class List extends React.Component {
    render() {
        return (
            <div className={b()}>
                <div className={b('surveys')}>
                    {/* <SearchBar /> */}
                    <Issues />
                </div>
            </div>
        );
    }
}

export default List;
