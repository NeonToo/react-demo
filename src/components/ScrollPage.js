import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {throttle} from 'lodash';

const PullState = {
    INIT: 0,
    IN_PULL: 1,
    RELEASE_NEED: 2,
    RELEASED: 3
};

const pullToRefreshStyle = {
    fontSize: '14px',
    textAlign: 'center'
};
const loadMoreStyle = {
    margin: '0 auto',
    height: '22px'
};

class ScrollPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshInitialized: false,
            refreshing: false,
            pullState: PullState.INIT,
            pullOffset: 0,
            pullOffsetToRelease: 15,
            maxPullOffset: 30,
            startTouchY: 0,
            startTouchScrollTop: 0
        };
        this._refreshDone = this._refreshDone.bind(this);
    }

    _onTouchStart(oEvent) {
        const {refreshInitialized, refreshing} = this.state;

        if (refreshing) {
            this._cancelRefresh();
        }

        const that = this;
        const contentDiv = this.contentDiv;

        this.setState({
            startTouchY: oEvent.targetTouches[0].pageY,
            startTouchScrollTop: contentDiv.scrollTop
        });

        if (!refreshInitialized) {
            this.setState({
                refreshInitialized: true
            });
            contentDiv.addEventListener("touchmove", throttle(that._onTouchMove, 50).bind(this)); // note the 'bind'
            contentDiv.addEventListener("touchend", this._onTouchEnd.bind(this));
        }
    }

    _onTouchMove(oEvent) {
        oEvent.preventDefault();
        const that = this;
        const {pullOffsetToRelease, maxPullOffset, startTouchY, startTouchScrollTop} = this.state;
        const diff = oEvent.targetTouches[0].pageY - startTouchY - startTouchScrollTop;

        if (diff > 0) {
            window.requestAnimationFrame(function () {
                that.setState({
                    pullState: PullState.IN_PULL
                });

                if (diff >= pullOffsetToRelease) {
                    that.setState({
                        pullState: PullState.RELEASE_NEED
                    });
                }
                that.setState({
                    pullOffset: diff > maxPullOffset ? maxPullOffset : diff
                });
            });
        }
    }

    _onTouchEnd(oEvent) {
        const {pullState, pullOffset} = this.state;

        if (pullOffset > 0) {
            if (pullState !== PullState.RELEASE_NEED) {
                this._refreshDone();
            } else {
                this._refresh();
            }
        }
    }

    _onScroll(oEvent) {
        oEvent.preventDefault();
        console.log('scroll');
    }

    _refresh() {
        const {pullToRefresh} = this.props;

        this.setState({
            refreshing: true,
            pullState: PullState.RELEASED
        });
        pullToRefresh(this._refreshDone);
    }

    _cancelRefresh() {
        this.setState({
            refreshing: false,
            pullState: PullState.INIT,
            pullOffset: 0,
            startTouchY: 0,
            startTouchScrollTop: 0
        });
    }

    _refreshDone() {
        console.log('Refresh Done.');
        this.setState({
            refreshing: false,
            pullState: PullState.INIT,
            pullOffset: 0
        });
    }

    render() {
        const {enablePullToRefresh, enableInfiniteLoading, pullToRefresh, children, ...others} = this.props;
        const {pullState, pullOffset} = this.state;

        return (
            <div className="scroll-container" {...others} style={{transform: `translateY(${pullOffset}px)`}}>
                { enablePullToRefresh && <div className="pull-to-refresh" style={pullToRefreshStyle}>
                    { pullState === PullState.IN_PULL && pullOffset > 0 && <div className="down">下拉刷新</div>}
                    { pullState === PullState.RELEASE_NEED && <div className="up">释放刷新</div>}
                    { pullState === PullState.RELEASED && <div className="weui-loadmore" style={loadMoreStyle}>
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