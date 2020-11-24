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
                size='big'
                onClick={onBackward}
            />
            <Icon
                name={playing ? 'stop' : 'play'}
                size='big'
                onClick={playing ? onPause : onPlay}
            />
            <Icon
                name='step forward'
                size='big'
                onClick={onForward}
            />
        </div>
    );
};

export default VisualizerControls;
