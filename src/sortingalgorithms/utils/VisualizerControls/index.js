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

// VisualizerControls.propTypes = {
//     onPlay: PropTypes.func,
//     onPause: PropTypes.func,
//     onBackward: PropTypes.func,
//     onForward: PropTypes.func,
//     onRepeat: PropTypes.func,
//     // onAdjustSpeed: PropTypes.func,

//     playing: PropTypes.bool,
//     playDisabled: PropTypes.bool,
//     pauseDisabled: PropTypes.bool,
//     backwardDisabled: PropTypes.bool,
//     forwardDisabled: PropTypes.bool,
//     repeatDisabled: PropTypes.bool,
//     playbackSpeed: PropTypes.number
// };

export default VisualizerControls;
