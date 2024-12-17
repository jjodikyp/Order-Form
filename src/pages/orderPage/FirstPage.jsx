import React, { useState, useEffect, useRef } from "react";
import "./member.css";
import { LazyMotion, m, domAnimation } from "framer-motion";
import ParfumWeb from "../../assets/images/ParfumWeb.svg";
import TaliSepatu from "../../assets/images/talisepatu.png";
import PaketTambahan from "../../assets/images/tambahan.jpg";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

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
    { name: "Suede Care", price: 10000 },
    { name: "Penghilang Bau", price: 15000 },
    { name: "Tambahan Pengharum", price: 5000 },
    { name: "Penghilang Noda", price: 5000 }
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

  const handleKirimPesanan = () => {
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

    const message = `Halo Admin Katsikat!
Ini Form Order saya yaa!

*Nama:* ${formData.name}
*Alamat:* ${fullAddress}
*Link Lokasi:* ${formData.locationLink || "-"}
*Jumlah Item:* ${formData.itemCount || "-"}
*Item Yang Dipilih:* ${formData.selectedItems?.join(", ") || "-"}
*Treatment Yang Dipilih:* ${formData.selectedTreatments?.join(", ") || "-"}
*Aroma Yang Dipilih:* ${formData.selectedAromas?.join(", ") || "-"}

*Pick-up:* ${new Date(formData.pickupDate).toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
*Waktu Pick-up:* ${formData.pickupTime ? dayjs(formData.pickupTime).format('hh:mm') + ' ' + (dayjs(formData.pickupTime).format('A') === 'AM' ? 'Pagi' : dayjs(formData.pickupTime).hour() < 15 ? 'Siang' : dayjs(formData.pickupTime).hour() < 18 ? 'Sore' : 'Malam') : '-'}

*Pesan Khusus*: ${formData.specialMessage}
 
*Detail Pembelian Produk:*
${cartDetails}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6287795452475?text=${encodedMessage}`);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className={`container w-full flex justify-center ${showPopup || showShoelacePopup || showPaketPopup ? "blur-background" : ""}`}>
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
              marginTop: "15px",
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
                src={ParfumWeb} 
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
                  transition={{ stiffness: 400, damping: 17 }}
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
                  transition={{ stiffness: 400, damping: 17 }}
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
                  transition={{ stiffness: 400, damping: 17 }}
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
                        transition={{ stiffness: 400, damping: 17 }}
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
                        transition={{ stiffness: 400, damping: 17 }}
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
                      transition={{ stiffness: 400, damping: 17 }}
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
                      transition={{ stiffness: 400, damping: 17 }}
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
                          fontFamily: "Montserrat, sans-serif"
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
                        transition={{ stiffness: 400, damping: 17 }}
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
                        transition={{ stiffness: 400, damping: 17 }}
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
                      transition={{ stiffness: 400, damping: 17 }}
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
                      transition={{ stiffness: 400, damping: 17 }}
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
                        transition={{ stiffness: 400, damping: 17 }}
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
                        transition={{ stiffness: 400, damping: 17 }}
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
                      transition={{ stiffness: 400, damping: 17 }}
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
                      transition={{ stiffness: 400, damping: 17 }}
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

          {/* Cart Section */}
          {cart.length > 0 && (
            <div style={{
              width: "100%",
              maxWidth: "500px",
              margin: "20px 0",
              padding: "15px",
              backgroundColor: "#f5f5f5",
              borderRadius: "20px"
            }}>
              <h3 style={{
                fontFamily: "Montserrat, sans-serif",
                marginBottom: "10px",
                color: "black"
              }}>Keranjang:</h3>
              
              {cart.map((item, index) => (
                <div key={index} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "15px",
                  fontFamily: "Montserrat, sans-serif"
                }}>
                  <div style={{color: "black"}}>
                    <span style={{fontWeight: "bold", fontSize: "15px"}}>
                      {item.type === 'parfum' ? 'Parfum' : item.type === 'tali' ? 'Tali Sepatu' : 'Paket Tambahan'} {item.variant}
                    </span>
                    <br />
                    <span style={{fontSize: "13px"}}>{item.quantity}x @ Rp{item.price}</span>
                  </div>
                  <button 
                    onClick={() => handleRemoveFromCart(index)}
                    style={{
                      backgroundColor: "#3787F7",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      fontFamily: "Montserrat, sans-serif"
                    }}
                  >
                    Hapus
                  </button>
                </div>
              ))}
              
              <div style={{
                borderTop: "2px solid #ddd",
                paddingTop: "10px",
                textAlign: "right",
                fontWeight: "bold",
                color: "black",
                fontFamily: "Montserrat, sans-serif"
              }}>
                Total: Rp{calculateTotal()}
              </div>
            </div>
          )}

          <div className="" style={{
            textAlign: "center",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "14px",
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
                  transition={{ stiffness: 400, damping: 17 }}
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
                transition={{ stiffness: 400, damping: 17 }}
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
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
