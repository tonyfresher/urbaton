import React from 'react';
import b_ from 'b_';

import './progress-bar.css';

const b = b_.with('progress-bar');

class ProgressBar extends React.Component {
    render() {
        const {
            value,
            max
        } = this.props;

        return (
            <div className={b()}>
                <div className={b('bar-wrapper')}>
                    <progress className={b('bar')} value={value || 0} max={max || 0} />
                </div>
            </div>
        );
    }
}

export default ProgressBar;
