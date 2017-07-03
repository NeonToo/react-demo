import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Mask from "./Mask";

class Dialog extends Component {
    constructor(props) {
        super(props);
    }

    renderButtons(buttons) {
        return buttons.map((button, index) => {
            const {type, text, ...others} = button;
            const cls = classNames(
                'weui-dialog__btn',
                `weui-dialog__btn_${type}`
            );

            return (
                <a key={index} href="javascript:;" className={cls} {...others}>{text}</a>
            );
        });
    }

    render() {
        const {show, title, children, buttons, ...others} = this.props;

        return (
            show && <div className="dialog" {...others}>
                <Mask transparent={false}/>
                <div className="weui-dialog">
                    {title && <div className="weui-dialog__hd">
                        <strong className="weui-dialog__title">{title}</strong>
                    </div>}
                    <div className="weui-dialog__bd">
                        {children}
                    </div>
                    <div className="weui-dialog__ft">
                        {this.renderButtons(buttons)}
                    </div>
                </div>
            </div>
        );
    }
}

Dialog.defaultProps = {
    show: true,
    title: '',
    buttons: []
};

Dialog.propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['default', 'primary']).isRequired,
            text: PropTypes.string.isRequired
        })
    )
};

export default Dialog;