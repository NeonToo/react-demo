import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {throttle} from 'lodash';

const PullState = {
    INIT: 0,
    IN_PULL: 1,
    RELEASE_NEED: 2,
    RELEASED: 3
};

const ScrollDirection = {
    UP: 'up',
    DOWN: 'down'
};

const containerStyle = {
    height: '100vh',
    transform: `translateY(0)`
};

const pullToRefreshStyle = {
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '-22px'
};

const contentStyle = {
    maxHeight: '100vh',
    overflowY: 'scroll'
};

const loadMoreStyle = {
    margin: `0 auto`,
    // height: `22px`
};

const infiniteStyle = {
    display: 'block'
};

class ScrollPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            properties: {
                refreshInitialized: false,
                refreshing: false,
                touchY: 0,
                scrollTop: 0,
                scrollDirection: ScrollDirection.DOWN,
                loading: false
            },
            pullState: PullState.INIT,
            pullOffset: 0,
            pullOffsetToRelease: 50,
            maxPullOffset: 80,
            pullToRefreshStyle: pullToRefreshStyle,
            pullAreaContent: '下拉刷新',
            infiniteStyle: infiniteStyle,
            bottomOffsetToLoad: 30,
            loadTips: '正在加载'
        };
        this._infiniteLoadDone = this._infiniteLoadDone.bind(this);
        this._refreshDone = this._refreshDone.bind(this);
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
        // pullToRefreshStyle.marginTo = `-${this.pullArea.clientHeight}px`;
        // const {pullToRefreshStyle} = this.state;
        // this.setState({
        //     ...this.state,
        //     pullToRefreshStyle: {
        //         ...pullToRefreshStyle,
        //         marginTop: `-${this.pullArea.clientHeight}px`
        //     }
        // });
    }

    _onTouchStart(oEvent) {
        console.log('touch start');
        const {properties} = this.state;
        const contentArea = this.contentArea;

        if (properties.refreshing) {
            this._cancelRefresh();
        }

        properties.touchY = oEvent.targetTouches[0].pageY;
        properties.scrollTop = contentArea.scrollTop;
        this.setState({
            properties: properties
        });

        if (contentArea.scrollTop === 0) {
            if (!properties.refreshInitialized) {
                properties.refreshInitialized = true;
                this.setState({
                    properties: properties
                });
                contentArea.addEventListener("touchend", this._onTouchEnd.bind(this));
            }
            contentArea.addEventListener("touchmove", this._onTouchMove.bind(this)); // note the 'bind'
        }
    }

    _onTouchMove(oEvent) {
        console.log('touch move');
        const that = this;

        return throttle(that._handleTouchMove, 100).bind(that)(oEvent);
    }

    _handleTouchMove(oEvent) {
        oEvent.preventDefault();
        console.log('handle touch move');
        const that = this;
        const {properties, pullState, pullOffsetToRelease, maxPullOffset} = this.state;
        const diff = oEvent.targetTouches[0].pageY - properties.touchY - properties.scrollTop;

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
        console.warn('touch end');
        const {pullState, pullOffset} = this.state;

        if (pullOffset > 0) {
            this.contentArea.removeEventListener("touchmove", this._onTouchMove); // remove touchmove handler
            if (pullState !== PullState.RELEASE_NEED) {
                this._refreshDone();
            } else {
                this._refresh();
            }
        }
    }

    _onScroll(oEvent) {
        console.log('scroll');
        const that = this;
        const {properties} = this.state;

        if(!properties.loading) { // OPTIMIZATION: avoid handling scroll again even reach to the bottom
            return throttle(that._handleScroll, 100).bind(that)(oEvent);
        }
    }

    _handleScroll(oEvent) {
        oEvent.preventDefault();
        console.log('handle scroll');
        const that = this;
        const contentArea = this.contentArea;
        const scrollHeight = contentArea.scrollHeight;
        const clientHeight = contentArea.clientHeight;
        const currentScrollTop = contentArea.scrollTop;
        const {properties, bottomOffsetToLoad, loading} = this.state;

        console.log(properties.scrollDirection);

        if(currentScrollTop > properties.scrollTop) { // scroll from top to bottom
            const bottomOffset = scrollHeight - clientHeight - currentScrollTop;

            properties.scrollTop = currentScrollTop; // mutate value
            properties.scrollDirection = ScrollDirection.DOWN;
            this.setState({
                properties: properties
            });

            if(bottomOffset > 0 && bottomOffset <= bottomOffsetToLoad && !properties.loading) {
                console.warn('start infinite load');
                this.contentArea.removeEventListener('scroll', this._onScroll);
                window.requestAnimationFrame(that._infiniteLoad.bind(that));
            }
        } else {
            properties.scrollTop = currentScrollTop; // mutate value
            properties.scrollDirection = ScrollDirection.UP;
            this.setState({
                properties: properties
            });
        }
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
            touchY: 0,
            scrollTop: 0
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

    _infiniteLoad() {
        const {infiniteLoad} = this.props;
        const {properties} = this.state;

        properties.loading = true;
        this.setState({
            properties: properties,
            loadTips: '正在加载'
        });
        infiniteLoad(this._infiniteLoadDone);
    }

    _infiniteLoadDone(args) {
        console.log('infinite load done');
        const {properties} = this.state;
        properties.loading = true;
        this.setState({
            properties: properties,
            loadTips: '加载完成'
        });
        // console.log(this._onScroll);
        // console.log(this.contentArea);
        // this.contentArea.addEventListener('scroll', this._onScroll);
    }

    render() {
        console.log('render');
        const {enablePullToRefresh, enableInfiniteLoading, pullToRefresh, infiniteLoad, children, ...others} = this.props;
        const {pullOffset, pullToRefreshStyle, pullAreaContent, infiniteStyle, loading, loadTips} = this.state;
        const containerStyle = {...containerStyle, transform: `translateY(${pullOffset}px)`};
        // const infiniteStyle = {...infiniteStyle, display: loading ? 'block' : 'none'};

        return (
            <div className="scroll-container" {...others} style={containerStyle}>
                { enablePullToRefresh && <div ref={(pullArea) => {
                    this.pullArea = pullArea
                }} className="pull-to-refresh" style={pullToRefreshStyle}>
                    <div className="weui-loadmore" style={loadMoreStyle}>{pullAreaContent}</div>
                </div>}
                <div ref={(content) => {
                    this.contentArea = content;
                }} className="scroll-content" style={contentStyle}
                     onTouchStart={enablePullToRefresh ? (oEvent) => this._onTouchStart(oEvent) : undefined}
                     onScroll={enableInfiniteLoading ? (oEvent) => this._onScroll(oEvent) : undefined}>
                    {children}
                    { enableInfiniteLoading && <div className="weui-loadmore" style={infiniteStyle}>
                        {loading && <i className="weui-loading"/>}
                        <span className="weui-loadmore__tips">{loadTips}</span>
                    </div>}
                </div>
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