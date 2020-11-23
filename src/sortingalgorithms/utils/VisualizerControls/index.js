import React from 'react';
// import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const VisualizerControls = ({
    onPlay,
    onPause,
    onBackward,
    onForward,
    playing,
}) => {
    return (
        <div className="VisualizerControls">
            <Icon
                name='step backward'
                size='large'
                onClick={onBackward}
            />
            <Icon
                name={playing ? 'stop' : 'play'}
                size='large'
                onClick={playing ? onPause : onPlay}
            />
            <Icon
                name='step forward'
                size='large'
                onClick={onForward}
            />
        </div>
    );
};

export default VisualizerControls;
