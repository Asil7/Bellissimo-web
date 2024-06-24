import { useDispatch, useSelector } from "react-redux";
import { getProductByCart } from "../../../store/actions/cart/cart";
import { useEffect } from "react";
import { Card, Col, Tag } from "antd";

const Cart = () => {
  const { cartProductList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductByCart());
  }, [dispatch]);

  console.log(cartProductList);

  return (
    <div className="mt-5">
       {cartProductList?.map((item, index) => (
                        <Col xs={24} sm={12} md={12} lg={6} xl={6} key={index}>
                            <div className='hoverable-card'>
                                <Card
                                    style={{ height: '350px' }}
                                    bordered={false}
                                    className='text-start shadow'
                                    cover={
                                        <div className="d-flex justify-content-center align-items-center overflow-hidden">
                                            <img
                                                src={`data:${item.attachment.contentType};base64,${item.attachment.contentByte}`}
                                                alt={item.name}
                                                style={{ height: '60%', width: '60%', objectFit: 'cover', marginTop: '50px'}}
                                            />
                                        </div>
                                    }
                                >
                                    <div className='mt-5 fs-6'>
                                        {item.name}
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 20 }}>
                                        <Tag className='fs-6'><strong>{item.price} so'mdan</strong></Tag>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    ))}
    </div>
  );
};

export default Cart;
