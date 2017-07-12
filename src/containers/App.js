/**
 * Created by I326950 on 6/28/2017.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TabContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const items = [
            {
                name: "Button",
                path: "/button"
            },
            {
                name: "Toast",
                path: "/toast"
            },
            {
                name: "Dialog",
                path: "/dialog"
            },
            {
                name: "Scroll Page",
                path: "/scrollpage"
            }
        ];

        return (
            <div className="weui-tab" style={{height: '100vh'}}>
                <div className="weui-tab__panel">
                </div>
                <div className="weui-tabbar">
                    {items.map((item, index) =>
                        <Link to={`${item.path}`} className="weui-tabbar__item weui-bar__item_on" key={index}>
                            <p className="weui-tabbar__label">{item.name}</p>
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}

export default TabContainer;