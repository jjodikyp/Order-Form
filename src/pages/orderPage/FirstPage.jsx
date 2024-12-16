import React, { useState, useEffect, useRef } from "react";
import "./member.css";
import { LazyMotion, m, domAnimation } from "framer-motion";
import ParfumWeb from "../../assets/images/ParfumWeb.svg";
import { Link } from "react-router-dom";

const FREE_DELIVERY_THRESHOLD = 7.0;
const BASE_DISTANCE = 8.0;
const BASE_PRICE = 2000;
const PRICE_PER_KM = 2000;

function FirstPage() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const popupRef = useRef(null);

  const variants = [
    "Apple",
    {name: "Vanilla", isBestSeller: true}, 
    "BubbleGum",
    "Grape", 
    {name: "BlackCoffee", isBestSeller: true},
    {name: "Lavender", isBestSeller: true},
    "Coklat"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
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
      variant: selectedVariant,
      quantity: quantity,
      price: 30000
    };

    setCart([...cart, newItem]);
    setShowPopup(false);
    setSelectedVariant("");
    setQuantity(1);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handlePesanClick = () => {
    setShowPopup(true);
    setSelectedVariant(""); // Reset selected variant when opening popup
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleKirimPesanan = () => {
    const formData = JSON.parse(localStorage.getItem('form'));
    
    let cartDetails = cart.map(item => 
      `${item.quantity}x ${item.variant} (Rp${item.price * item.quantity})`
    ).join("\n");

    const message = `Halo Admin Katsikat!
Ini Form Order saya yaa!

*Nama:* ${formData.name}
*Alamat:* ${formData.address} 
*Link Lokasi:* ${formData.locationLink || "-"}
*Item Yang Dipilih:* ${formData.selectedItems?.join(", ") || "-"}
*Treatment Yang Dipilih:* ${formData.selectedTreatments?.join(", ") || "-"}
*Aroma Yang Dipilih:* ${formData.selectedAromas?.join(", ") || "-"}

*Pick-up:* ${new Date(formData.pickupDate).toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}

*Pesan Khusus*: ${formData.specialMessage}

*Detail Pembelian Parfum:*
${cartDetails}
*Total:* Rp${calculateTotal()}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6287795452475?text=${encodedMessage}`);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className={`container w-full flex justify-center ${showPopup ? "blur-background" : ""}`}>
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

          <div className="katalog" style={{ marginTop: "20px", position: "relative" }}>
            <div className="product-image" style={{ marginRight: "10px" }}>
              <img src={ParfumWeb} alt="Produk" style={{ width: "80px", height: "80px", borderRadius: "10px" }} />
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
                  Tambah ke Keranjang
                </m.button>
              </LazyMotion>

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
                          
                          return (
                            <div key={variantName} style={{position: 'relative'}}>
                              <m.button
                                onClick={() => setSelectedVariant(variantName)}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                  padding: "10px",
                                  borderRadius: "10px",
                                  border: "none",
                                  backgroundColor: selectedVariant === variantName ? "#3787F7" : "#f0f0f0",
                                  color: selectedVariant === variantName ? "white" : "black",
                                  cursor: "pointer",
                                  fontFamily: "Montserrat, sans-serif",
                                  fontSize: "14px",
                                  transition: "all 0.2s",
                                  width: "100%"
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
            </div>
          </div>

          {/* Keranjang */}
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
                    <span style={{fontWeight: "bold", fontSize: "15px"}}>{item.variant}</span>
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

          {!showPopup && (
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
