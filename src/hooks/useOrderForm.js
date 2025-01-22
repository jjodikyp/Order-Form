import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .required('[X]'),
    address: Yup.string()
        .trim()
        .required('[X]'),
    pickupPoint: Yup.string(),
    itemCount: Yup.string()
        .required('[X]'),
    selectedItems: Yup.array()
        .min(1, 'Pilih minimal satu item!')
        .required('Pilih minimal satu item!'),
    selectedTreatments: Yup.array()
        .min(1, 'Pilih minimal satu item!')
        .required('Pilih minimal satu item!'),
    selectedAromas: Yup.array()
        .min(1, 'Pilih minimal satu aroma!')
        .required('Pilih minimal satu aroma!'),
    pickupDate: Yup.date()
        .nullable()
        .required('Tanggal pick-up harus dipilih!'),
    pickupTime: Yup.string()
        .nullable()
        .required('Jam pick-up harus dipilih!'),
    specialMessage: Yup.string(),
    locationLink: Yup.string(),
    selectedArea: Yup.string()
        .required('Pilih area'),
    selectedDistrict: Yup.string()
        .required('Pilih kecamatan'),
    knowFrom: Yup.string(),
    selectedEstimation: Yup.array(),    
    availableEstimations: Yup.array(),
    cartParfum: Yup.array(),
    cartShoelace: Yup.array(),
    cartPaket: Yup.array()
});

export const useOrderForm = () => {

    // State untuk modal
    const [modals, setModals] = useState({
        pickupTime: false,
        timePicker: false,
        locationConfirm: false,
        showPickupTimePopup: false,
        showTimePickerPopup: false,
        showLocationConfirmPopup: false,

        // Product + Order Summary
        parfum: false,
        shoelace: false,
        paket: false,
        confirmation: false,
        cart: false,
        fullMessage: false
    });

    const initialValues = {
        name: '',
        address: '',
        pickupPoint: '',
        itemCount: '',
        selectedItems: [],
        selectedTreatments: [],
        selectedAromas: [],

        pickupDate: null,
        pickupTime: '',
        specialMessage: '',
        locationLink: '',
        selectedArea: 'kota',
        selectedDistrict: '',
        knowFrom: '',
        isEstimationLocked: false,
        selectedEstimation: [],
        availableEstimations: [],

        // Product + Order Summary
        cart: [],
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            // Handle form submission
            console.log('Form submitted:', values);
        }
    });

    return {
        formik,
        modals,
        setModals,
        initialValues
    };
}; 