import React, { useContext, useState } from 'react';
import { OrderFormContext } from '../../contexts/OrderFormContext';
import { LazyMotion, m, domAnimation } from "framer-motion";


const ModalShoelace = () => {
    const { formik, modals, setModals } = useContext(OrderFormContext);
    const { setFieldValue } = formik;
    const [selectedShoelaceColor, setSelectedShoelaceColor] = useState("");
    const [shoelaceQuantity, setShoelaceQuantity] = useState(1);
    const [customColor, setCustomColor] = useState("");

    const shoelaceColors = [
        "Sesuaikan dengan warna saat ini",
        "Warna Lainnya"
    ];

    const handleAddShoelaceToCart = () => {
        if (!selectedShoelaceColor || !shoelaceQuantity) {
            alert("Silakan pilih warna dan jumlah");
            return;
        }

        const newItem = {
            type: "shoelace",
            color: selectedShoelaceColor,
            quantity: shoelaceQuantity,
            price: 30000
        };

        setFieldValue("cart", [...formik.values.cart, newItem]);
        setModals({ ...modals, shoelace: false });
    }

    return (
        <div>
            {modals.shoelace && (
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
                            <h3 style={{ marginBottom: "15px", fontSize: "18px", textAlign: "center", fontFamily: "Montserrat, sans-serif" }}>Pilih Warna:</h3>

                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "10px",
                                marginBottom: "20px"
                            }}>
                                {shoelaceColors.map(color => (
                                    <m.button
                                        key={color}
                                        onClick={() => setSelectedShoelaceColor(color)}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            padding: "10px",
                                            borderRadius: "10px",
                                            border: "none",
                                            backgroundColor: selectedShoelaceColor === color ? "#3787F7" : "#f0f0f0",
                                            color: selectedShoelaceColor === color ? "white" : "black",
                                            cursor: "pointer",
                                            fontFamily: "Montserrat, sans-serif",
                                            fontSize: "14px",
                                            transition: "all 0.2s"
                                        }}
                                    >
                                        {color}
                                    </m.button>
                                ))}
                            </div>

                            {selectedShoelaceColor === "Warna Lainnya" && (
                                <div style={{ marginBottom: "20px" }}>
                                    <input
                                        type="text"
                                        value={customColor}
                                        onChange={(e) => setCustomColor(e.target.value)}
                                        placeholder="Masukkan warna yang diinginkan"
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "10px",
                                            border: "1px solid #ccc",
                                            fontFamily: "Montserrat, sans-serif",
                                            backgroundColor: "white",
                                            color: "black"
                                        }}
                                    />
                                </div>
                            )}

                            <h3 style={{ marginBottom: "15px", fontSize: "18px", textAlign: "center", fontFamily: "Montserrat, sans-serif" }}>Jumlah:</h3>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center" }}>
                                <LazyMotion features={domAnimation}>
                                    <m.button
                                        onClick={() => setShoelaceQuantity(Math.max(1, shoelaceQuantity - 1))}
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
                                <span style={{ margin: "0 20px", fontSize: "18px", fontFamily: "Montserrat, sans-serif" }}>{shoelaceQuantity}</span>
                                <LazyMotion features={domAnimation}>
                                    <m.button
                                        onClick={() => setShoelaceQuantity(shoelaceQuantity + 1)}
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
                                    onClick={handleAddShoelaceToCart}
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
                                        setModals({ ...modals, shoelace: false });
                                        setSelectedShoelaceColor("");
                                        setCustomColor("");
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

export default ModalShoelace;