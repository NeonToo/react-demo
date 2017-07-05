/**
 * Created by I326950 on 6/30/2017.
 */
import React from 'react';
import { connect } from 'react-redux'
import { isShowing } from './../actions';
import Toast from '../components/Toast';

class ToastDemo extends React.Component{
    constructor(props) {
        super(props);
    }

    toggleToast() {
        const { changePopup, isShowing } = this.props;

        changePopup(!isShowing);
        // dispatch(setPopup(Object.assign({}, popup, {show: !popup.show})));
    }

    render() {
        return (
            <div>
                <button type="button" onClick={() => this.toggleToast()}>Click Me</button>
                <Toast show={this.props.isShowing} hasMask={false}>加载中...</Toast>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isShowing: state.popup.show
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changePopup(bShow) {
            dispatch(isShowing(bShow));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastDemo);