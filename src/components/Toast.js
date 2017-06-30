/**
 * Created by I326950 on 6/30/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: ["weui-icon_toast"]
        };
    }

    componentDidMount() {
        const icon = this.props.icon;

        if (icon) {
            this.setState({
                classes: this.state.classes.concat(icon).join(" ")
            });
        }
    }

    render() {
        if(!this.props.show) {
            return null;
        }

        return (
            <div className="toast">
                {/*<div className="weui-mask_transparent"></div>*/}
                <div className="weui-toast">
                    <i className={this.state.classes}></i>
                    <p className="weui-toast__content">{this.props.text}</p>
                </div>
            </div>
        );
    }
}

Toast.defaultProps = {
    show: true,
    icon: 'weui-loading',
    text: '数据加载中'
};

Toast.propTypes = {
    show: PropTypes.bool,
    icon: PropTypes.string,
    text: PropTypes.string
};

export default Toast;