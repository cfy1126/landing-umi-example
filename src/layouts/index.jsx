import React, { useState, useEffect } from 'react';
import { enquireScreen } from 'enquire-js';
import Header from './Nav';
import Footer from './Footer';

import {
    NavDataSource,
    FooterDataSource,
} from './data.source.js';

const Layout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleScreenChange = (isScreenMobile) => {
            setIsMobile(isScreenMobile);
        };

        enquireScreen((b) => {
            handleScreenChange(!!b);
        });

        const screenListener = enquireScreen((b) => {
            handleScreenChange(!!b);
        });

        return () => {
            screenListener.unregister();
        };
    }, []);

    return (
        <>
            <Header dataSource={NavDataSource} isMobile={isMobile} />
            {children}
            <Footer dataSource={FooterDataSource} isMobile={isMobile} />
        </>
    );
}

export default Layout;
