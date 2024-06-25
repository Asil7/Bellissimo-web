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
        <div style={{ height: '85vh' }}>
            <Row className="mt-5" style={{ margin: 'auto' }}>
                <Col>
                    {cartProductList?.map((item, index) => (
                        <Card key={index} style={{ marginBottom: 16, padding: 10, width: '700px', height: '150px', }}>
                            <Row align="middle">
                                <Col span={6}>
                                    <img
                                        src={`data:${item.attachment.contentType};base64,${item.attachment.contentByte}`}
                                        alt={item.name}
                                        style={{ height: '80%', width: '80%', objectFit: 'cover' }}
                                    />
                                </Col>
                                <Col span={12} >
                                    <Text>{item.name}</Text>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <div>
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

                <Col>
                    <Card style={{ padding: 10, width: '400px', height: '200px' }}>
                        <Row gutter={16}>
                            <Col>
                                <Input placeholder="Promokodni kiritish" />
                            </Col>
                            <Col>
                                <Button shape="round">Qo'llash</Button>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginTop: 16 }}>
                            <Col>
                                <Text>Yetkazib berish</Text>
                            </Col>
                            <Col className="text-end" style={{ marginLeft: 'auto' }}>
                                <Text>Bepul</Text>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginTop: 16 }}>
                            <Col>
                                <strong className="fs-4">Umumiy narx</strong>
                            </Col>
                            <Col style={{ marginLeft: 'auto' }}>
                                <strong className="fs-4 text-end">{totalPrice.toLocaleString()}</strong>
                            </Col>
                        </Row>
                        <div className="text-center mt-2">
                            <Button className=' bg-success w-100' size='large' shape="round" type="primary">
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
