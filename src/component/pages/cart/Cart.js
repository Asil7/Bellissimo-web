import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCart, getProductCountFromCart, updateQuantity } from '../../../store/actions/cart/cart';
import { Card, Col, Row, Typography, Button, Input } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import cartImg from '../../img/cart.png'

const { Text } = Typography;

const Cart = () => {
    const { cartProductList, productCount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getProductByCart());
        dispatch(getProductCountFromCart());
    }, [dispatch]);

    useEffect(() => {
    }, [cartProductList]);

    const incrementQuantity = async (item) => {
        let payload = {
            url: 'increment',
            id: item.id,
            quantity: 1
        }
        await dispatch(updateQuantity(payload))
        dispatch(getProductByCart());
    };

    const decrementQuantity = async (item) => {
        let payload = {
            url: 'decrement',
            id: item.id,
            quantity: 1
        }
        await dispatch(updateQuantity(payload))
        dispatch(getProductByCart());
        dispatch(getProductCountFromCart());
    };

    const totalPrice = cartProductList.reduce((total, item) => total + item.price * item.quantity, 0);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh', // Full viewport height
        textAlign: 'center', // Center text horizontally
    };

    return (
        <div style={{ minHeight: '80vh' }}>
            {productCount === 0 && <div style={containerStyle}>
                <div>
                    <div>
                       <img src={cartImg} alt='Cart'/> 
                    </div>
                    <div>
                        <strong className='fs-3 mt-4'>Hozircha sizning savatchangiz boʻsh 😕</strong>
                    </div>
                </div>
                <div className='mt-5 w-25'>
                    <Link to={'/'}>
                        <Button size='large' type='primary' className='bg-dark w-75' shape='round'>Menyuni ko'rish</Button>                    
                    </Link>
                </div>
            </div>}
            {productCount > 0 && <Row className="mt-5" justify="center" gutter={[12, 12]}>
                <Col xs={24} md={16} lg={9}>
                    {cartProductList?.map((item, index) => (
                        <Card key={index} style={{ padding: 10, width: '100%', height: '120px' }}>
                            <Row align="middle">
                                <Col span={4}>
                                    <img
                                        src={`data:${item.attachment.contentType};base64,${item.attachment.contentByte}`}
                                        alt={item.name}
                                        style={{ height: '90%', width: '90%', objectFit: 'cover' }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <div>{item.name}</div>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <div className='mb-2'>
                                        <Button size="small" icon={<MinusOutlined />} onClick={() => decrementQuantity(item)}></Button>
                                        <span style={{ margin: '0 8px' }}><strong>{item.quantity}</strong></span>
                                        <Button size="small" icon={<PlusOutlined />} onClick={() => incrementQuantity(item)}></Button>
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
            </Row>}
        </div>
    );
};

export default Cart;
