import React, { useContext } from 'react';
import { OrderFormContext } from '../../contexts/OrderFormContext';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import formatCurrency from '../../../../utils/formatCurrency';

const ModalConfirm = () => {
    const { formik, modals, setModals, initialValues } = useContext(OrderFormContext);
    const { values, setValues } = formik;
    const navigate = useNavigate();

    const handleClickOutside = () => {
        setModals({ ...modals, confirmation: false });
    }

    const truncateMessage = (message, wordCount = 5) => {
        if (!message) return "";
        const words = message.split(" ");
        if (words.length <= wordCount) return message;
        return words.slice(0, wordCount).join(" ") + "...";
    };

    const calculateTotal = () => {
        return values.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    const formatWhatsAppMessage = (values, cartDetails) => {
        const fullAddress = `${values.address}, Kec. ${values.selectedDistrict}, ${values.selectedArea === 'kota' ? 'Kota' : 'Kabupaten'} Malang`;

        return `
*Ini Form Order saya yaa!*

*Nama:* ${values.name || '-'}
*Alamat:* ${fullAddress}
*Patokan:* ${values.pickupPoint || "-"}
*Link Lokasi:* ${values.locationLink || "-"}

*Jumlah Item:* ${values.itemCount || "-"}
*Item Yang Dipilih:* ${values.selectedItems?.join(", ") || "-"}
*Treatment Yang Dipilih:* ${values.selectedTreatments?.join(", ") || "-"}
*Estimasi Pengerjaan:* ${values.selectedEstimation.length > 0 ? values.selectedEstimation.join(", ") : "-"}
*Aroma Yang Dipilih:* ${values.selectedAromas?.join(", ") || "-"}

*Pick-up:* ${values.pickupDate ? dayjs(values.pickupDate).format("dddd, DD MMMM YYYY") : "-"}
*Waktu Pick-up:* ${values.pickupTime ? dayjs(`2024-01-01T${values.pickupTime}`).format("HH:mm") : "Belum dipilih"}

*Detail Produk Tambahan:*
${cartDetails}

${values.specialMessage ? `*Pesan Khusus:* ${values.specialMessage}\n` : ""}${values.knowFrom ? `\n*Saya tahu Katsikat dari:* ${values.knowFrom}` : ""}`;
    };

    const formatCartDetails = (cart) => {
        if (!cart || cart.length === 0) {
            return "Saya tidak membeli produk tambahan";
        }

        const getProductType = (item) => {
            switch(item.type?.toLowerCase()) {
                case 'parfum':
                    return 'Parfum';
                case 'shoelace':
                    return 'Tali Sepatu';
                case 'paket':
                    return item.name;
                default:
                    return 'Produk';
            }
        };

        const getProductVariant = (item) => {
            if (!item.variant) {
                switch(item.type?.toLowerCase()) {
                    case 'parfum':
                        return 'Custom';
                    case 'tali':
                        return 'Reguler';
                    case 'paket':
                        return item.name || '';
                    default:
                        return 'Regular';
                }
            }
            return item.variant;
        };

        // Tambahkan indentasi dan handling untuk undefined values
        const details = cart.map(item => {
            const productType = getProductType(item);
            const variant = getProductVariant(item);
            const price = item.price || 0;
            const quantity = item.quantity || 1;

            return `  ${quantity}x ${productType} ${variant} (Rp${(price * quantity).toLocaleString('id-ID')})`;
        }).join("\n");

        // Hitung total dengan safe check untuk price
        const total = cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);

        return `${details}\n\n*Total:* Rp${total.toLocaleString('id-ID')}`;
    };
    const handleConfirmOrder = () => {
        try {
            const cartDetails = formatCartDetails(values.cart);
            const message = formatWhatsAppMessage(values, cartDetails);
            const phoneNumber = "6287795452475";

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');

            setValues(initialValues);
            setModals({ ...modals, confirmation: false });
            // Redirect ke halaman awal
            navigate('/');

        } catch (error) {
            console.error('Error in handleConfirmOrder:', error);
            alert('Terjadi kesalahan saat mengirim pesanan. Silakan coba lagi.');
        }
    };

    return (
        <div>
            {modals.confirmation && (
                <>
                    <div
                        className="blur-background"
                        onClick={handleClickOutside}
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
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "35px",
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
                            Konfirmasi Pesanan
                        </h3>

                        {/* Data Diri */}
                        {(() => {
                            const areaType = values.selectedArea === 'kota' ? 'Kota' : 'Kabupaten';
                            const fullAddress = `${values.address}, Kec. ${values.selectedDistrict}, ${areaType} Malang`;

                            return (
                                <div style={{ marginBottom: "20px" }}>
                                    <h4 style={{ fontWeight: "bold", marginBottom: "10px", color: "#3787F7" }}>Data Diri:</h4>
                                    <div style={{ fontSize: "14px", color: "black" }}>
                                        <p><strong>Nama:</strong> {values.name}</p>
                                        <p><strong>Alamat:</strong> {fullAddress}</p>
                                        <p><strong>Patokan:</strong> {values.pickupPoint || "-"}</p>
                                        <p><strong>Link Lokasi:</strong> {values.locationLink || "-"}</p>
                                        <p><strong>Jumlah Item:</strong> {values.itemCount || "-"}</p>
                                        <p><strong>Item:</strong> {values.selectedItems.join(", ")}</p>
                                        <p><strong>Treatment:</strong> {values.selectedTreatments.join(", ")}</p>
                                        <p><strong>Estimasi Pengerjaan:</strong> {values.selectedEstimation.length > 0 ? values.selectedEstimation.join(", ") : "-"}</p>
                                        <p><strong>Aroma:</strong> {values.selectedAromas.join(", ")}</p>
                                        <p><strong>Tanggal Pick-up:</strong> {new Date(values.pickupDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        <p><strong>Waktu Pick-up:</strong> {values.pickupTime ? dayjs(`2024-12-19T${values.pickupTime}`).format("HH:mm") : "Belum dipilih"}</p>
                                        {values.specialMessage && (
                                            <p>
                                                <strong>Pesan Khusus:</strong>{" "}
                                                {modals.fullMessage ? (
                                                    <span>{values.specialMessage}</span>
                                                ) : (
                                                    <span
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Mencegah event bubbling ke parent
                                                            setModals({ ...modals, fullMessage: true });
                                                        }}
                                                        style={{ cursor: "pointer", color: "#3787F7" }}
                                                    >
                                                        {truncateMessage(values.specialMessage)}
                                                    </span>
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Detail Produk */}
                        {values.cart.length > 0 && (
                            <div style={{ marginBottom: "20px" }}>
                                <h4 style={{ fontWeight: "bold", marginBottom: "10px", color: "#3787F7" }}>Detail Produk:</h4>
                                <div style={{ fontSize: "14px", color: "black" }}>
                                    {values.cart.map((item, index) => (
                                        <p key={index}>
                                            {item.quantity}x {item.type === 'parfum' ? 'Parfum' : item.type === 'shoelace' ? 'Tali Sepatu' : item.name} {item.variant} ({formatCurrency(item.price * item.quantity)})
                                        </p>
                                    ))}
                                    <p style={{ marginTop: "10px", fontWeight: "bold" }}>Total: {formatCurrency(calculateTotal())}</p>
                                </div>
                            </div>
                        )}

                        {/* Buttons */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <LazyMotion features={domAnimation}>
                                <m.button
                                    onClick={handleConfirmOrder}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        backgroundColor: "#3787F7",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50px",
                                        padding: "12px",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    Sudah Benar
                                </m.button>
                                <m.button
                                    onClick={() => {
                                        setModals({ ...modals, confirmation: false });
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        backgroundColor: "#545454",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50px",
                                        padding: "12px",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    Ubah Pesanan
                                </m.button>
                            </LazyMotion>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ModalConfirm;