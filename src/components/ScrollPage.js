import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

const PullState = {
    INIT: 0,
    IN_PULL: 1,
    RELEASE_NEED: 2,
    RELEASED: 3
};

class ScrollPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pullState: PullState.INIT,
            pullOffset: 0,
            startTouchY: 0,
            startTouchScrollTop: 0
        };
        this._refreshDone = this._refreshDone.bind(this);
    }

    _onTouchStart(oEvent) {
        const that = this;
        const contentDiv = this.contentDiv;

        this.setState({
            pullState: PullState.IN_PULL,
            startTouchY: oEvent.targetTouches[0].pageY,
            startTouchScrollTop: contentDiv.scrollTop
        });
        contentDiv.addEventListener("touchmove", throttle(that._onTouchMove, 50).bind(this)); // note the 'bind'
        contentDiv.addEventListener("touchend", this._onTouchEnd.bind(this));
    }

    _onTouchMove(oEvent) {
        oEvent.preventDefault();
        const that = this;
        const {startTouchY, startTouchScrollTop} = this.state;
        const diff = oEvent.targetTouches[0].pageY - startTouchY - startTouchScrollTop;

        if (diff > 10) {
            window.requestAnimationFrame(function() {
                that.setState({
                    pullState: PullState.RELEASE_NEED,
                    pullOffset: diff > 50 ? 50 : diff
                });
            });
        }
    }

    _onTouchEnd(oEvent) {
        const {pullOffset} = this.state;

        if (pullOffset > 0) {
            this.refresh();
        }
    }

    _onScroll(oEvent) {
        oEvent.preventDefault();
        console.log('scroll');
    }

    refresh() {
        const { pullToRefresh } = this.props;

        this.setState({
            pullState: PullState.RELEASED
        });
        pullToRefresh(this._refreshDone);
    }

    _refreshDone() {
        console.log('Refresh Done.');
        this.setState({
            pullState: PullState.INIT,
            pullOffset: 0
        });
    }

    render() {
        const {enablePullToRefresh, enableInfiniteLoading, pullToRefresh, children, ...others} = this.props;
        const { pullState, pullOffset } = this.state;
        const containerStyle = {
            transform: `translateY(${pullOffset}px)`
        };
        const pullToRefreshStyle = {
            textAlign: 'center'
        };

        return (
            <div className="scroll-container" {...others} style={containerStyle}>
                { enablePullToRefresh && <div className="pull-to-refresh" style={pullToRefreshStyle}>
                    { pullState === PullState.IN_PULL && <div className="down">下拉刷新</div>}
                    { pullState === PullState.RELEASE_NEED && <div className="up">释放刷新</div>}
                    { pullState === PullState.RELEASED && <div className="weui-loadmore">
                        <i className="weui-loading"/>
                        <span className="weui-loadmore__tips">正在刷新</span>
                    </div>}
                </div>}
                <div ref={(content) => {
                    this.contentDiv = content;
                }} className="scroll-content" style={{maxHeight: '500px', overflowY: 'scroll'}}
                     onTouchStart={enablePullToRefresh ? (oEvent) => this._onTouchStart(oEvent) : undefined}
                     onScroll={enableInfiniteLoading ? (oEvent) => throttle(this._onScroll, 50)() : undefined}>
                    {children}
                </div>
                { enableInfiniteLoading && <div className="weui-loadmore">
                    <i className="weui-loading"/>
                    <span className="weui-loadmore__tips">正在加载</span>
                </div>}
            </div>
        );
    }
}

ScrollPage.defaultProps = {
    enablePullToRefresh: false,
    pullToRefresh: undefined,
    enableInfiniteLoading: false,
    // offsetToTriggerLoading: 50
};

ScrollPage.propTypes = {
    enablePullToRefresh: PropTypes.bool,
    pullToRefresh: PropTypes.func,
    enableInfiniteLoading: PropTypes.bool,
    // offsetToTriggerLoading: PropTypes.number
};

export default ScrollPage;