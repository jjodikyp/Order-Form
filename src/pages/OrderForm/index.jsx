import React, { useEffect, useState, useRef, useContext } from "react";
import "./styling/member.css";
import { defineElement } from "lord-icon-element";
import lottie from "lottie-web";
import { DatePicker } from "antd";
import { TimePicker } from "rsuite";
import dayjs from "dayjs";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import { KOTA_MALANG, KABUPATEN_MALANG, LATEST_ITEMS_STRUCTURE, LATEST_TREATMENTS_STRUCTURE, LATEST_AROMAS_STRUCTURE, LATEST_ESTIMATIONS_STRUCTURE } from "./constants/data";
import { OrderFormContext } from "./contexts/OrderFormContext";
import ModalLocationConfirm from "./components/ModalLocationConfirm";
import { ModalPickupTime } from "./components/ModalPickupTime";
import ModalPaket from "./components/componentsOrderSummary/ModalPaket";
import PaketTambahan from "../../assets/images/tambahan.jpg";


function App() {
    const { formik, modals, setModals } = useContext(OrderFormContext);
    const { values, touched, errors, handleChange, setFieldValue, isSubmitting, validateForm, handleBlur } = formik;
    const { showLocationConfirmPopup } = modals;


    const navigate = useNavigate();

    useEffect(() => {
        console.log("values", values);
        console.log("touched", touched);
        console.log("errors", errors);
    }, [values, touched, errors]);


    useEffect(() => {
        if (values.selectedItems.includes("PROMO 2 SEPATU")) {
            setFieldValue('selectedEstimation', [...values.selectedEstimation, "Estimasi Promo (5 hari)"]);
        }

    }, [values.selectedItems]);


    const handleSubmitForm = () => {
        navigate("/order-summary");
    };

    const renderHeaderFormOrder = () => {
        return (
            <div style={{ zIndex: 1 }}>
                <div
                    className=""
                    style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "26px",
                        marginTop: "0px",
                        color: "black",
                    }}
                >
                    Form Order{" "}
                    <span style={{ color: "#3787F7", fontSize: "26px" }}>
                        Katsikat
                    </span>
                </div>
            </div>
        )
    }

    const renderInputNameAddressPoint = () => {
        return (
            <>
                {/* Input Name */}
                <div className="input">
                    <input
                        type="text"
                        name="name"
                        placeholder="Masukan nama anda!"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                            {errors.name}
                        </div>
                    )}
                </div>

                {/* Input Address */}
                <div className="input">
                    <input
                        type="text"
                        name="address"
                        placeholder="Masukan alamat anda!"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.address && errors.address && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                            {errors.address}
                        </div>
                    )}
                </div>

                {/* Input Pickup Point */}
                <div className="input">
                    <input
                        type="text"
                        name="pickupPoint"
                        placeholder="Masukan patokan titik jemput!"
                        value={values.pickupPoint}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>

                {/* Text patokan */}
                <div
                    className="text"
                    style={{
                        textAlign: "center",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "14px",
                        color: "#3787F7",
                        maxWidth: "350px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                    }}
                >
                    Masukan nomor rumah/warna rumah/patokan lainnya untuk memudahkan kurir menemukan lokasi!
                </div>
            </>
        )
    }


    const renderLocation = () => {

        const handleAreaChange = (e) => {
            const area = e.target.value;
            setFieldValue('selectedArea', area);
            setFieldValue('selectedDistrict', ''); // Reset district when area changes
        };

        const handleDistrictChange = (e) => {
            setFieldValue('selectedDistrict', e.target.value);
        };

        const handleGetLocationClick = () => {
            setModals({
                ...modals,
                showLocationConfirmPopup: true
            });
        };

        return (
            <>
                {showLocationConfirmPopup && (
                    <ModalLocationConfirm />
                )}

                {/* RADIO KABUPATEN/KOTA */}
                <div className="input-group">
                    <div
                        className="radio-group"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                            padding: "0 25px",
                            maxWidth: "450px",
                            margin: "0 auto",
                        }}
                    >
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "8px 15px",
                                border: "1px solid #ddd",
                                borderRadius: "25px",
                                cursor: "pointer",
                                backgroundColor: values.selectedArea === "kota" ? "#3787F7" : "#fff",
                                color: values.selectedArea === "kota" ? "#fff" : "#000",
                                fontFamily: "Montserrat, sans-serif",
                                flex: 1,
                                textAlign: "center",
                                fontSize: "14px",
                            }}
                        >
                            <input
                                type="radio"
                                name="selectedArea"
                                value="kota"
                                checked={values.selectedArea === "kota"}
                                onChange={handleAreaChange}
                                style={{ display: "none" }}
                                onBlur={handleBlur}
                            />
                            Kota Malang
                        </label>
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "8px 15px",
                                border: "1px solid #ddd",
                                borderRadius: "25px",
                                cursor: "pointer",
                                backgroundColor: values.selectedArea === "kabupaten" ? "#3787F7" : "#fff",
                                color: values.selectedArea === "kabupaten" ? "#fff" : "#000",
                                fontFamily: "Montserrat, sans-serif",
                                flex: 1,
                                textAlign: "center",
                                fontSize: "14px",
                            }}
                        >
                            <input
                                type="radio"
                                name="selectedArea"
                                value="kabupaten"
                                checked={values.selectedArea === "kabupaten"}
                                onChange={handleAreaChange}
                                style={{ display: "none" }}
                                onBlur={handleBlur}
                            />
                            Kabupaten Malang
                        </label>
                    </div>

                    <div>
                        <select
                            name="selectedDistrict"
                            value={values.selectedDistrict}
                            onChange={handleDistrictChange}
                            className="input"
                            required
                            onBlur={handleBlur}
                            style={{
                                maxWidth: "450px",
                                width: "100%",
                                marginTop: "30px",
                                fontFamily: "Montserrat, sans-serif",
                                paddingLeft: "20px",
                                textIndent: "20px",
                                color: "#545454",
                                appearance: "none",
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 20px center",
                                backgroundSize: "1em",
                            }}
                        >
                            <option value="" disabled>
                                Pilih Kecamatan
                            </option>
                            {values.selectedArea === "kota"
                                ? KOTA_MALANG.districts.map((district) => (
                                    <option
                                        key={district}
                                        value={district}
                                        style={{ fontFamily: "Montserrat, sans-serif" }}
                                    >
                                        {district}
                                    </option>
                                ))
                                : KABUPATEN_MALANG.districts.map((district) => (
                                    <option
                                        key={district}
                                        value={district}
                                        style={{ fontFamily: "Montserrat, sans-serif" }}
                                    >
                                        {district}
                                    </option>
                                ))}
                        </select>
                        {touched.selectedDistrict && errors.selectedDistrict && (
                            <div
                                style={{
                                    color: "red",
                                    fontSize: "12px",
                                    marginTop: "2px",
                                    marginLeft: "20px",
                                }}
                            >
                                {errors.selectedDistrict}
                            </div>
                        )}
                    </div>
                </div>

                {/* Button Bagikan Lokasi */}
                <LazyMotion features={domAnimation}>
                    <m.button
                        type="button"
                        className="daftar"
                        onClick={handleGetLocationClick}
                        style={{ marginBottom: "0px", backgroundColor: "#3787F7" }}
                        transition={{ stiffness: 1000, damping: 5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Bagikan Lokasi Penjemputan
                    </m.button>
                </LazyMotion>

                {/* Text Gratis Ongkir */}
                <div
                    className="text"
                    style={{
                        textAlign: "center",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "14px",
                        marginBottom: "20px",
                        color: "#545454",
                        maxWidth: "350px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                    }}
                >
                    Gratis Ongkir hanya berlaku untuk radius 7km dari lokasi Outlet Katsikat!
                </div>
            </>
        );
    };


    const renderItems = () => {

        const handleItemCountChange = (e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) { // Hanya menerima angka
                setFieldValue('itemCount', value);
            }
        };

        const handleItemCheckbox = (itemName) => {
            console.log("itemName", itemName);
            if (itemName === "PROMO 2 SEPATU" && values.selectedItems.includes("PROMO 2 SEPATU")) {
                setFieldValue('selectedEstimation', []);
            }
            const currentItems = values.selectedItems || [];
            const newItems = currentItems.includes(itemName)
                ? currentItems.filter(item => item !== itemName)
                : [...currentItems, itemName];

            setFieldValue('selectedItems', newItems);
        };

        return (
            <>
                {/* Input Jumlah Item */}
                <div className="input">
                    <input
                        type="number"
                        name="itemCount"
                        placeholder="Masukan jumlah item!"
                        value={values.itemCount}
                        onChange={handleItemCountChange}
                        min="1"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        onBlur={handleBlur}
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                    {touched.itemCount && errors.itemCount && (
                        <div style={{ color: "red", fontSize: "12px" }}>
                            {errors.itemCount}
                        </div>
                    )}
                </div>

                {/* Text Item */}
                <div
                    className="text"
                    style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "15px",
                        marginTop: "25px",
                        color: "black",
                        paddingLeft: "20px",
                    }}
                >
                    Item apa yang akan dimasukan?
                </div>

                <div
                    className="checkboxes"
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        maxWidth: "400px",
                        padding: "10px",
                        paddingLeft: "20px",
                    }}
                >
                    {Object.keys(LATEST_ITEMS_STRUCTURE).map((itemName) => (
                        <label
                            key={itemName}
                            style={{
                                color: "black",
                                fontFamily: "Montserrat, sans-serif",
                                marginBottom: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <input
                                type="checkbox"
                                name="selectedItems"
                                checked={values.selectedItems?.includes(itemName)}
                                onChange={() => handleItemCheckbox(itemName)}
                                style={{ marginRight: "5px" }}
                                onBlur={handleBlur}
                            />
                            {itemName}
                        </label>
                    ))}
                </div>
                {touched.selectedItems && errors.selectedItems && (
                    <div
                        style={{ color: "red", fontSize: "12px", paddingLeft: "20px" }}
                    >
                        {errors.selectedItems}
                    </div>
                )}
            </>
        );
    };


    const renderPaketProduct = () => {
        return (
            <div>
                {modals.paket && (
                    <ModalPaket />
                )}
                {/* Paket Product */}
                <div className="katalog" style={{ marginTop: "0px", position: "relative" }}>
                    <div className="product-image" style={{ marginRight: "10px" }}>
                        <img
                            src={PaketTambahan}
                            alt="Paket Tambahan"
                            loading="lazy"
                            width="80"
                            height="80"
                            style={{ borderRadius: "10px" }}
                        />
                    </div>
                    <div className="product-info" style={{ flexGrow: 1 }}>
                        <div className="product-name" style={{
                            fontWeight: "bold",
                            color: "black",
                            fontFamily: "Montserrat, sans-serif",
                        }}>
                            Treatment Tambahan
                        </div>
                        <div className="product-description" style={{ color: "black", fontFamily: "Montserrat, sans-serif" }}>
                            Start Rp5.000
                        </div>
                    </div>
                    <div className="order-button" style={{ position: "relative" }}>
                        <LazyMotion features={domAnimation}>
                            <m.button
                                onClick={() => setModals({ ...modals, paket: true })}
                                className="order-button"
                                whileTap={{ scale: 0.9 }}
                                transition={{ stiffness: 1000, damping: 5 }}
                                style={{
                                    backgroundColor: "#3787F7",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "8px",
                                    cursor: "pointer",
                                    fontFamily: "Montserrat, sans-serif",
                                    fontSize: "14px",
                                }}
                            >
                                Lihat
                            </m.button>
                        </LazyMotion>
                    </div>
                </div>

            </div>
        )
    }

    const renderTreatment = () => {

        const handleTreatmentCheckbox = (treatmentName) => {
            const currentTreatments = values.selectedTreatments || [];
            const newTreatments = currentTreatments.includes(treatmentName)
                ? currentTreatments.filter(treatment => treatment !== treatmentName)
                : [...currentTreatments, treatmentName];

            setFieldValue('selectedTreatments', newTreatments);
        };

        const handleEstimationChange = (estimationType) => {
            if (values.selectedItems.length === 1 && values.selectedItems.includes("PROMO 2 SEPATU")) {
                setFieldValue('selectedEstimation', ["Estimasi Promo (5 hari)"]);
                return;
            }
            const currentEstimations = values.selectedEstimation || [];
            const newEstimations = currentEstimations.includes(estimationType)
                ? currentEstimations.filter(estimation => estimation !== estimationType)
                : [...currentEstimations, estimationType];

            setFieldValue('selectedEstimation', newEstimations);
        };


        return (
            <>
                {/* Text Treatment */}

                <div
                    className="text"
                    style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "15px",
                        marginTop: "25px",
                        color: "black",
                        paddingLeft: "20px",
                    }}
                >
                    Jenis Treatment apa yang akan dipilih?
                </div>

                {/* Checkbox Treatment */}
                <div
                    className="checkboxes"
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        maxWidth: "400px",
                        padding: "10px",
                        paddingLeft: "20px",
                    }}
                >
                    {Object.keys(LATEST_TREATMENTS_STRUCTURE).map((treatmentName) => (
                        <label
                            key={treatmentName}
                            style={{
                                color: "black",
                                fontFamily: "Montserrat, sans-serif",
                                marginBottom: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <input
                                name="selectedTreatments"
                                type="checkbox"
                                checked={values.selectedTreatments?.includes(treatmentName)}
                                onChange={() => handleTreatmentCheckbox(treatmentName)}
                                style={{ marginRight: "5px" }}
                                onBlur={handleBlur}
                            />
                            {treatmentName === "UnYellowing"
                                ? "Un-Yellowing (Midsole Only)"
                                : treatmentName}
                        </label>
                    ))}
                </div>
                {touched.selectedTreatments && errors.selectedTreatments && (
                    <div
                        style={{ color: "red", fontSize: "12px", paddingLeft: "20px" }}
                    >
                        {errors.selectedTreatments}
                    </div>
                )}

                <div
                    className="text"
                    style={{
                        textAlign: "left",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "14px",
                        color: "#545454",
                        maxWidth: "350px",
                        paddingLeft: "20px",
                    }}
                >
                    <span style={{ color: "#3787F7" }}>
                        Pilih Treatment DeepClean, jika item yang kamu masukan
                        adalah Topi/Helm/Tas/Stroller
                    </span>
                </div>

                {/* {renderPaketProduct()} */}

                {/* Text Estimasi Pengerjaan */}
                <div
                    className="text"
                    style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "15px",
                        marginTop: "25px",
                        color: "black",
                        paddingLeft: "20px",
                    }}
                >
                    Estimasi Pengerjaan
                </div>
                {/* Estimasi Section */}
                <div
                    className="checkboxes"
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        maxWidth: "400px",
                        padding: "10px",
                        paddingLeft: "20px",
                    }}
                >
                    {Object.keys(LATEST_ESTIMATIONS_STRUCTURE).map((estimationType) => {
                        const restrictedItems = ["Koper", "Stroller", "Helm"];
                        const hasOnlyRestrictedItems = values.selectedItems?.length > 0 &&
                            values.selectedItems.every(item => restrictedItems.includes(item));

                        const isDisabled = estimationType === "Same Day (8 jam)" && hasOnlyRestrictedItems;

                        return (
                            <label
                                key={estimationType}
                                style={{
                                    color: isDisabled ? "#999" : "black",
                                    fontFamily: "Montserrat, sans-serif",
                                    marginBottom: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    opacity: isDisabled ? 0.5 : 1,
                                    cursor: isDisabled ? "not-allowed" : "pointer",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    name="selectedEstimation"
                                    checked={values.selectedEstimation.includes(estimationType)}
                                    onChange={() => handleEstimationChange(estimationType)}
                                    style={{ marginRight: "5px" }}
                                    disabled={isDisabled}
                                    onBlur={handleBlur}
                                />
                                {estimationType}
                            </label>
                        );
                    })}
                </div>
                {touched.selectedEstimation && errors.selectedEstimation && (
                    <div style={{ color: "red", fontSize: "12px", paddingLeft: "20px" }}>
                        {errors.selectedEstimation}
                    </div>
                )}
            </>
        );
    };

    const renderAroma = () => {
        const handleAromaCheckbox = (aromaName) => {
            const currentAromas = values.selectedAromas || [];
            const newAromas = currentAromas.includes(aromaName)
                ? currentAromas.filter(aroma => aroma !== aromaName)
                : [...currentAromas, aromaName];

            setFieldValue('selectedAromas', newAromas);
        };

        return (
            <>


                {/* Text Aroma */}
                <div
                    className="text"
                    style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "15px",
                        marginTop: "25px",
                        color: "black",
                        paddingLeft: "20px",
                    }}
                >
                    Aroma Parfum (GRATIS)
                </div>

                {/* Checkbox Aroma */}
                <div
                    className="checkboxes"
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        maxWidth: "400px",
                        padding: "10px",
                        paddingLeft: "20px",
                    }}
                >
                    {Object.keys(LATEST_AROMAS_STRUCTURE).map((aromaName) => (
                        <label
                            key={aromaName}
                            style={{
                                color: "black",
                                fontFamily: "Montserrat, sans-serif",
                                marginBottom: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <input
                                name="selectedAromas"
                                type="checkbox"
                                checked={values.selectedAromas?.includes(aromaName)}
                                onChange={() => handleAromaCheckbox(aromaName)}
                                style={{ marginRight: "5px" }}
                                onBlur={handleBlur}
                            />
                            {aromaName}
                        </label>
                    ))}
                </div>
                {touched.selectedAromas && errors.selectedAromas && (
                    <div style={{ color: "red", fontSize: "12px", paddingLeft: "20px" }}>
                        {errors.selectedAromas}
                    </div>
                )}

                {/* Text Pilihan Favorit */}
                <div
                    className="text"
                    style={{
                        textAlign: "left",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "14px",
                        color: "#545454",
                        maxWidth: "350px",
                        paddingLeft: "20px",
                    }}
                >
                    <span style={{ color: "#3787F7" }}>
                        Pilihan Favorit Pelanggan: BlackCoffee, BubbleGum, Lavender
                    </span>
                </div>
            </>
        );
    };

    const renderPickupTime = () => {
        const handleDateChange = (date) => {
            setFieldValue('pickupDate', date);
        };

        const handleTimeChange = (e) => {
            const selectedTime = e.target.value;
            // Validasi waktu antara 09:00 - 19:00
            const timeValue = selectedTime.split(':');
            const hour = parseInt(timeValue[0]);

            if (hour >= 9 && hour < 19) {
                setFieldValue('pickupTime', selectedTime);
            } else {
                alert('Jam Pick-Up hanya berlaku mulai jam 13.00 sampai 19.00!');
            }
        };

        return (
            <>
                {/* Text Request Tanggal Pick-Up */}
                <ModalPickupTime />
                <div
                    className="text"
                    style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "15px",
                        marginTop: "25px",
                        color: "black",
                        paddingLeft: "20px",
                    }}
                >
                    Request Tanggal Pick-Up
                </div>

                {/* Text Khusus hari Minggu */}
                <div
                    className="text"
                    style={{
                        textAlign: "left",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "12px",
                        color: "#545454",
                        maxWidth: "350px",
                        paddingLeft: "20px",
                    }}
                >
                    Khusus hari Minggu, Outlet hanya akan buka sampai jam 17.00!
                </div>

                {/* Input Tanggal Pick-Up */}
                <div>
                    <DatePicker
                        name="pickupDate"
                        className="input"
                        style={{
                            maxWidth: "290px",
                            height: "40px",
                            borderRadius: "10px",
                            marginTop: "10px",
                        }}
                        onChange={handleDateChange}
                        value={values.pickupDate ? dayjs(values.pickupDate) : null}
                        readOnly
                        inputReadOnly={true}
                        editable={false}
                        placeholder="Pilih tanggal pick-up"
                        onBlur={handleBlur}
                    />
                    {touched.pickupDate && errors.pickupDate && (
                        <div
                            style={{
                                color: "red",
                                fontSize: "12px",
                                paddingLeft: "20px",
                                marginTop: "10px",
                            }}
                        >
                            {errors.pickupDate}
                        </div>
                    )}
                </div>

                {/* Text Request Jam Pick-Up */}
                <div
                    className="text"
                    style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "15px",
                        marginTop: "25px",
                        color: "black",
                        paddingLeft: "20px",
                    }}
                >
                    Request Jam Pick-Up
                </div>

                {/* Text Jam Pick-Up */}
                <div
                    className="text"
                    style={{
                        textAlign: "left",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "12px",
                        color: "#545454",
                        maxWidth: "350px",
                        paddingLeft: "20px",
                    }}
                >
                    Jam Pick-Up hanya berlaku mulai jam 13.00 sampai 19.00!
                </div>

                {/* Input Jam Pick-Up */}
                <div style={{ padding: "0 20px" }}>
                    <form className="w-[290px] mx-auto">
                        <div className="flex">
                            <input
                                name="pickupTime"
                                type="time"
                                id="time"
                                className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                min="09:00"
                                max="18:00"
                                value={values.pickupTime}
                                onChange={handleTimeChange}
                                onBlur={handleBlur}
                                style={{
                                    padding: "10px",
                                    height: "40px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "10px",
                                }}
                            />

                            <span className="mt-[10px] inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </div>
                    </form>
                </div>
            </>
        );
    };

    const renderKnowKatsikat = () => {

        const handleSelectChange = (e) => {
            setFieldValue('knowFrom', e.target.value);
        };

        const handleMessageChange = (e) => {
            setFieldValue('specialMessage', e.target.value);
        };

        return (
            <>
                {/* Text Dari mana kamu tahu Katsikat? */}
                <div
                    className="text"
                    style={{
                        textAlign: "left",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "15px",
                        marginTop: "25px",
                        color: "black",
                        paddingLeft: "20px",
                    }}
                >
                    Dari mana kamu tahu Katsikat?
                </div>

                <div style={{ paddingBottom: "20px" }}>
                    <select
                        name="knowFrom"
                        value={values.knowFrom}
                        onChange={handleSelectChange}
                        className="input"
                        onBlur={handleBlur}
                        style={{
                            marginTop: "10px",
                            fontFamily: "Montserrat, sans-serif",
                            paddingLeft: "20px",
                            textIndent: "20px",
                            color: "#545454",
                            appearance: "none",
                            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 20px center",
                            backgroundSize: "1em",
                        }}
                    >
                        <option value="" disabled>
                            Pilih sumber informasi
                        </option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Google">Google</option>
                        <option value="Tiktok">Tiktok</option>
                        <option value="Teman">Teman</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                </div>

                <div>
                    <textarea
                        className="inputPesan"
                        name="specialMessage"
                        placeholder="Sampaikan pesan khusus!"
                        rows={3}
                        value={values.specialMessage}
                        onChange={handleMessageChange}
                    />
                </div>

                <div
                    className="text"
                    style={{
                        textAlign: "center",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "14px",
                        marginTop: "25px",
                        color: "#545454",
                        maxWidth: "350px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        marginBottom: "30px",
                    }}
                >
                    Sampaikan pesan atau permintaan khusus kepada kami! Setelah
                    pesan diterima, akan kami pertimbangkan dan respon pesan Anda.
                </div>
            </>
        );
    };


    const renderButtonLanjutkan = () => {

        const handleNextStep = async (e) => {
            if (e) e.preventDefault();
            // Validasi form terlebih dahulu
            const errors = await formik.validateForm();
            formik.setTouched({
                name: true,
                address: true,
                selectedDistrict: true,
                selectedArea: true,
                pickupPoint: true,
                itemCount: true,
                selectedItems: true,
                selectedTreatments: true,
                selectedEstimation: true,
                selectedAromas: true,
                pickupDate: true,
            });

            // Cek jika ada error
            if (Object.keys(errors).length > 0) {
                // Tampilkan pesan error
                const errorMessages = [];
                if (errors.name) errorMessages.push("Nama harus diisi");
                if (errors.address) errorMessages.push("Alamat harus diisi");
                if (errors.selectedDistrict) errorMessages.push("Kecamatan harus dipilih");
                if (errors.selectedArea) errorMessages.push("Area harus dipilih");
                if (errors.pickupPoint) errorMessages.push("Patokan harus diisi");
                if (errors.itemCount) errorMessages.push("Jumlah item harus diisi");
                if (errors.selectedItems) errorMessages.push("Pilih minimal satu item");
                if (errors.selectedTreatments) errorMessages.push("Pilih minimal satu treatment");
                if (errors.selectedEstimation) errorMessages.push("Estimasi pengerjaan harus dipilih");
                if (errors.selectedAromas) errorMessages.push("Pilih minimal satu aroma");
                if (errors.pickupDate) errorMessages.push("Tanggal pickup harus dipilih");

                alert("Mohon lengkapi form:\n" + errorMessages.join("\n"));
                return;
            }

            // Buat fungsi untuk menghapus duplikat dari array
            const removeDuplicates = (array) => {
                if (!array) return [];
                return [...new Set(array)];
            };

            // Update values dengan menghapus duplikat
            const updatedValues = {
                ...values,
                selectedItems: removeDuplicates(values.selectedItems),
                selectedTreatments: removeDuplicates(values.selectedTreatments),
                selectedAromas: removeDuplicates(values.selectedAromas),
                selectedEstimation: removeDuplicates(values.selectedEstimation)
            };

            // Log untuk debugging
            console.log("Original values:", values);
            console.log("Updated values:", updatedValues);

            // Update formik values dengan data yang sudah bersih
            setFieldValue('selectedItems', updatedValues.selectedItems);
            setFieldValue('selectedTreatments', updatedValues.selectedTreatments);
            setFieldValue('selectedAromas', updatedValues.selectedAromas);
            setFieldValue('selectedEstimation', updatedValues.selectedEstimation);

            navigate("/order-summary");
        };

        return (
            <>
                <LazyMotion features={domAnimation}>
                    <m.button
                        onClick={handleNextStep}
                        className="daftar"
                        style={{
                            backgroundColor: "#3787F7",
                            opacity: isSubmitting ? 0.7 : 1,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                        transition={{ stiffness: 1000, damping: 5 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Memproses...' : 'Lanjutkan'}
                    </m.button>
                </LazyMotion>
            </>
        );
    };


    return (
        <div className="w-full flex justify-center items-center">
            <div className="container w-full flex justify-center">
                <div className="flex flex-col" style={{ flexDirection: "column" }}>

                    {renderHeaderFormOrder()}

                    <form
                        onSubmit={() => console.log("submit")}
                        className="form"
                        style={{ marginTop: "0px" }}
                    >
                        <div className="inputs" style={{ marginTop: "30px" }}>

                            {renderInputNameAddressPoint()}

                            {renderLocation()}

                        </div>

                        {renderItems()}

                        {renderTreatment()}

                        {renderAroma()}

                        {renderPickupTime()}

                        {renderKnowKatsikat()}

                        {renderButtonLanjutkan()}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
