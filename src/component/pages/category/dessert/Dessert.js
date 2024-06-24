import { Row, Col, Card, Button, Tag, Modal, Divider, Segmented } from 'antd';
import React, { useEffect, useState } from 'react';
import '../category.css';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategory } from '../../../../store/actions/product/product';

const Dessert = () => {
    const dispatch = useDispatch();
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { dessertList } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProductByCategory('DESSERT'));
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

    return (
        <div>
            <div className='w-100'>
                <Row gutter={[9, 9]}>
                    {dessertList?.map((item, index) => (
                        <Col span={6} key={index}>
                            <div className='hoverable-card' onClick={() => showModal(item)}>
                                <Card
                                    style={{ width: '100%', height: '440px' }}
                                    bordered={false}
                                    className='text-start shadow'
                                    cover={
                                        <img
                                            src={`data:${item.attachment.contentType};base64,${item.attachment.contentByte}`}
                                            alt={item.name}
                                        />
                                    }
                                >
                                    <strong className='fs-5'>{item.name}</strong>
                                    <div className='text-muted'>
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

            {selectedPizza && (<Modal footer={null} open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={900}>
                <Row gutter={16}>
                    <Col span={12}>
                        <div className='text-center'>
                            <img
                                src={`data:${selectedPizza.attachment.contentType};base64,${selectedPizza.attachment.contentByte}`}
                                alt={selectedPizza.name}
                                className='w-75 p-3'
                            />
                        </div>
                        <strong className='fs-4'>{selectedPizza.name}</strong>
                        <p className='text-muted'>{selectedPizza.description}</p>
                        <Divider />
                        <div><strong>Tanlangan bort: </strong></div>
                        <div><strong>Masalliqlar: </strong></div>
                        <div className='mt-4'>
                            <strong className='fs-2'>{selectedPizza.price} so'm</strong>
                        </div>
                    </Col>
                    <Col span={12} >
                        <div>
                            <div className='text-start'>
                                <strong className='fs-5'>Pitsa kattaligi</strong>
                            </div>
                            <Segmented
                                size='large'
                                options={['Kichkina', 'O`rtacha', 'Katta']}
                                block
                                className='mb-3'
                            />
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Segmented
                                        size='large'
                                        options={['Yupqa', 'Qalin']}
                                        block
                                    />
                                </Col>
                                <Col span={12}>
                                    <Button className='w-100 bg-warning text-black' size='large' shape="round" htmlType="submit" type="primary">
                                        <EditOutlined /> Bo`rtni o`zgartirish
                                    </Button>
                                </Col>
                            </Row>
                            <div className='text-start mt-4'>
                                <strong className='fs-5'>Masalliqlarni tanlang</strong>
                            </div>
                            <div className="text-center position-absolute bottom-0 w-100">
                                <Button className=' bg-success w-100' size='large' shape="round" htmlType="submit" type="primary">
                                    Savatga qo'shish
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal>)}
        </div>
    );
};

export default Dessert;
