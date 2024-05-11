import React, { Component } from 'react';
import { enquireScreen } from 'enquire-js';
import Header from './Nav';
import Footer from './Footer';

import {
    NavDataSource,
    FooterDataSource,
} from './data.source.js';
let isMobile;
enquireScreen((b) => {
    isMobile = b;
});
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile,
        };
    }

    componentDidMount() {
        // 适配手机屏幕;
        enquireScreen((b) => {
            this.setState({ isMobile: !!b });
        });
    }

    render() {
        return (
            <>
                <Header dataSource={NavDataSource} isMobile={this.state.isMobile} />
                {this.props.children}
                <Footer dataSource={FooterDataSource} isMobile={this.state.isMobile} />
            </>
        );
    }
}

export default Layout;