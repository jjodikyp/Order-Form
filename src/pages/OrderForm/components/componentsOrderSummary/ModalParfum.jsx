import React, { useContext, useState } from 'react';
import { OrderFormContext } from '../../contexts/OrderFormContext';
import { LazyMotion, m, domAnimation } from "framer-motion";

const ModalParfum = () => {
    const { formik, modals, setModals } = useContext(OrderFormContext);
    const { setFieldValue } = formik;
    const [selectedVariant, setSelectedVariant] = useState("");
    const [quantity, setQuantity] = useState(1);

    const variants = [
        { name: "Apple", isSoldOut: true },
        { name: "Vanilla", isSoldOut: true },
        "BubbleGum",
        { name: "Grape", isSoldOut: true },
        { name: "BlackCoffee", isBestSeller: true },
        { name: "Lavender", isBestSeller: true },
        { name: "Coklat", isSoldOut: true }
    ];

    const handleAddToCart = () => {
        if (!selectedVariant || !quantity) {
            alert("Silakan pilih varian parfum dan jumlah");
            return;
        }

        const newItem = {
            type: "parfum",
            variant: selectedVariant,
            quantity: quantity,
            price: 30000
        };

        setFieldValue("cart", [...formik.values.cart, newItem]);
        setModals({ ...modals, parfum: false });
        setSelectedVariant("");
        setQuantity(1);
    };

    return (
        <div>
            {/* Parfum Popup */}
            {modals.parfum && (
                <>
                    <div className="blur-background"></div>
                    <div className="popup" style={{
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
                        zIndex: 1000
                    }}>
                        <div id="popupContent" style={{
                            color: "black",
                            fontFamily: "Montserrat, sans-serif",
                        }}>
                            <h3 style={{ marginBottom: "15px", fontSize: "18px", textAlign: "center", fontFamily: "Montserrat, sans-serif" }}>Pilih Varian:</h3>

                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "10px",
                                marginBottom: "20px"
                            }}>
                                {variants.map(variant => {
                                    const variantName = typeof variant === 'string' ? variant : variant.name;
                                    const isBestSeller = typeof variant === 'object' && variant.isBestSeller;
                                    const isSoldOut = typeof variant === 'object' && variant.isSoldOut;

                                    return (
                                        <div key={variantName} style={{ position: 'relative' }}>
                                            <m.button
                                                onClick={() => {
                                                    if (isSoldOut) {
                                                        alert(`Maaf, aroma ${variantName} sedang sold out`);
                                                        return;
                                                    }
                                                    setSelectedVariant(variantName);
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    padding: "10px",
                                                    borderRadius: "10px",
                                                    border: "none",
                                                    backgroundColor: selectedVariant === variantName ? "#3787F7" : "#f0f0f0",
                                                    color: selectedVariant === variantName ? "white" : "black",
                                                    cursor: isSoldOut ? "not-allowed" : "pointer",
                                                    fontFamily: "Montserrat, sans-serif",
                                                    fontSize: "14px",
                                                    transition: "all 0.2s",
                                                    width: "100%",
                                                    opacity: isSoldOut ? 0.6 : 1
                                                }}
                                            >
                                                {variantName}
                                            </m.button>
                                            {isBestSeller && (
                                                <m.div
                                                    initial={{ scale: 1 }}
                                                    animate={{
                                                        scale: [1, 1.1, 1],
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: 0.5
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '-8px',
                                                        right: '-8px',
                                                        backgroundColor: '#000000',
                                                        color: 'white',
                                                        padding: '2px 6px',
                                                        borderRadius: '8px',
                                                        fontSize: '10px'
                                                    }}
                                                >
                                                    Best Seller
                                                </m.div>
                                            )}
                                            {isSoldOut && (
                                                <m.div
                                                    initial={{ scale: 1 }}
                                                    animate={{
                                                        scale: [1, 1.1, 1],
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: 0.5
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: isBestSeller ? '15px' : '-8px',
                                                        right: '-8px',
                                                        backgroundColor: '#FF0000',
                                                        color: 'white',
                                                        padding: '2px 6px',
                                                        borderRadius: '8px',
                                                        fontSize: '10px'
                                                    }}
                                                >
                                                    Sold Out
                                                </m.div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <h3 style={{ marginBottom: "15px", fontSize: "18px", textAlign: "center", fontFamily: "Montserrat, sans-serif" }}>Jumlah:</h3>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center" }}>
                                <LazyMotion features={domAnimation}>
                                    <m.button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ stiffness: 1000, damping: 5 }}
                                        style={{
                                            padding: "10px 15px",
                                            borderRadius: "50%",
                                            width: "40px",
                                            height: "40px",
                                            backgroundColor: "#3787F7",
                                            color: "white",
                                            border: "none",
                                            fontSize: "18px",
                                            fontFamily: "Montserrat, sans-serif",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >-</m.button>
                                </LazyMotion>
                                <span style={{ margin: "0 20px", fontSize: "18px", fontFamily: "Montserrat, sans-serif" }}>{quantity}</span>
                                <LazyMotion features={domAnimation}>
                                    <m.button
                                        onClick={() => setQuantity(quantity + 1)}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ stiffness: 1000, damping: 5 }}
                                        style={{
                                            padding: "10px 15px",
                                            borderRadius: "50%",
                                            width: "40px",
                                            height: "40px",
                                            backgroundColor: "#3787F7",
                                            color: "white",
                                            border: "none",
                                            fontSize: "18px",
                                            fontFamily: "Montserrat, sans-serif",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >+</m.button>
                                </LazyMotion>
                            </div>

                            <LazyMotion features={domAnimation}>
                                <m.button
                                    onClick={handleAddToCart}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ stiffness: 1000, damping: 5 }}
                                    style={{
                                        backgroundColor: "#3787F7",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50px",
                                        padding: "12px",
                                        marginTop: "10px",
                                        cursor: "pointer",
                                        fontFamily: "Montserrat, sans-serif",
                                        width: "100%",
                                        fontSize: "16px"
                                    }}
                                >
                                    Tambah ke Keranjang
                                </m.button>
                                <m.button
                                    onClick={() => setModals({ ...modals, parfum: false })}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ stiffness: 1000, damping: 5 }}
                                    style={{
                                        backgroundColor: "#545454",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50px",
                                        padding: "12px",
                                        marginTop: "10px",
                                        cursor: "pointer",
                                        fontFamily: "Montserrat, sans-serif",
                                        width: "100%",
                                        fontSize: "16px"
                                    }}
                                >
                                    Batalkan
                                </m.button>
                            </LazyMotion>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModalParfum;