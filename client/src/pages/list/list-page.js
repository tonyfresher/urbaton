import React from 'react';
import b_ from 'b_';

import Issues from '../../components/issues';
import AddButton from '../../components/add-button';

import './list-page.css';

const b = b_.with('list-page');

class ListPage extends React.Component {
    render() {
        return (
            <div className={b()}>
                <Issues />
                <AddButton />
            </div>
        );
    }
}

export default ListPage;
