import { Row, Col, Card, Button, Tag, Modal, Divider, Segmented, notification, Dropdown, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import '../category.css';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategory } from '../../../../store/actions/product/product';
import { addProductToCart, getProductCountFromCart } from '../../../../store/actions/cart/cart';

const Pizza = () => {
    const dispatch = useDispatch();
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { pizzaList } = useSelector((state) => state.product);
    const [selectedSize, setSelectedSize] = useState('Kichkina');
    const [thickness, setThickness] = useState(['Yupqa']);

    useEffect(() => {
        dispatch(getProductByCategory('PIZZA'));
    }, [dispatch]);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const showModal = (pizza) => {
        setSelectedPizza(pizza);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddProductToCart = async () => {
        try {
            const formData = new FormData();
            formData.append('name', selectedPizza.name);
            formData.append('price', selectedPizza.price);
            formData.append('quantity', 1);
            if (selectedPizza.attachment) {
                const file = dataURItoBlob(selectedPizza.attachment.contentByte, selectedPizza.attachment.contentType);
                formData.append('attachment', file, selectedPizza.attachment.fileOriginalName);
            }

            let res = await dispatch(addProductToCart(formData));
            if (res.payload.status === 200) {
                notification.success({
                    icon: (
                        <img
                            src={`data:${selectedPizza.attachment.contentType};base64,${selectedPizza.attachment.contentByte}`}
                            alt={selectedPizza.name}
                            style={{ width: 40, height: 40 }}
                        />
                    ),
                    message: <span className='ms-4 mt-1'><strong>{selectedPizza.name}</strong> savatga qo'shildi</span>,
                    duration: 3
                });
                setIsModalVisible(false);
                dispatch(getProductCountFromCart());
            } else {
                notification.error({
                    message: <div> <strong>{selectedPizza.name}</strong>don't saved</div>,
                    duration: 8
                });
            }
        } catch (e) {
        }
    }

    function dataURItoBlob(dataURI, contentType) {
        const byteString = atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([int8Array], { type: contentType });
    }

    const handleChangeSize = (value) => {
        setSelectedSize(value);
    }

    useEffect(() => {
        if (selectedSize === 'Kichkina') {
            setThickness(['Yupqa']);
        } else if (selectedSize === 'O`rtacha') {
            setThickness(['Yupqa', 'Qalin']);
        } else if (selectedSize === 'Katta') {
            setThickness(['Yupqa', 'Qalin']);
        }
    }, [selectedSize]);

    const menu = (
        <Menu
            items={[
                {
                    label: <a href="https://www.antgroup.com">1st menu item</a>,
                    key: '0',
                },
                {
                    label: <a href="https://www.aliyun.com">2nd menu item</a>,
                    key: '1',
                },
                {
                    type: 'divider',
                },
                {
                    label: '3rd menu item',
                    key: '3',
                },
            ]}
        />
    );

    return (
        <div>
            <div className='w-100 mb-4'>
                <Row gutter={[16, 16]}>
                    {pizzaList?.map((item, index) => (
                        <Col xs={24} sm={12} md={12} lg={6} xl={6} key={index}>
                            <div className='hoverable-card' onClick={() => showModal(item)}>
                                <Card
                                    style={{ width: '100%', height: '400px' }}
                                    bordered={false}
                                    className='text-start'
                                    cover={
                                        <div className="d-flex justify-content-center align-items-center overflow-hidden">
                                            <img
                                                src={`data:${item.attachment.contentType};base64,${item.attachment.contentByte}`}
                                                alt={item.name}
                                                style={{ height: '80%', width: '80%', objectFit: 'cover', marginTop: '20px' }}
                                            />
                                        </div>
                                    }
                                >
                                    <div className='fs-6'>{item.name}</div>
                                    <div className='text-secondary mt-1'>
                                        {truncateText(item.description, 180)}
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 20 }}>
                                        <Tag className='fs-6'><strong>{item.price} so'mdan</strong></Tag>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            {selectedPizza && (
                <Modal footer={null} open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={900}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <div className='text-center mt-4'>
                                <img
                                    src={`data:${selectedPizza.attachment.contentType};base64,${selectedPizza.attachment.contentByte}`}
                                    alt={selectedPizza.name}
                                    className='w-50 '
                                />
                            </div>
                            <div className='mt-4'>
                                <strong className='fs-4'>{selectedPizza.name}</strong>
                            </div>
                            <div className='text-secondary fs-6 mt-2'>{selectedPizza.description}</div>
                            <Divider />
                            <div><strong>Tanlangan bort: </strong></div>
                            <div className='mt-2'><strong>Masalliqlar: </strong></div>
                            <div className='mt-5'>
                                <strong className='fs-2'>{selectedPizza.price} so'm</strong>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <div className='text-start mt-4'>
                                    <strong className='fs-5'>Pitsa kattaligi</strong>
                                </div>
                                <Segmented
                                    size='large'
                                    options={['Kichkina', 'O`rtacha', 'Katta']}
                                    block
                                    className='mb-3 mt-3'
                                    onChange={handleChangeSize}
                                />
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Segmented
                                            size='large'
                                            options={thickness}
                                            block
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Dropdown overlay={menu} trigger={['click']}>
                                            <Button className='w-100 bg-warning text-black' size='large' shape="round" htmlType="submit" type="primary">
                                                <EditOutlined /> Bo`rtni o`zgartirish
                                            </Button>
                                        </Dropdown>
                                    </Col>
                                </Row>
                                <div className='text-start mt-4'>
                                    <strong className='fs-5'>Masalliqlarni tanlang</strong>
                                </div>
                                <div className="text-center position-absolute bottom-0 w-100">
                                    <Button onClick={() => handleAddProductToCart()} className=' bg-success w-100' size='large' shape="round" htmlType="submit" type="primary">
                                        Savatga qo'shish
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            )}
        </div>
    );
};

export default Pizza;
