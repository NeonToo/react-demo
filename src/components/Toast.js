/**
 * Created by I326950 on 6/30/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Mask from './Mask';

class Toast extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {show, hasMask, icon, children, classes, ...others} = this.props;

        return (
            show && <div className={`toast ${classes}`} {...others}>
                {hasMask && <Mask transparent={true} />}
                <div className="weui-toast">
                    <i className={`weui-icon_toast ${icon}`} />
                    <p className="weui-toast__content">{children}</p>
                </div>
            </div>
        );
    }
}

Toast.defaultProps = {
    show: true,
    hasMask: true,
    icon: 'weui-loading'
};

Toast.propTypes = {
    show: PropTypes.bool,
    hasMask: PropTypes.bool,
    icon: PropTypes.string
};

export default Toast;