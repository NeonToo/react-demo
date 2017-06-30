/**
 * Created by I326950 on 6/30/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeLoadingStatus } from './../actions';
import Toast from './../components/Toast';

class ToastDemo extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { dispatch, loading } = this.props;
        console.log(this.props.loading);

        return (
            <div>
                <button type="button" onClick={() => dispatch(changeLoadingStatus(!loading))}>Click Me</button>
                <Toast show={loading} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.isLoading
    };
};

export default connect(mapStateToProps)(ToastDemo);