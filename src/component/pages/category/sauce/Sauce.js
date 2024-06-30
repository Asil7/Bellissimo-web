import { Row, Col, Card, Button, Tag, Modal, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import '../category.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategory } from '../../../../store/actions/product/product';
import { addProductToCart, getProductCountFromCart } from '../../../../store/actions/cart/cart';

const Sauce = () => {
    const dispatch = useDispatch();
    const [selectedSauce, setSelectedSauce] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { sauceList } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProductByCategory('SAUCE'));
    }, [dispatch]);


    const showModal = (pizza) => {
        setSelectedSauce(pizza);
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

    const handleAddProductToCart = async () => {
        try {
            const formData = new FormData();
            formData.append('name', selectedSauce.name);
            formData.append('price', selectedSauce.price);
            formData.append('quantity', 1);
            if (selectedSauce.attachment) {
                const file = dataURItoBlob(selectedSauce.attachment.contentByte, selectedSauce.attachment.contentType);
                formData.append('attachment', file, selectedSauce.attachment.fileOriginalName);
            }

            let res = await dispatch(addProductToCart(formData));
            if (res.payload.status === 200) {
                notification.success({
                    icon: (
                        <img
                            src={`data:${selectedSauce.attachment.contentType};base64,${selectedSauce.attachment.contentByte}`}
                            alt={selectedSauce.name}
                            style={{ width: 40, height: 40 }}
                        />
                    ),
                    message: <span className='ms-4 mt-1'><strong>{selectedSauce.name}</strong> savatga qo'shildi</span>,
                    duration: 3
                });
                setIsModalVisible(false);
                dispatch(getProductCountFromCart());
            } else {
                notification.error({
                    message: <div> <strong>{selectedSauce.name}</strong>don't saved</div>,
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

    return (
        <div>
            <div className='w-100 mb-4'>
                <Row gutter={[16, 16]}>
                    {sauceList?.map((item, index) => (
                        <Col xs={24} sm={12} md={12} lg={6} xl={6} key={index}>
                            <div className='hoverable-card' onClick={() => showModal(item)}>
                                <Card
                                    style={{ width: '100%', height: '320px' }}
                                    bordered={false}
                                    className='text-start'
                                    cover={
                                        <div className="d-flex justify-content-center align-items-center overflow-hidden">
                                            <img
                                                src={`data:${item.attachment.contentType};base64,${item.attachment.contentByte}`}
                                                alt={item.name}
                                                style={{ height: '75%', width: '75%', objectFit: 'cover', marginTop: '30px' }}
                                            />
                                        </div>
                                    }
                                >
                                    <div className='fs-6 mt-1'>{item.name}</div>
                                    <div style={{ position: 'absolute', bottom: 20 }}>
                                        <Tag className='fs-6'><strong>{item.price} so'mdan</strong></Tag>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            {selectedSauce && (<Modal styles={modalStyles} centered footer={null} open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={900}>
                <Row gutter={16}>
                    <Col span={12}>
                        <div className='text-center'>
                            <img
                                src={`data:${selectedSauce.attachment.contentType};base64,${selectedSauce.attachment.contentByte}`}
                                alt={selectedSauce.name}
                                className='w-75 p-3'
                            />
                        </div>
                    </Col>
                    <Col span={12} className='mt-3'>
                        <div className='mt-5'>
                            <strong className='fs-3'>{selectedSauce.name}</strong>
                        </div>
                        <div className='fs-5 mt-1'>
                            {selectedSauce.price} so'm
                        </div>
                        <div className="text-center position-absolute w-75 mt-5">
                            <Button onClick={() => handleAddProductToCart()} className='bg-success w-100' size='large' shape="round" htmlType="submit" type="primary">
                                <strong>Savatga qo'shish</strong>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Modal>)}
        </div>
    );
};

export default Sauce;
