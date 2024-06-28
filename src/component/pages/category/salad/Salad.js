import { Row, Col, Card, Button, Tag, Modal, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import '../category.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategory } from '../../../../store/actions/product/product';
import { addProductToCart, getProductCountFromCart } from '../../../../store/actions/cart/cart';

const Salad = () => {
    const dispatch = useDispatch();
    const [selectedSalad, setSelectedSalad] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { saladList } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProductByCategory('SALAD'));
    }, [dispatch]);

    const showModal = (pizza) => {
        setSelectedSalad(pizza);
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
            formData.append('name', selectedSalad.name);
            formData.append('price', selectedSalad.price);
            formData.append('quantity', 1);
            if (selectedSalad.attachment) {
                const file = dataURItoBlob(selectedSalad.attachment.contentByte, selectedSalad.attachment.contentType);
                formData.append('attachment', file, selectedSalad.attachment.fileOriginalName);
            }

            let res = await dispatch(addProductToCart(formData));
            if (res.payload.status === 200) {
                notification.success({
                    icon: (
                        <img
                            src={`data:${selectedSalad.attachment.contentType};base64,${selectedSalad.attachment.contentByte}`}
                            alt={selectedSalad.name}
                            style={{ width: 40, height: 40 }}
                        />
                    ),
                    message: <span className='ms-4 mt-1'><strong>{selectedSalad.name}</strong> savatga qo'shildi</span>,
                    duration: 3
                });
                setIsModalVisible(false);
                dispatch(getProductCountFromCart());
            } else {
                notification.error({
                    message: <div> <strong>{selectedSalad.name}</strong>don't saved</div>,
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
                    {saladList?.map((item, index) => (
                        <Col xs={24} sm={12} md={12} lg={6} xl={6} key={index}>
                            <div className='hoverable-card' onClick={() => showModal(item)}>
                                <Card
                                    style={{ width: '100%', height: '350px' }}
                                    bordered={false}
                                    className='text-start'
                                    cover={
                                        <div className="d-flex justify-content-center align-items-center overflow-hidden">
                                            <img
                                                src={`data:${item.attachment.contentType};base64,${item.attachment.contentByte}`}
                                                alt={item.name}
                                                style={{ height: '75%', width: '75%', objectFit: 'cover', marginTop: '50px' }}
                                            />
                                        </div>
                                    }
                                >
                                    <div className='mt-2 fs-6'> {item.name}
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 20 }}>
                                        <Tag className='fs-6'><strong>{item.price} so'm</strong></Tag>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            {selectedSalad && (<Modal styles={modalStyles} centered footer={null} open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={900}>
                <Row gutter={16}>
                    <Col span={12}>
                        <div className='text-center'>
                            <img
                                src={`data:${selectedSalad.attachment.contentType};base64,${selectedSalad.attachment.contentByte}`}
                                alt={selectedSalad.name}
                                className='w-75 p-3'
                            />
                        </div>
                    </Col>
                    <Col span={12} className='mt-3'>
                        <div className='mt-5'>
                            <strong className='fs-3'>{selectedSalad.name}</strong>
                        </div>
                        <div className='fs-5 mt-1'>
                            {selectedSalad.price} so'm
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

export default Salad;
