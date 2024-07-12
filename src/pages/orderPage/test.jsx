import React, { useState, useEffect } from "react";
import "./member.css";
import { defineElement } from "lord-icon-element";
import lottie from "lottie-web";
import { LazyMotion, m, domAnimation } from "framer-motion";
import ParfumWeb from "../../assets/images/ParfumWeb.svg";

function FirstPage() {
  const [items, setItems] = useState({
    Apple: false,
    Vanilla: false,
    BubbleGum: false,
    Grape: false,
    BlackCoffee: false,
    Lavender: false,
    Coklat: false,
    Mint: false,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonOffset, setButtonOffset] = useState(0);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  useEffect(() => {
    // Mendefinisikan elemen lord-icon
    defineElement(lottie.loadAnimation);

    // Fungsi untuk memulai animasi saat input dimulai
    const startAnimationOnInputFocus = () => {
      const inputElements = document.querySelectorAll(".input input");
      const lordIconElements = document.querySelectorAll(".input lord-icon");

      inputElements.forEach((input, index) => {
        input.addEventListener("focus", () => {
          lordIconElements[index].setAttribute("animation", "loop");
        });

        input.addEventListener("blur", () => {
          lordIconElements[index].setAttribute("animation", "none");
        });
      });
    };

    // Panggil fungsi startAnimationOnInputFocus
    startAnimationOnInputFocus();

    // Cleanup event listener saat komponen di-unmount
    return () => {
      const inputElements = document.querySelectorAll(".input input");
      inputElements.forEach((input) => {
        input.removeEventListener("focus", () => {});
        input.removeEventListener("blur", () => {});
      });
    };
  }, []);

  const handleCheckboxChange = (itemName) => {
    setItems((prevItems) => ({
      ...prevItems,
      [itemName]: !prevItems[itemName],
    }));
  };

  const handlePesanClick = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (showDropdown) {
      setDropdownHeight(
        document.getElementById("dropdownContent").clientHeight
      );
    } else {
      setDropdownHeight(0);
      setButtonOffset(0);
    }
  }, [showDropdown]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="container w-full flex justify-center">
        <div className="flex flex-col items-center">
          <div style={{ zIndex: 1 }}>
            <div
              className="text"
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
              Pembelian{" "}
              <span style={{ color: "#03AED2", fontSize: "26px" }}>Produk</span>
            </div>
          </div>

          <div
            className="katalog"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              marginTop: "20px",
              marginBottom: "20px",
              width: "350px",
              position: "relative", // Position relative untuk dropdown absolute
            }}
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
            <div className="order-button">
              <button
                onClick={handlePesanClick}
                style={{
                  backgroundColor: "#29B200",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  padding: "10px",
                  cursor: "pointer",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Pesan
              </button>
              <div
                className="dropdown"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%", // Lebar sesuai dengan katalog
                  zIndex: 10,
                  transform: showDropdown
                    ? `translateY(${dropdownHeight}px)`
                    : "translateY(0)",
                  visibility: showDropdown ? "visible" : "hidden",
                  opacity: showDropdown ? 1 : 0,
                  transition: "transform 0.3s, visibility 0.3s, opacity 0.3s",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  marginTop: "10px",
                  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  id="dropdownContent"
                  style={{
                    color: "black",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={items.Apple}
                    onChange={() => handleCheckboxChange("Apple")}
                  />{" "}
                  Apple
                  <br />
                  <input
                    type="checkbox"
                    checked={items.Vanilla}
                    onChange={() => handleCheckboxChange("Vanilla")}
                  />{" "}
                  Vanilla
                  <br />
                  <input
                    type="checkbox"
                    checked={items.BubbleGum}
                    onChange={() => handleCheckboxChange("BubbleGum")}
                  />{" "}
                  Bubble Gum
                  <br />
                  <input
                    type="checkbox"
                    checked={items.Grape}
                    onChange={() => handleCheckboxChange("Grape")}
                  />{" "}
                  Grape
                  <br />
                  <input
                    type="checkbox"
                    checked={items.BlackCoffee}
                    onChange={() => handleCheckboxChange("BlackCoffee")}
                  />{" "}
                  Black Coffee
                </div>
              </div>
            </div>
          </div>

          <LazyMotion features={domAnimation}>
            <m.button
              className="daftar"
              whileTap={{ scale: 0.9 }}
              transition={{ stiffness: 400, damping: 17 }}
              type="button"
              style={{
                transform: showDropdown
                  ? `translateY(${buttonOffset}px)`
                  : "translateY(0)",
                transition: "transform 0.3s",
              }}
            >
              Lanjutkan
            </m.button>
          </LazyMotion>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
