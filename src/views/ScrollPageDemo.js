import React, {Component} from 'react';
import ScrollPage from './../components/ScrollPage';

class ScrollPageDemo extends Component {
    constructor(props) {
        super(props);
    }

    handleRefresh(refreshDone) {
        console.log('Refreshing');
        refreshDone();
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