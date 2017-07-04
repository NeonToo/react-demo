/**
 * Created by I326950 on 6/30/2017.
 */
import React from 'react';
import { connect } from 'react-redux'
import { setPopup } from './../actions';
import Toast from '../components/Toast';

class ToastDemo extends React.Component{
    constructor(props) {
        super(props);
    }

    toggleToast() {
        const { changePopup, popup } = this.props;

        changePopup(Object.assign({}, popup, {show: !popup.show}));
        // dispatch(setPopup(Object.assign({}, popup, {show: !popup.show})));
    }

    render() {
        return (
            <div>
                {/*<button type="button" onClick={() => this.toggleToast()}>Click Me</button>*/}
                <Toast show={true} hasMask={false}>加载中...</Toast>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        popup: state.popup
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changePopup(newPopup) {
            dispatch(setPopup(newPopup));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastDemo);