import React, { useContext, useState } from 'react';
import { OrderFormContext } from '../../contexts/OrderFormContext';
import { motion as m } from 'framer-motion';
import { LazyMotion, domAnimation } from 'framer-motion';

const ModalPaket = () => {
    const { formik, modals, setModals } = useContext(OrderFormContext);
    const { setFieldValue } = formik;
    const [selectedPaket, setSelectedPaket] = useState("");
    const [paketQuantity, setPaketQuantity] = useState(1);

    const paketVariants = [
        { name: "Suede Care", price: 20000 },
        { name: "Penghilang Bau", price: 15000 },
        { name: "Tambahan Pengharum", price: 5000 },
        { name: "Penghilang Noda", price: 15000 },
        { name: "Leather Care", price: 20000 },
        { name: "Penghilang Jamur", price: 15000 }
    ];

    const handleAddPaketToCart = () => {
        if (!selectedPaket || !paketQuantity) {
            alert("Silakan pilih paket dan jumlah");
            return;
        }

        const newItem = {
            type: "paket",
            name: selectedPaket,
            quantity: paketQuantity,
            price: paketVariants.find(paket => paket.name === selectedPaket).price
        };

        setFieldValue("cart", [...formik.values.cart, newItem]);
        setModals({ ...modals, paket: false });
        setSelectedPaket("");
        setPaketQuantity(1);
    }


    return (
        <div>
            {modals.paket && (
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
                            <h3 style={{ marginBottom: "15px", fontSize: "18px", textAlign: "center", fontFamily: "Montserrat, sans-serif" }}>Pilih Paket:</h3>

                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "10px",
                                marginBottom: "20px"
                            }}>
                                {paketVariants.map(paket => (
                                    <m.button
                                        key={paket.name}
                                        onClick={() => setSelectedPaket(paket.name)}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            padding: "10px",
                                            borderRadius: "10px",
                                            border: "none",
                                            backgroundColor: selectedPaket === paket.name ? "#3787F7" : "#f0f0f0",
                                            color: selectedPaket === paket.name ? "white" : "black",
                                            cursor: "pointer",
                                            fontFamily: "Montserrat, sans-serif",
                                            fontSize: "14px",
                                            transition: "all 0.2s"
                                        }}
                                    >
                                        {paket.name}
                                        <br />
                                        <span style={{ fontSize: "12px" }}>
                                            Rp{paket.price.toLocaleString()}
                                        </span>
                                    </m.button>
                                ))}
                            </div>

                            <h3 style={{ marginBottom: "15px", fontSize: "18px", textAlign: "center", fontFamily: "Montserrat, sans-serif" }}>Untuk berapa item?</h3>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center" }}>
                                <LazyMotion features={domAnimation}>
                                    <m.button
                                        onClick={() => setPaketQuantity(Math.max(1, paketQuantity - 1))}
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
                                <span style={{ margin: "0 20px", fontSize: "18px", fontFamily: "Montserrat, sans-serif" }}>{paketQuantity}</span>
                                <LazyMotion features={domAnimation}>
                                    <m.button
                                        onClick={() => setPaketQuantity(paketQuantity + 1)}
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
                                    onClick={handleAddPaketToCart}
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
                                    onClick={() => {
                                        setModals({ ...modals, paket: false });
                                        setSelectedPaket("");
                                    }}
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

export default ModalPaket;