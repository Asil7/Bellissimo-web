import { Row, Col, Card, Button, Tag, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import '../category.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategory } from '../../../../store/actions/product/product';

const Dessert = () => {
    const dispatch = useDispatch();
    const [selectedDessert, setSelectedDessert] = useState(null);
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
        setSelectedDessert(pizza);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const modalStyles = {
        mask: {
            backdropFilter: 'blur(5px)',
        },
    };

    return (
        <div>
            <div className='w-100 mb-4'>
                <Row gutter={[9, 9]}>
                    {dessertList?.map((item, index) => (
                        <Col xs={24} sm={12} md={12} lg={6} xl={6} key={index}>
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

            {selectedDessert && (<Modal styles={modalStyles} centered footer={null} open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={900}>
                <Row gutter={16}>
                    <Col span={12}>
                        <div className='text-center'>
                            <img
                                src={`data:${selectedDessert.attachment.contentType};base64,${selectedDessert.attachment.contentByte}`}
                                alt={selectedDessert.name}
                                className='w-75 p-3'
                            />
                        </div>
                    </Col>
                    <Col span={12} className='mt-3'>
                        <div className='mt-5'>
                            <strong className='fs-3'>{selectedDessert.name}</strong>
                        </div>
                        <div className='fs-5 mt-1'>
                            {selectedDessert.price} so'm
                        </div>
                        <div className="text-center position-absolute w-75 mt-5">
                            <Button className='bg-success w-100' size='large' shape="round" htmlType="submit" type="primary">
                                <strong>Savatga qo'shish</strong>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Modal>)}
        </div>
    );
};

export default Dessert;
