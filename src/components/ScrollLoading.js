import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ScrollLoading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {children, ...others} = this.props;

        return (
            <div>
            </div>
        );
    }
}

ScrollLoading.defaultProps = {
    classes: ''
};

ScrollLoading.propTypes = {
    classes: PropTypes.string
};

export default ScrollLoading;