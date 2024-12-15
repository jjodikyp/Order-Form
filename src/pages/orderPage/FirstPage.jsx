import React, { useState } from "react";
import "./member.css";
import { LazyMotion, m, domAnimation } from "framer-motion";
import ParfumWeb from "../../assets/images/ParfumWeb.svg";
import { Link } from "react-router-dom";

function FirstPage() {
  const [items, setItems] = useState({
    Apple: false,
    Vanilla: false,
    BubbleGum: false,
    Grape: false,
    BlackCoffee: false,
    Lavender: false,
    Coklat: false,
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckboxChange = (itemName) => {
    setItems((prevItems) => ({
      ...prevItems,
      [itemName]: !prevItems[itemName],
    }));
  };

  const handlePesanClick = () => {
    setShowPopup(true);
  };

  const handleSelesaiClick = () => {
    setShowPopup(false);
  };

  const handleKirimPesanan = () => {
    // Get form data from localStorage
    const formData = JSON.parse(localStorage.getItem('form'));
    
    // Get selected parfume items
    const selectedParfumes = Object.entries(items)
      .filter(([_, isSelected]) => isSelected)
      .map(([name]) => name)
      .join(", ");

    // Create WhatsApp message
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
*Parfum yang dibeli*: ${selectedParfumes}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/6287795452475?text=${encodedMessage}`);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={`container w-full flex justify-center ${
          showPopup ? "blur-background" : ""
        }`}
      >
        <div className="flex flex-col items-center">
          <div style={{ zIndex: 1 }}>
            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "26px",
                marginTop: "15px",
                color: "black",
              }}
            >
              Pembelian&nbsp;
              <span style={{ color: "#03AED2", fontSize: "26px" }}>Produk</span>
            </div>
          </div>

          <div
            className="katalog"
            style={{ marginTop: "20px", position: "relative" }}
          >
            <div className="product-image" style={{ marginRight: "10px" }}>
              <img
                src={ParfumWeb}
                alt="Produk"
                style={{ width: "80px", height: "80px", borderRadius: "10px" }}
              />
            </div>
            <div className="product-info" style={{ flexGrow: 1 }}>
              <div
                className="product-name"
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Shoes Parfume
              </div>
              <div
                className="product-description"
                style={{ color: "black", fontFamily: "Montserrat, sans-serif" }}
              >
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
                    backgroundColor: "#29B200",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "8px",
                    cursor: "pointer",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "14px",
                  }}
                >
                  Pesan
                </m.button>
              </LazyMotion>
              {showPopup && (
                <>
                  <div className="blur-background"></div>
                  <div className="popup">
                    <div
                      id="popupContent"
                      style={{
                        color: "black",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={items.Apple}
                        onChange={() => handleCheckboxChange("Apple")}
                        style={{ marginRight: "5px" }}
                      />{" "}
                      Apple
                      <br />
                      <input
                        type="checkbox"
                        checked={items.Vanilla}
                        onChange={() => handleCheckboxChange("Vanilla")}
                        style={{ marginRight: "5px" }}
                      />{" "}
                      Vanilla
                      <br />
                      <input
                        type="checkbox"
                        checked={items.BubbleGum}
                        onChange={() => handleCheckboxChange("BubbleGum")}
                        style={{ marginRight: "5px" }}
                      />{" "}
                      Bubble Gum
                      <br />
                      <input
                        type="checkbox"
                        checked={items.Grape}
                        onChange={() => handleCheckboxChange("Grape")}
                        style={{ marginRight: "5px" }}
                      />{" "}
                      Grape
                      <br />
                      <input
                        type="checkbox"
                        checked={items.BlackCoffee}
                        onChange={() => handleCheckboxChange("BlackCoffee")}
                        style={{ marginRight: "5px" }}
                      />{" "}
                      Black Coffee
                      <br />
                      <LazyMotion features={domAnimation}>
                        <m.button
                          onClick={handleSelesaiClick}
                          whileTap={{ scale: 0.9 }}
                          transition={{ stiffness: 400, damping: 17 }}
                          style={{
                            backgroundColor: "#03AED2",
                            color: "white",
                            border: "none",
                            borderRadius: "20px",
                            padding: "10px",
                            marginTop: "20px",
                            cursor: "pointer",
                            fontFamily: "Montserrat, sans-serif",
                            width: "100%",
                          }}
                        >
                          Selesai
                        </m.button>
                      </LazyMotion>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            className=""
            style={{
              textAlign: "center",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "14px",
              marginBottom: "15px",
              color: "#545454",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
