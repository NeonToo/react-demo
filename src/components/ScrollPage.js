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
    margin: `0 auto`,
    // height: `22px`
};

class ScrollPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshInitialized: false,
            refreshing: false,
            pullState: PullState.INIT,
            pullOffset: 0,
            pullOffsetToRelease: 50,
            maxPullOffset: 80,
            startTouchY: 0,
            startTouchScrollTop: 0,
            pullAreaHeight: 0,
            pullAreaContent: '下拉刷新'
        };
        this._refreshDone = this._refreshDone.bind(this);
    }

    componentDidMount() {
        console.log('componentWillMount');
        this.setState({
            pullAreaHeight: this.pullArea.clientHeight
        });
    }

    _onTouchStart(oEvent) {
        console.log('touch start');
        const {refreshInitialized, refreshing} = this.state;
        const contentArea = this.contentArea;

        if (refreshing) {
            this._cancelRefresh();
        }

        this.setState({
            startTouchY: oEvent.targetTouches[0].pageY,
            startTouchScrollTop: contentArea.scrollTop
        });

        if (contentArea.scrollTop === 0) {
            if (!refreshInitialized) {
                this.setState({
                    refreshInitialized: true
                });
                contentArea.addEventListener("touchend", this._onTouchEnd.bind(this));
            }
            contentArea.addEventListener("touchmove", this._handleTouchMove.bind(this)); // note the 'bind'
        }
    }

    _handleTouchMove(oEvent) {
        const that = this;

        return throttle(that._onTouchMove, 100).bind(that)(oEvent);
    }

    _onTouchMove(oEvent) {
        oEvent.preventDefault();
        console.log('touch move');
        const that = this;
        const {pullState, pullOffsetToRelease, maxPullOffset, startTouchY, startTouchScrollTop} = this.state;
        const diff = oEvent.targetTouches[0].pageY - startTouchY - startTouchScrollTop;

        if (diff > 0) {
           window.requestAnimationFrame(function () {
                if (diff > pullOffsetToRelease && pullState < PullState.RELEASE_NEED) { // pullState judgement or will cause load done return to here
                    that.setState({
                        pullState: PullState.RELEASE_NEED,
                        pullAreaContent: '释放刷新'
                    });
                }
                that.setState({
                    pullOffset: diff > maxPullOffset ? maxPullOffset : diff
                });
            });
        }
    }

    _onTouchEnd(oEvent) {
        console.log('touch end');
        const {pullState, pullOffset} = this.state;

        if (pullOffset > 0) {
            if (pullState !== PullState.RELEASE_NEED) {
                this._refreshDone();
            } else {
                this._refresh();
            }
            this.contentArea.removeEventListener("touchmove", this._handleTouchMove); // remove touchmove handler
        }
    }

    _onScroll(oEvent) {
        oEvent.preventDefault();
        console.log('scroll');
    }

    _refresh() {
        const {pullToRefresh} = this.props;
        const loadingContent = (
            <div>
            <i className="weui-loading"/>
            <span className="weui-loadmore__tips">正在刷新</span>
            </div>
        );

        this.setState({
            refreshing: true,
            pullState: PullState.RELEASED,
            pullAreaContent: loadingContent
        });
        pullToRefresh(this._refreshDone);
    }

    _cancelRefresh() {
        this.setState({
            refreshing: false,
            pullState: PullState.INIT,
            pullAreaContent: '下拉刷新',
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
            pullAreaContent: '下拉刷新',
            pullOffset: 0
        });
    }

    render() {
        console.log('render');
        const {enablePullToRefresh, enableInfiniteLoading, pullToRefresh, children, ...others} = this.props;
        const {pullOffset, pullAreaHeight, pullAreaContent} = this.state;
        const pullToRefreshStyle = {...pullToRefreshStyle, marginTop: `-${pullAreaHeight}px`};

        return (
            <div className="scroll-container" {...others} style={{transform: `translateY(${pullOffset}px)`}}>
                { enablePullToRefresh && <div ref={(pullArea) => {
                    this.pullArea = pullArea
                }} className="pull-to-refresh" style={pullToRefreshStyle}>
                    <div className="weui-loadmore" style={loadMoreStyle}>{pullAreaContent}</div>
                </div>}
                <div ref={(content) => {
                    this.contentArea = content;
                }} className="scroll-content" style={{maxHeight: '500px', overflowY: 'scroll'}}
                     onTouchStart={enablePullToRefresh ? (oEvent) => this._onTouchStart(oEvent) : undefined}
                     onScroll={enableInfiniteLoading ? (oEvent) => throttle(this._onScroll, 100)(oEvent) : undefined}>
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