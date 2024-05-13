import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

const ProductCard = () => {
    return (
        <OverPack playScale={0.3}>
            <QueueAnim
                type="bottom"
                key="block"
                leaveReverse
                component={Row}
            >
                <Col md={6} xs={24} className='content0-block'>
                    <div className='content0-block-item jzjgrrupf2c-editor_css'>
                        <img src="https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ" alt="" className='content0-block-icon jzjncn210ql-editor_css' />
                        <h1 className='content0-block-title jzj8xt5kgv7-editor_css'>产品型号</h1>
                    </div>
                </Col>
                <Col md={6} xs={24} className='content0-block'>
                    <div className='content0-block-item jzjgrrupf2c-editor_css'>
                        <img src="https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ" alt="" className='content0-block-icon jzjncn210ql-editor_css' />
                        <h1 className='content0-block-title jzj8xt5kgv7-editor_css'>产品型号</h1>
                    </div>
                </Col>
                <Col md={6} xs={24} className='content0-block'>
                    <div className='content0-block-item jzjgrrupf2c-editor_css'>
                        <img src="https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ" alt="" className='content0-block-icon jzjncn210ql-editor_css' />
                        <h1 className='content0-block-title jzj8xt5kgv7-editor_css'>产品型号</h1>
                    </div>
                </Col>
                <Col md={6} xs={24} className='content0-block'>
                    <div className='content0-block-item jzjgrrupf2c-editor_css'>
                        <img src="https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ" alt="" className='content0-block-icon jzjncn210ql-editor_css' />
                        <h1 className='content0-block-title jzj8xt5kgv7-editor_css'>产品型号</h1>
                    </div>
                </Col>
                <Col md={6} xs={24} className='content0-block'>
                    <div className='content0-block-item jzjgrrupf2c-editor_css'>
                        <img src="https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*CTp8T7RT-VkAAAAAAAAAAABkARQnAQ" alt="" className='content0-block-icon jzjncn210ql-editor_css' />
                        <h1 className='content0-block-title jzj8xt5kgv7-editor_css'>产品型号</h1>
                    </div>
                </Col>
            </QueueAnim>
        </OverPack>
    );
}

export default ProductCard;
