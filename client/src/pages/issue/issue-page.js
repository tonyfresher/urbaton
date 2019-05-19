import React from 'react';
import b_ from 'b_';

import BackButton from '../../components/back-button';
import IssueInfo from '../../components/issue-info';
import './issue-page.css';

const b = b_.with('issue-page');

class IssuePage extends React.Component {
    render() {
        return (
            <div className={b()}>
                <BackButton />
                <IssueInfo />
            </div>
        );
    }
}

export default IssuePage;
