import React, { useContext, useEffect, useRef, useState } from 'react';
import { OrderFormContext } from '../../contexts/OrderFormContext';
import { motion as m } from 'framer-motion';
import { LazyMotion, domAnimation } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import formatCurrency from '../../../../utils/formatCurrency';

const ModalCart = () => {
    const { formik, modals, setModals } = useContext(OrderFormContext);
    const { values, setFieldValue } = formik;
    const cartPopupRef = useRef(null);


    const handleCartClickOutside = (e) => {
        if (cartPopupRef.current && !cartPopupRef.current.contains(e.target)) {
            setModals({ ...modals, cart: false });
        }
    };

    const handleRemoveFromCart = (index) => {
        const updatedCart = values.cart.filter((_, i) => i !== index);
        setFieldValue("cart", updatedCart);
    }

    const handleUpdateQuantity = (index, newQuantity) => {
        const updatedCart = [...values.cart];
        updatedCart[index].quantity = newQuantity;
        setFieldValue("cart", updatedCart);
    }

    const calculateTotal = () => {
        return values.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    return (
        <div>
            {modals.cart && (
                <>
                    <div
                        className="blur-background"
                        onClick={handleCartClickOutside}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 999
                        }}
                    ></div>
                    <div
                        className="popup"
                        ref={cartPopupRef}
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            width: "90%",
                            maxWidth: "400px",
                            maxHeight: "80vh",
                            overflowY: "auto",
                            zIndex: 1000,
                            fontFamily: "Montserrat, sans-serif"
                        }}
                    >
                        <h3 style={{
                            textAlign: "center",
                            marginBottom: "20px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "black"
                        }}>
                            Keranjang Belanja
                        </h3>

                        {/* Cart Items */}
                        <div style={{ marginBottom: "20px" }}>
                            {values.cart.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: "10px",
                                        padding: "15px",
                                        marginBottom: "10px"
                                    }}
                                >
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "10px"
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: "bold", color: "black" }}>
                                                {item.type === 'parfum' ? 'Parfum' : item.type === 'shoelace' ? 'Tali Sepatu' : item.name} {item.variant}
                                            </p>
                                            <p style={{ color: "#666", fontSize: "14px" }}>
                                                {formatCurrency(item.price)} x {item.quantity} = {formatCurrency(item.price * item.quantity)}
                                            </p>
                                        </div>
                                        <LazyMotion features={domAnimation}>
                                            <m.button
                                                onClick={() => handleRemoveFromCart(index)}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    backgroundColor: "#FF0000",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "100px",
                                                    padding: "5px 10px",
                                                    cursor: "pointer",
                                                    fontSize: "12px"
                                                }}
                                            >
                                                Hapus
                                            </m.button>
                                        </LazyMotion>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        justifyContent: "center"
                                    }}>
                                        <LazyMotion features={domAnimation}>
                                            <m.button
                                                onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    backgroundColor: "#3787F7",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "100%",
                                                    width: "30px",
                                                    height: "30px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                -
                                            </m.button>
                                        </LazyMotion>
                                        <span style={{ margin: "0 10px", fontWeight: "bold" }}>{item.quantity}</span>
                                        <LazyMotion features={domAnimation}>
                                            <m.button
                                                onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    backgroundColor: "#3787F7",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "100%",
                                                    width: "30px",
                                                    height: "30px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                +
                                            </m.button>
                                        </LazyMotion>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div style={{
                            borderTop: "2px solid #ddd",
                            paddingTop: "15px",
                            marginBottom: "20px",
                            textAlign: "right",
                            fontWeight: "bold",
                            color: "black"
                        }}>
                            Total: {formatCurrency(calculateTotal())}
                        </div>

                        {/* Close Button */}
                        <LazyMotion features={domAnimation}>
                            <m.button
                                onClick={() => setModals({ ...modals, cart: false })}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    backgroundColor: "#545454",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50px",
                                    padding: "12px",
                                    width: "100%",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                }}
                            >
                                Tutup Keranjang
                            </m.button>
                        </LazyMotion>
                    </div>
                </>
            )}

            {values.cart.length > 0 && !modals.popup && !modals.shoelace && !modals.paket && (
                <LazyMotion features={domAnimation}>
                    <m.button
                        onClick={() => setModals({ ...modals, cart: true })}
                        whileTap={{ scale: 0.9 }}
                        transition={{ stiffness: 1000, damping: 5 }}
                        style={{
                            marginTop: "10px",
                            backgroundColor: "#FD6B04",
                            color: "white",
                            fontFamily: "Montserrat, sans-serif",
                            border: "none",
                            borderRadius: "50px",
                            padding: "12px 20px",
                            width: "100%",
                            maxWidth: "290px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            cursor: "pointer",
                            fontSize: "14px"
                        }}
                    >
                        <FaShoppingCart size={18} />
                        Keranjang ({values.cart.length})
                    </m.button>
                </LazyMotion>
            )}
        </div>
    );
};

export default ModalCart;