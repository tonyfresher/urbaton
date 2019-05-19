import React from 'react';
import b_ from 'b_';

import SearchBar from '../../components/search-bar';
import Issues from '../../components/issues';
import AddButton from '../../components/add-button';

import './list.css';

const b = b_.with('list-page');

class List extends React.Component {
    render() {
        return (
            <div className={b()}>
                <SearchBar />
                <Issues />
                <AddButton />
            </div>
        );
    }
}

export default List;
