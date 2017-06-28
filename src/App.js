/**
 * Created by I326950 on 6/28/2017.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './actions';

class TabContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const items = this.props.items.map((item, index) =>
            <a href="javascript:;" className="weui-tabbar__item weui-bar__item_on" key={index}>
                <p className="weui-tabbar__label">{item.name}</p>
            </a>
        );

        return (
            <div className="weui-tab">
                <div className="weui-tab__panel">
                </div>
                <div className="weui-tabbar">
                    {items}
                </div>
            </div>
        );
    }
}

export default TabContainer;