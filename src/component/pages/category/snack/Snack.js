import { Row, Col, Card, Button, Tag, Modal, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import '../category.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategory } from '../../../../store/actions/product/product';
import { addProductToCart, getProductCountFromCart } from '../../../../store/actions/cart/cart';

const Snack = () => {
    const dispatch = useDispatch();
    const [selectedSnack, setSelectedSnack] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { snackList } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProductByCategory('SNACK'));
    }, [dispatch]);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const showModal = (pizza) => {
        setSelectedSnack(pizza);
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
            formData.append('name', selectedSnack.name);
            formData.append('price', selectedSnack.price);
            formData.append('quantity', 1);
            if (selectedSnack.attachment) {
                const file = dataURItoBlob(selectedSnack.attachment.contentByte, selectedSnack.attachment.contentType);
                formData.append('attachment', file, selectedSnack.attachment.fileOriginalName);
            }

            let res = await dispatch(addProductToCart(formData));
            if (res.payload.status === 200) {
                notification.success({
                    icon: (
                        <img
                            src={`data:${selectedSnack.attachment.contentType};base64,${selectedSnack.attachment.contentByte}`}
                            alt={selectedSnack.name}
                            style={{ width: 40, height: 40 }}
                        />
                    ),
                    message: <span className='ms-4 mt-1'><strong>{selectedSnack.name}</strong> savatga qo'shildi</span>,
                    duration: 3
                });
                setIsModalVisible(false);
                dispatch(getProductCountFromCart());
            } else {
                notification.error({
                    message: <div> <strong>{selectedSnack.name}</strong>don't saved</div>,
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
                    {snackList?.map((item, index) => (
                        <Col xs={24} sm={12} md={12} lg={6} xl={6} key={index}>
                            <div className='hoverable-card' onClick={() => showModal(item)}>
                                <Card
                                    style={{ width: '100%', height: '380px' }}
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
                                    <div className='fs-6'>{item.name}</div>
                                    {item.description !== null && <div className='text-secondary mt-1'>
                                        {truncateText(item.description, 180)}
                                    </div>}
                                    <div style={{ position: 'absolute', bottom: 20 }}>
                                        <Tag className='fs-6'><strong>{item.price} so'm</strong></Tag>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            {selectedSnack && (<Modal styles={modalStyles} centered footer={null} open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={900}>
                <Row gutter={16}>
                    <Col span={12}>
                        <div className='text-center'>
                            <img
                                src={`data:${selectedSnack.attachment.contentType};base64,${selectedSnack.attachment.contentByte}`}
                                alt={selectedSnack.name}
                                className='w-75 p-3'
                            />
                        </div>
                    </Col>
                    <Col span={12} className='mt-3'>
                        <div className='mt-5'>
                            <strong className='fs-3'>{selectedSnack.name}</strong>
                        </div>
                       {selectedSnack.description !== null && <div className='text-secondary line-height fs-6'>
                            {selectedSnack.description}
                        </div>}
                        <div className='fs-5 mt-2'>
                            {selectedSnack.price} so'm
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

export default Snack;
