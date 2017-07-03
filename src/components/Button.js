import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {element, size, type, disabled, plain, children, ...others} = this.props;
        const  Element = element ? element : 'a';
        const cls = classNames(
            'weui-btn',
            {
                'weui-btn_mini': size === 'mini',
                [`weui-btn_${type}`]: !plain,
                [`weui-btn_plain-${type}`]: plain,
                'weui-btn_disabled': !plain && disabled,
                'weui-btn_plain-disabled': plain && disabled
            }
        );

        return (
            <Element className={cls} {...others} >{children}</Element>
        );
    }
}

Button.defaultProps = {
    size: 'normal',
    type: 'default',
    disabled: false,
    plain: false,
    element: 'a'
};

Button.propTypes = {
    size: PropTypes.oneOf(['normal', 'mini']),
    type: PropTypes.oneOf(['primary', 'default', 'warn']),
    disabled: PropTypes.bool,
    plain: PropTypes.bool,
    element: PropTypes.oneOf(['button', 'a'])
};

export default Button;