import React from 'react';
import b_ from 'b_';

import './loader.css';

const b = b_.with('loader');

class Loader extends React.Component {
    render() {
        return (
            <div className={b()}>
                <div className={b('ring')}>
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        );
    }
}

export default Loader;
