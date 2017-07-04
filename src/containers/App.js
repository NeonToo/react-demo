/**
 * Created by I326950 on 6/28/2017.
 */
import React, { Component } from 'react';

class TabContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const items = [
            {
                name: "Category",
                path: "/categories"
            },
            {
                name: "Component",
                path: "/components"
            },
            {
                name: "Customer",
                path: "/customers"
            },
            {
                name: "Me",
                path: "/me"
            }
        ];

        return (
            <div className="weui-tab" style={{height: '100vh'}}>
                <div className="weui-tab__panel">
                </div>
                <div className="weui-tabbar">
                    {items.map((item, index) =>
                        <a href="javascript:;" className="weui-tabbar__item weui-bar__item_on" key={index}>
                            <p className="weui-tabbar__label">{item.name}</p>
                        </a>
                    )}
                </div>
            </div>
        );
    }
}

export default TabContainer;