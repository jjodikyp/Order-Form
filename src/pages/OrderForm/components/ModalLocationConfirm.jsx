import React, { useContext } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { OrderFormContext } from '../contexts/OrderFormContext';


const ModalLocationConfirm = () => {
    const { formik, modals, setModals } = useContext(OrderFormContext);
    const { values, touched, errors, handleChange, setFieldValue } = formik;


    const handleConfirmLocation = () => {
        setModals({ ...modals, showLocationConfirmPopup: false });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

                    setFieldValue('locationLink', googleMapsLink);

                    alert(
                        "Lokasi berhasil dibagikan! Lokasi anda telah diubah menjadi Link Google Maps dan akan digunakan untuk keperluan pengiriman!"
                    );
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert(
                        "Gagal mendapatkan lokasi. Pastikan GPS aktif dan izin lokasi diberikan."
                    );
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            alert("Browser anda tidak mendukung geolokasi.");
        }
    };

    const handleCancelLocation = () => {
        setModals({ ...modals, showLocationConfirmPopup: false });
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "30px",
                    maxWidth: "400px",
                    width: "80%",
                    textAlign: "center",
                    fontFamily: "Montserrat, sans-serif",
                }}
            >
                <p
                    style={{
                        marginBottom: "20px",
                        fontSize: "14px",
                        lineHeight: "1.5",
                    }}
                >
                    Driver akan menjemput di titik lokasi yang anda bagikan. Pastikan berada di titik penjemputan saat membagikan lokasi!
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <LazyMotion features={domAnimation}>
                        <m.button
                            onClick={handleConfirmLocation}
                            style={{
                                backgroundColor: "#3787F7",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "20px",
                                cursor: "pointer",
                                fontFamily: "Montserrat, sans-serif",
                                fontSize: "14px",
                            }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ stiffness: 1000, damping: 5 }}
                        >
                            Bagikan Posisi Saat Ini
                        </m.button>
                        <m.button
                            onClick={handleCancelLocation}
                            style={{
                                backgroundColor: "#6B7280",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "20px",
                                cursor: "pointer",
                                fontFamily: "Montserrat, sans-serif",
                                fontSize: "14px",
                            }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ stiffness: 1000, damping: 5 }}
                        >
                            Saya Tidak di Lokasi
                        </m.button>
                    </LazyMotion>
                </div>
            </div>
        </div>
    );
};

export default ModalLocationConfirm;