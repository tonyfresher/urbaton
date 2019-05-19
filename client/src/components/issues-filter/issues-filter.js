import React from 'react';
import b_ from 'b_';

import './issues-filter.css';

const b = b_.with('issues-filter');

class IssuesFilter extends React.Component {
    render() {
        return (
            <div className={b()}>
                <div className={b('arrow')} />
                <select className={b('select')}>
                    <option>{'На голосовании'}</option>
                    <option>{'Сбор денег'}</option>
                </select>
            </div>
        );
    }
}

export default IssuesFilter;
