/**
 * Created by I326950 on 6/30/2017.
 */
import React, {Component} from 'react';

class Error extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="weui-msg">
                <div className="weui-msg__icon-area">
                    <i className="weui-icon-warn weui-icon_msg"></i>
                </div>
                <div className="weui-msg__text-area">
                    <h2 className="weui-msg__title">出错啦</h2>
                    <p className="weui-msg__desc">抱歉，找不到您需要的页面</p>
                </div>
                <div className="weui-msg__opr-area">
                    <p className="weui-btn-area">
                        <a className="weui-btn weui-btn_default">返回上一页</a>
                    </p>
                </div>
                <div className="weui-msg__extra-area">
                    <div className="weui-footer">
                        <p className="weui-footer__links">
                            <a href="https://www.sap.com/index.html" className="weui-footer__link">SAP主页</a>
                        </p>
                        <p className="weui-footer__text">Copyright &copy; SAP Hybris Cloud for Customer</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;