import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const useOrderSummary = () => {
  const navigate = useNavigate();
  
  // State untuk cart
  const [cart, setCart] = useState([]);

  // State untuk modals
  const [modals, setModals] = useState({
    parfum: false,
    shoelace: false,
    paket: false,
    confirmation: false,
    cart: false,
    fullMessage: false
  });

  // Refs
  const refs = {
    popup: useRef(null),
    shoelace: useRef(null),
    paket: useRef(null),
    cart: useRef(null)
  };

  // Formik untuk form produk
  const productFormik = useFormik({
    initialValues: {
      selectedVariant: '',
      selectedShoelaceColor: '',
      customColor: '',
      quantity: 1,
      shoelaceQuantity: 1,
      selectedPaket: '',
      paketQuantity: 1
    },
    validationSchema: Yup.object({
      selectedVariant: Yup.string(),
      selectedShoelaceColor: Yup.string(),
      customColor: Yup.string(),
      quantity: Yup.number().min(1),
      shoelaceQuantity: Yup.number().min(1),
      selectedPaket: Yup.string(),
      paketQuantity: Yup.number().min(1)
    }),
    onSubmit: () => {}
  });

  // Toggle modal handler
  const toggleModal = (modalName, value) => {
    setModals(prev => ({
      ...prev,
      [modalName]: value ?? !prev[modalName]
    }));
  };

  // Cart handlers
  const handleAddToCart = (type) => {
    const { values, setFieldValue } = productFormik;

    let newItem;
    switch(type) {
      case 'parfum':
        if (!values.selectedVariant) {
          alert("Silakan pilih varian parfum");
          return;
        }
        newItem = {
          type: "parfum",
          variant: values.selectedVariant,
          quantity: values.quantity,
          price: 30000
        };
        break;

      case 'tali':
        if (!values.selectedShoelaceColor) {
          alert("Silakan pilih warna tali sepatu");
          return;
        }
        newItem = {
          type: "tali",
          variant: values.selectedShoelaceColor === "Warna Lainnya" 
            ? values.customColor 
            : values.selectedShoelaceColor,
          quantity: values.shoelaceQuantity,
          price: 25000
        };
        break;

      case 'paket':
        if (!values.selectedPaket) {
          alert("Silakan pilih paket tambahan");
          return;
        }
        const selectedPaketData = PAKET_VARIANTS.find(p => p.name === values.selectedPaket);
        newItem = {
          type: "paket",
          variant: values.selectedPaket,
          quantity: values.paketQuantity,
          price: selectedPaketData.price
        };
        break;
    }

    setCart([...cart, newItem]);
    toggleModal(type, false);
    
    // Reset form values
    setFieldValue('selectedVariant', '');
    setFieldValue('selectedShoelaceColor', '');
    setFieldValue('customColor', '');
    setFieldValue('quantity', 1);
    setFieldValue('shoelaceQuantity', 1);
    setFieldValue('selectedPaket', '');
    setFieldValue('paketQuantity', 1);
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
  };

  // Order confirmation handler
  const handleConfirmOrder = () => {
    try {
      const formData = JSON.parse(localStorage.getItem('form'));
      if (!formData) throw new Error('Form data tidak ditemukan');

      const cartDetails = formatCartDetails(cart);
      const message = formatWhatsAppMessage(formData, cartDetails);
      
      sendToWhatsApp(message);
      clearLocalStorage();
      navigate('/');
    } catch (error) {
      console.error('Error in handleConfirmOrder:', error);
      alert('Terjadi kesalahan saat mengirim pesanan. Silakan coba lagi.');
    }
  };


  return {
    cart,
    modals,
    refs,
    productFormik,
    toggleModal,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleConfirmOrder,
    calculateTotal,
    scrollToBottom
  };
}; 