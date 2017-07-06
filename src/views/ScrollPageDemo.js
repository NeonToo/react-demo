import React, {Component} from 'react';
import ScrollPage from './../components/ScrollPage';

class ScrollPageDemo extends Component {
    constructor(props) {
        super(props);
    }

    handleRefresh(refreshDone) {
        setTimeout(function() {
            console.log('Refreshing');
            refreshDone();
        }, 2000);
    }

    render() {
        const {children, ...others} = this.props;

        return (
            <ScrollPage enablePullToRefresh={true} enableInfiniteLoading={true} pullToRefresh={this.handleRefresh}>
                <div style={{height: '1000px'}}>
                    <h4>Content</h4>
                </div>
            </ScrollPage>
        );
    }
}

export default ScrollPageDemo;