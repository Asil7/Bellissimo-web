import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCart } from '../../../store/actions/cart/cart';
import { Card, Col, Row, Typography, Button, Input } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Cart = () => {
    const { cartProductList } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductByCart());
    }, [dispatch]);

    const incrementQuantity = (index) => {
        console.log(index)
    };

    const decrementQuantity = (index) => {
        console.log(index)
    };

    const totalPrice = cartProductList.reduce((total, item) => total + item.price * item.quantity, 0);


    return (
        <div style={{ height: '100%' }}>
            <Row className="mt-5" justify="center" gutter={[12, 12]}>
                <Col xs={24} md={16} lg={9}>
                    {cartProductList?.map((item, index) => (
                        <Card key={index} style={{ padding: 10, width: '100%', height: '120px' }}>
                            <Row align="middle">
                                <Col span={6}>
                                    <img
                                        src={`data:${item.attachment.contentType};base64,${item.attachment.contentByte}`}
                                        alt={item.name}
                                        style={{ height: '60%', width: '60%', objectFit: 'cover' }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Text>{item.name}</Text>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <div className='mb-2'>
                                        <Button size="small" icon={<MinusOutlined />} onClick={() => decrementQuantity(index)}></Button>
                                        <span style={{ margin: '0 8px' }}><strong>{item.quantity}</strong></span>
                                        <Button size="small" icon={<PlusOutlined />} onClick={() => incrementQuantity(index)}></Button>
                                    </div>
                                    <Text><strong>{item.price.toLocaleString()} so'm</strong></Text>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </Col>

                <Col xs={24} md={5}>
                    <Row className='mb-4' gutter={12}>
                        <Col span={12}>
                            <Input size='large' placeholder="Promokodni kiritish" />
                        </Col>
                        <Col span={12}>
                            <Button size='large' className='bg-black text-white w-100' shape="round"><strong>Qo'llash</strong></Button>
                        </Col>
                    </Row>
                    <Card style={{ width: '100%', height: '180px' }}>
                        <Row gutter={16} style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <Text>Yetkazib berish</Text>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <Text>Bepul</Text>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginTop: 16 }}>
                            <Col span={12}>
                                <strong className="fs-5">Umumiy narx</strong>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <strong className="fs-4">{totalPrice.toLocaleString()} so'm</strong>
                            </Col>
                        </Row>
                        <div className="text-center mt-4 bottom-0">
                            <Button className='bg-success w-100' size='large' shape="round" type="primary">
                                Keyingi
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Cart;
