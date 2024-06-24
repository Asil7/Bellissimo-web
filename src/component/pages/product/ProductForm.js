import { Button, Divider, Form, Input, Modal, Select, Upload, notification } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
// import { fetchPizzaList } from '../../../store/actions/pizza/pizza';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryEnums } from '../../../store/actions/enums/enums';
import { createProduct } from '../../../store/actions/product/product';

const ProductForm = ({ isModalOpen, setIsModalOpen }) => {
    const { control, handleSubmit, setValue, reset, watch } = useForm();
    const [fileList, setFileList] = useState([]);
    const dispatch = useDispatch();
    const { categoryEnums } = useSelector((state) => state.enums);
    const [formVisible, setFormVisible] = useState(false);

    const category = watch('category');

    useEffect(() => {
        dispatch(fetchCategoryEnums());
    }, [dispatch])

    useEffect(() => {
        if(category){
            setFormVisible(true);
        }
    }, [category]);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setFormVisible(false);
        setFileList([]);
        reset({});
    };

    const layout = {
        labelCol: {
            span: 6
        }
    };

    const onFinish = async (data) => {
        console.log(data);
        try {
            const formData = new FormData();
            formData.append('category', data.category);
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('description', data.description);

            if (fileList.length > 0) {
                formData.append('attachment', fileList[0].originFileObj);
            }
            let res = await dispatch(createProduct(formData));
            console.log(res.payload.status);
            if (res.payload.status === 200) {
                // dispatch(fetchPizzaList());
                notification.success({
                    message: "Pizza successfully saved",
                    duration: 8
                });
            } else {
                notification.error({
                    message: "Pizza don't saved",
                    duration: 8
                });
            }
        } catch (e) {
        } finally {
            handleCancel();
        }
    };


    const uploadPicture = ({ fileList }) => {
        setFileList(fileList);
        setValue("attachment", fileList);
    };

    return (
        <>
            <Modal footer={null} title="Add Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <>
                        <Form {...layout} onFinish={handleSubmit(onFinish)}>
                            <Form.Item label="Category" labelAlign="left">
                                <Controller
                                    name="category"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={categoryEnums?.map((value) => ({
                                                value: value,
                                                label: value
                                            }))}
                                        />
                                    )}
                                />
                            </Form.Item>
                            
                            <Divider/>
                            
                            {formVisible && <div>
                                <Form.Item label="Name" labelAlign="left">
                                    <Controller
                                        name="name"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field, fieldState }) => (
                                            <Input {...field} status={fieldState.invalid ? 'error' : ''} />
                                        )}
                                    />
                                </Form.Item>
                                <Form.Item label="Price" labelAlign="left">
                                    <Controller
                                        name="price"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field, fieldState }) => (
                                            <Input {...field} status={fieldState.invalid ? 'error' : ''} />
                                        )}
                                    />
                                </Form.Item>
                                {(category === 'PIZZA' || category === 'SNACK') && (
                                    <Form.Item label="Description" labelAlign="left">
                                        <Controller
                                            name="description"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field, fieldState }) => (
                                                <Input {...field} status={fieldState.invalid ? 'error' : ''} />
                                            )}
                                        />
                                    </Form.Item>
                                )}
                                <Form.Item label="Image" labelAlign="left">
                                    <Controller
                                        name="attachment"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Upload
                                                {...field}
                                                fileList={fileList}
                                                onChange={uploadPicture}
                                                listType="picture"
                                                maxCount={1}
                                                beforeUpload={() => false}
                                            >
                                                <Button icon={<UploadOutlined />}>Upload</Button>
                                            </Upload>
                                        )}
                                    />
                                </Form.Item>
                                <div className='text-end'>
                                    <Button onClick={() => handleCancel()} className='me-1'>Cancel</Button>
                                    <Button htmlType="submit">Save</Button>
                                </div>
                            </div>}
                        </Form>
                    </>
                </div>
            </Modal>
        </>
    );
};
export default ProductForm;
