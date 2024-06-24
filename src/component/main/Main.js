import React, { useState } from 'react';
import { Carousel, Anchor, Affix, Row, Col, Segmented, Tag, Button } from 'antd';
import Pizza from '../pages/category/pizza/Pizza'
import Snack from '../pages/category/snack/Snack'
import Drink from '../pages/category/drink/Drink'
import Salad from '../pages/category/salad/Salad'
import Dessert from '../pages/category/dessert/Dessert';
import Sauce from '../pages/category/sauce/Sauce'
import image from '../img/carouselImg/image.png'
import image1 from '../img/carouselImg/image1.png'
import image2 from '../img/carouselImg/image2.png'
import ProductForm from '../pages/product/ProductForm';

const Main = () => {
    const [affixed, setAffixed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAffixChange = (affixed) => {
        setAffixed(affixed);
    };

    const anchorClass = affixed ? 'anchor-affixed' : 'anchor';


    return (
        <>
            <div className='d-flex justify-content-center'>
                <div style={{ width: '60%' }}>
                    <Carousel autoplay dotPosition="bottom">
                        <div>
                            <img width='100%' src={image} alt="Location"></img>
                        </div>
                        <div>
                            <img width='100%' src={image1} alt="Location"></img>
                        </div>
                        <div>
                            <img width='100%' src={image2} alt="Location"></img>
                        </div>
                    </Carousel>
                </div>
            </div>

            <div className='d-flex justify-content-center mt-4'>
                <div style={{ width: '60%' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Segmented
                                size='large'
                                options={['Yetkazib berish', 'Olib ketish']}
                                block
                            />
                        </Col>
                        <Col span={12}>
                            <Tag color="red" className='w-100 text-danger p-2'>
                                <strong>Yetkazib berish manzilini tanlang</strong>
                            </Tag>
                        </Col>
                    </Row>
                </div>
            </div>

            <div className='mt-3 mb-3'>
                <Affix offsetTop={0} onChange={handleAffixChange}>
                    <div className='fs-1'>
                        <Anchor
                            direction="horizontal"
                            className={anchorClass}
                            items={[
                                { key: 'pitsa', href: '#pitsa', title: 'Pitsa', className: 'pitsa-item' },
                                { key: 'gazaklar', href: '#gazaklar', title: 'Gazaklar' },
                                { key: 'ichimliklar', href: '#ichimliklar', title: 'Ichimliklar' },
                                { key: 'salatlar', href: '#salatlar', title: 'Salatlar' },
                                { key: 'desertlar', href: '#desertlar', title: 'Desertlar' },
                                { key: 'souslar', href: '#souslar', title: 'Souslar' },
                            ]}
                        />
                    </div>
                </Affix>
            </div>

            <Affix offsetTop={3}>
                <div className='text-end'><Button type='primary' onClick={() => setIsModalOpen(true)}>Add Product</Button></div>
            </Affix>

            <div className='d-flex justify-content-center'>
                <div style={{ width: '60%' }}>
                    <div>
                        <div id="pitsa">
                            <h4>Pitsa</h4>
                            <Pizza />
                        </div>

                        <div id="gazaklar">
                            <h4>Gazaklar</h4>
                            <Snack />
                        </div>

                        <div id="ichimliklar">
                            <h4>Ichimliklar</h4>
                            <Drink/>
                        </div>

                        <div id="salatlar">
                            <h4>Salatlar</h4>
                            <Salad/>
                        </div>

                        <div id='desertlar'>
                            <h4>Desertlar</h4>
                            <Dessert />
                        </div>

                        <div id="souslar">
                            <h4>Souslar</h4>
                            <Sauce />
                        </div>
                        
                    </div>
                </div>
            </div>
            <ProductForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
};

export default Main;
