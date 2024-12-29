import React, { useState, useEffect, useRef } from "react";
import "./member.css";
import { LazyMotion, m, domAnimation } from "framer-motion";
import TaliSepatu from "../../assets/images/talisepatu.png";
import PaketTambahan from "../../assets/images/tambahan.jpg";
import Parfum from "../../assets/images/parfum.png";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FaShoppingCart } from 'react-icons/fa';

const FREE_DELIVERY_THRESHOLD = 7.0;
const BASE_DISTANCE = 8.0;
const BASE_PRICE = 2000;
const PRICE_PER_KM = 2000;

const KOTA_MALANG = {
  districts: [
    "Blimbing",
    "Kedungkandang", 
    "Klojen",
    "Lowokwaru",
    "Sukun"
  ]
};

const KABUPATEN_MALANG = {
  districts: [
    "Ampelgading",
    "Bantur",
    "Bululawang",
    "Dampit",
    "Dau",
    "Donomulyo",
    "Gedangan",
    "Gondanglegi",
    "Jabung",
    "Kalipare",
    "Karangploso",
    "Kasembon",
    "Kepanjen",
    "Kromengan",
    "Lawang",
    "Ngajum",
    "Ngantang",
    "Pagak",
    "Pagelaran",
    "Pakis",
    "Pakisaji",
    "Poncokusumo",
    "Pujon",
    "Singosari",
    "Sumbermanjing Wetan",
    "Sumberpucung",
    "Tajinan",
    "Tirtoyudo",
    "Tumpang",
    "Turen",
    "Wagir",
    "Wajak",
    "Wonosari"
  ]
};

