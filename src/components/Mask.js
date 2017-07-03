/**
 * Created by I326950 on 7/3/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Mask extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {transparent, ...others} = this.props;

        return (
            <div className={transparent ? 'weui-mask_transparent' : 'weui-mask'} {...others}></div>
        );
    }
}

Mask.defaultProps = {
    transparent: true
};

Mask.propTypes = {
    transparent: PropTypes.bool
};

export default Mask;