function FirstPage() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showShoelacePopup, setShowShoelacePopup] = useState(false);
  const [showPaketPopup, setShowPaketPopup] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedShoelaceColor, setSelectedShoelaceColor] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [shoelaceQuantity, setShoelaceQuantity] = useState(1);
  const [selectedPaket, setSelectedPaket] = useState("");
  const [paketQuantity, setPaketQuantity] = useState(1);
  const popupRef = useRef(null);
  const shoelacePopupRef = useRef(null);
  const paketPopupRef = useRef(null);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const cartPopupRef = useRef(null);

  const variants = [
    {name: "Apple", isSoldOut: true},
    {name: "Vanilla", isSoldOut: true},
    "BubbleGum",
    {name: "Grape", isSoldOut: true}, 
    {name: "BlackCoffee", isBestSeller: true},
    {name: "Lavender", isBestSeller: true},
    {name: "Coklat", isSoldOut: true}
  ];

  const shoelaceColors = [
    "Sesuaikan dengan warna saat ini",
    "Warna Lainnya"
  ];

  const paketVariants = [
    { name: "Suede Care", price: 20000 },
    { name: "Penghilang Bau", price: 15000 },
    { name: "Tambahan Pengharum", price: 5000 },
    { name: "Penghilang Noda", price: 15000 },
    { name: "Leather Care", price: 20000 },
    { name: "Penghilang Jamur", price: 15000 }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
      if (shoelacePopupRef.current && !shoelacePopupRef.current.contains(event.target)) {
        setShowShoelacePopup(false);
      }
      if (paketPopupRef.current && !paketPopupRef.current.contains(event.target)) {
        setShowPaketPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showConfirmationPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showConfirmationPopup]);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("Silakan pilih varian parfum");
      return;
    }

    const newItem = {
      type: "parfum",
      variant: selectedVariant,
      quantity: quantity,
      price: 30000
    };

    setCart([...cart, newItem]);
    setShowPopup(false);
    setSelectedVariant("");
    setQuantity(1);
  };

  const handleAddShoelaceToCart = () => {
    if (!selectedShoelaceColor) {
      alert("Silakan pilih warna tali sepatu");
      return;
    }

    const color = selectedShoelaceColor === "Warna Lainnya" ? customColor : selectedShoelaceColor;

    const newItem = {
      type: "tali",
      variant: color,
      quantity: shoelaceQuantity,
      price: 25000
    };

    setCart([...cart, newItem]);
    setShowShoelacePopup(false);
    setSelectedShoelaceColor("");
    setCustomColor("");
    setShoelaceQuantity(1);
  };

  const handleAddPaketToCart = () => {
    if (!selectedPaket) {
      alert("Silakan pilih paket tambahan");
      return;
    }

    const selectedPaketData = paketVariants.find(p => p.name === selectedPaket);

    const newItem = {
      type: "paket",
      variant: selectedPaket,
      quantity: paketQuantity,
      price: selectedPaketData.price
    };

    setCart([...cart, newItem]);
    setShowPaketPopup(false);
    setSelectedPaket("");
    setPaketQuantity(1);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handlePesanClick = () => {
    setShowPopup(true);
    setSelectedVariant("");
  };

  const handleShoelacePesanClick = () => {
    setShowShoelacePopup(true);
    setSelectedShoelaceColor("");
    setCustomColor("");
  };

  const handlePaketPesanClick = () => {
    setShowPaketPopup(true);
    setSelectedPaket("");
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const truncateMessage = (message, wordCount = 5) => {
    if (!message) return "";
    const words = message.split(" ");
    if (words.length <= wordCount) return message;
    return words.slice(0, wordCount).join(" ") + "...";
  };

  const scrollToBottom = () => {
    if (popupRef.current) {
      popupRef.current.scrollTo({
        top: popupRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleKirimPesanan = () => {
    setShowConfirmationPopup(true);
    setTimeout(scrollToBottom, 100);
  };

  const handleConfirmOrder = () => {
    const formData = JSON.parse(localStorage.getItem('form'));
    
    let cartDetails = "Saya tidak membeli produk tambahan";
    if (cart.length > 0) {
      cartDetails = cart.map(item => 
        `${item.quantity}x ${item.type === 'parfum' ? 'Parfum' : item.type === 'tali' ? 'Tali Sepatu' : 'Paket Tambahan'} ${item.variant} (Rp${item.price * item.quantity})`
      ).join("\n");
      cartDetails += `\n*Total:* Rp${calculateTotal()}`;
    }

    const areaType = formData.selectedArea === 'kota' ? 'Kota' : 'Kabupaten';
    const fullAddress = `${formData.address}, Kec. ${formData.selectedDistrict}, ${areaType} Malang`;

    let message = `Ini Form Order saya yaa!

*Nama:* ${formData.name}
*Alamat:* ${fullAddress}
*Patokan:* ${formData.pickupPoint || "-"}
*Link Lokasi:* ${formData.locationLink || "-"}

*Jumlah Item:* ${formData.itemCount || "-"}
*Item Yang Dipilih:* ${formData.selectedItems?.join(", ") || "-"}
*Treatment Yang Dipilih:* ${formData.selectedTreatments?.join(", ") || "-"}
*Estimasi Pengerjaan:* ${formData.selectedEstimation || "-"}
*Aroma Yang Dipilih:* ${formData.selectedAromas?.join(", ") || "-"}

*Pick-up:* ${new Date(formData.pickupDate).toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
*Waktu Pick-up:* ${formData.pickupTime ? dayjs(`2024-12-19T${formData.pickupTime}`).format("HH:mm") : "Belum dipilih"}`;

    if (formData.knowFrom) {
      message += `\n\n*Saya tahu Katsikat dari:* ${formData.knowFrom}`;
    }

    if (formData.specialMessage) {
      message += `\n*Pesan Khusus*: ${formData.specialMessage}`;
    }

    message += `\n\n*Detail Pembelian Produk:*\n${cartDetails}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6287795452475?text=${encodedMessage}`);
    setShowConfirmationPopup(false);
  };

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowConfirmationPopup(false);
      setShowFullMessage(false);
    }
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
  };

  const handleCartClickOutside = (e) => {
    if (cartPopupRef.current && !cartPopupRef.current.contains(e.target)) {
      setShowCartPopup(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className={`container w-full flex justify-center ${showPopup || showShoelacePopup || showPaketPopup || showCartPopup ? "blur-background" : ""}`}>
        <div className="flex flex-col items-center">
          <div style={{ zIndex: 1 }}>
            <div className="" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center", 
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "26px",
              marginTop: "0px",
              color: "black",
            }}>
              Pembelian&nbsp;
              <span style={{ color: "#3787F7", fontSize: "26px" }}>Produk</span>
            </div>
          </div>

          {/* Parfum Product */}
          <div className="katalog" style={{ marginTop: "20px", position: "relative" }}>
            <div className="product-image" style={{ marginRight: "10px" }}>
              <img 
                src={Parfum} 
                alt="Produk" 
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
                Shoes Parfume
              </div>
              <div className="product-description" style={{ color: "black", fontFamily: "Montserrat, sans-serif" }}>
                Rp30.000 - 60ml
              </div>
            </div>
            <div className="order-button" style={{ position: "relative" }}>
              <LazyMotion features={domAnimation}>
                <m.button
                  onClick={handlePesanClick}
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

          {/* Shoelace Product */}
          <div className="katalog" style={{ marginTop: "0px", position: "relative" }}>
            <div className="product-image" style={{ marginRight: "10px" }}>
              <img 
                src={TaliSepatu} 
                alt="Tali Sepatu" 
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
                Tali Sepatu
              </div>
              <div className="product-description" style={{ color: "black", fontFamily: "Montserrat, sans-serif" }}>
                Rp25.000
              </div>
            </div>
            <div className="order-button" style={{ position: "relative" }}>
              <LazyMotion features={domAnimation}>
                <m.button
                  onClick={handleShoelacePesanClick}
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
                Paket Tambahan
              </div>
              <div className="product-description" style={{ color: "black", fontFamily: "Montserrat, sans-serif" }}>
                Start Rp5.000
              </div>
            </div>
            <div className="order-button" style={{ position: "relative" }}>
              <LazyMotion features={domAnimation}>
                <m.button
                  onClick={handlePaketPesanClick}
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

          {/* Parfum Popup */}
          {showPopup && (
            <>
              <div className="blur-background"></div>
              <div ref={popupRef} className="popup" style={{
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
                  <h3 style={{marginBottom: "15px", fontSize: "18px", textAlign: "center", fontFamily: "Montserrat, sans-serif"}}>Pilih Varian:</h3>
                  
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
                        <div key={variantName} style={{position: 'relative'}}>
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

                  <h3 style={{marginBottom: "15px", fontSize: "18px", textAlign: "center", fontFamily: "Montserrat, sans-serif"}}>Jumlah:</h3>
                  <div style={{display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center"}}>
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
                    <span style={{margin: "0 20px", fontSize: "18px", fontFamily: "Montserrat, sans-serif"}}>{quantity}</span>
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
                      onClick={() => setShowPopup(false)}
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

          {/* Shoelace Popup */}
          {showShoelacePopup && (
            <>
              <div className="blur-background"></div>
              <div ref={shoelacePopupRef} className="popup" style={{
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
                  <h3 style={{marginBottom: "15px", fontSize: "18px", textAlign: "center", fontFamily: "Montserrat, sans-serif"}}>Pilih Warna:</h3>
                  
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
                    <div style={{marginBottom: "20px"}}>
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

                  <h3 style={{marginBottom: "15px", fontSize: "18px", textAlign: "center", fontFamily: "Montserrat, sans-serif"}}>Jumlah:</h3>
                  <div style={{display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center"}}>
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
                    <span style={{margin: "0 20px", fontSize: "18px", fontFamily: "Montserrat, sans-serif"}}>{shoelaceQuantity}</span>
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
                        setShowShoelacePopup(false);
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

          {/* Paket Popup */}
          {showPaketPopup && (
            <>
              <div className="blur-background"></div>
              <div ref={paketPopupRef} className="popup" style={{
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
                  <h3 style={{marginBottom: "15px", fontSize: "18px", textAlign: "center", fontFamily: "Montserrat, sans-serif"}}>Pilih Paket:</h3>
                  
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

                  <h3 style={{marginBottom: "15px", fontSize: "18px", textAlign: "center", fontFamily: "Montserrat, sans-serif"}}>Untuk berapa item?</h3>
                  <div style={{display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center"}}>
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
                    <span style={{margin: "0 20px", fontSize: "18px", fontFamily: "Montserrat, sans-serif"}}>{paketQuantity}</span>
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
                        setShowPaketPopup(false);
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

          {/* Cart Popup */}
          {showCartPopup && (
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
                ref={cartPopupRef}
                className="popup" 
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
                  {cart.map((item, index) => (
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
                            {item.type === 'parfum' ? 'Parfum' : item.type === 'tali' ? 'Tali Sepatu' : 'Paket Tambahan'} {item.variant}
                          </p>
                          <p style={{ color: "#666", fontSize: "14px" }}>
                            Rp{item.price} x {item.quantity} = Rp{item.price * item.quantity}
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
                  Total: Rp{calculateTotal()}
                </div>

                {/* Close Button */}
                <LazyMotion features={domAnimation}>
                  <m.button
                    onClick={() => setShowCartPopup(false)}
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

          {cart.length > 0 && !showPopup && !showShoelacePopup && !showPaketPopup && (
            <LazyMotion features={domAnimation}>
              <m.button
                onClick={() => setShowCartPopup(true)}
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
                Keranjang ({cart.length})
              </m.button>
            </LazyMotion>
          )}

          <div className="" style={{
            textAlign: "center",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "14px",
            marginTop: "15px",
            marginBottom: "15px",
            color: "#545454",
            alignItems: "center",
            justifyContent: "center",
          }}>
            Lewati jika tidak ingin membeli produk!
          </div>

          {!showPopup && !showShoelacePopup && !showPaketPopup && (
            <LazyMotion features={domAnimation}>
              <Link to="/">
                <m.button
                  className="kembali"
                  whileTap={{ scale: 0.9 }}
                  transition={{ stiffness: 1000, damping: 5 }}
                  type="button"
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#545454",
                    color: "white",
                    fontFamily: "Montserrat, sans-serif"
                  }}
                >
                  Kembali
                </m.button>
              </Link>
              <m.button
                className="daftar"
                whileTap={{ scale: 0.9 }}
                transition={{ stiffness: 1000, damping: 5 }}
                type="button"
                onClick={handleKirimPesanan}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#3787F7",
                  color: "white",
                  fontFamily: "Montserrat, sans-serif"
                }}
              >
                Kirim pesanan pada Admin
              </m.button>
            </LazyMotion>
          )}

          {/* Konfirmasi Popup */}
          {showConfirmationPopup && (
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
                ref={popupRef}
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
                onClick={scrollToBottom}
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
                  const formData = JSON.parse(localStorage.getItem('form'));
                  const areaType = formData.selectedArea === 'kota' ? 'Kota' : 'Kabupaten';
                  const fullAddress = `${formData.address}, Kec. ${formData.selectedDistrict}, ${areaType} Malang`;
                  
                  return (
                    <div style={{marginBottom: "20px"}}>
                      <h4 style={{fontWeight: "bold", marginBottom: "10px", color: "#3787F7"}}>Data Diri:</h4>
                      <div style={{fontSize: "14px", color: "black"}}>
                        <p><strong>Nama:</strong> {formData.name}</p>
                        <p><strong>Alamat:</strong> {fullAddress}</p>
                        <p><strong>Patokan:</strong> {formData.pickupPoint || "-"}</p>
                        <p><strong>Link Lokasi:</strong> {formData.locationLink || "-"}</p>
                        <p><strong>Jumlah Item:</strong> {formData.itemCount || "-"}</p>
                        <p><strong>Item:</strong> {formData.selectedItems?.join(", ")}</p>
                        <p><strong>Treatment:</strong> {formData.selectedTreatments?.join(", ")}</p>
                        <p><strong>Estimasi Pengerjaan:</strong> {formData.selectedEstimation || "-"}</p>
                        <p><strong>Aroma:</strong> {formData.selectedAromas?.join(", ")}</p>
                        <p><strong>Tanggal Pick-up:</strong> {new Date(formData.pickupDate).toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
                        <p><strong>Waktu Pick-up:</strong> {formData.pickupTime ? dayjs(`2024-12-19T${formData.pickupTime}`).format("HH:mm") : "Belum dipilih"}</p>
                        {formData.specialMessage && (
                          <p>
                            <strong>Pesan Khusus:</strong>{" "}
                            {showFullMessage ? (
                              <span>{formData.specialMessage}</span>
                            ) : (
                              <span 
                                onClick={(e) => {
                                  e.stopPropagation(); // Mencegah event bubbling ke parent
                                  setShowFullMessage(true);
                                }}
                                style={{ cursor: "pointer", color: "#3787F7" }}
                              >
                                {truncateMessage(formData.specialMessage)}
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Detail Produk */}
                {cart.length > 0 && (
                  <div style={{marginBottom: "20px"}}>
                    <h4 style={{fontWeight: "bold", marginBottom: "10px", color: "#3787F7"}}>Detail Produk:</h4>
                    <div style={{fontSize: "14px", color: "black"}}>
                      {cart.map((item, index) => (
                        <p key={index}>
                          {item.quantity}x {item.type === 'parfum' ? 'Parfum' : item.type === 'tali' ? 'Tali Sepatu' : 'Paket Tambahan'} {item.variant} (Rp{item.price * item.quantity})
                        </p>
                      ))}
                      <p style={{marginTop: "10px", fontWeight: "bold"}}>Total: Rp{calculateTotal()}</p>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
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
                        setShowConfirmationPopup(false);
                        setShowFullMessage(false); // Reset state saat popup ditutup
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
      </div>
    </div>
  );
}

export default FirstPage;
