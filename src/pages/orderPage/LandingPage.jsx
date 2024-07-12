import React, { useEffect, useState } from "react";
import "./member.css";
import { defineElement } from "lord-icon-element";
import lottie from "lottie-web";
import { DatePicker } from "antd";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { Link } from "react-router-dom";

function App() {
  const [items, setItems] = useState({
    sepatu: false,
    sandal: false,
    sepatuSandal: false,
    heelsFlatshoes: false,
    tas: false,
    helm: false,
    topi: false,
    stroller: false,
    deepClean: false,
    outsideClean: false,
    unYellowing: false,
    repaint: false,
    reglue: false,
    Apple: false,
    Vanilla: false,
    BubbleGum: false,
    Grape: false,
    BlackCoffee: false,
    Lavender: false,
    Coklat: false,
    Mint: false,
  });

  useEffect(() => {
    // Mendefinisikan elemen lord-icon
    defineElement(lottie.loadAnimation);

    // Fungsi untuk memulai animasi saat input dimulai
    const startAnimationOnInputFocus = () => {
      const inputElement = document.querySelectorAll(".input input");
      const lordIconElements = document.querySelectorAll(".input lord-icon");

      inputElement.forEach((input, index) => {
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
      const inputElement = document.querySelectorAll(".input input");
      inputElement.forEach((input) => {
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

  return (
    <div className="w-full flex justify-center items-center">
      <div className="container w-full flex justify-center">
        <div className="flex flex-col" style={{ flexDirection: "column" }}>
          <div style={{ zIndex: 1 }}>
            <div
              className=""
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "26px",
                marginTop: "15px",
                color: "black",
              }}
            >
              Form Order{" "}
              <span style={{ color: "#03AED2", fontSize: "26px" }}>
                Katsikat
              </span>
            </div>
          </div>

          <div className="form" style={{ marginTop: "0px" }}>
            <div className="inputs" style={{ marginTop: "30px" }}>
              <div className="input">
                <input type="text" placeholder="Masukan nama anda!" />
              </div>

              <div className="input">
                <input type="text" placeholder="Masukan alamat anda!" />
              </div>

              <div
                className="text"
                style={{
                  textAlign: "left",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                  marginBottom: "20px",
                  color: "#545454",
                  maxWidth: "350px", // Menambahkan properti maxWidth di sini
                }}
              >
                PickUp dan Delivery diatas 7km akan dikenakan tarif ongkos
                kirim!
              </div>
            </div>

            <div className="input">
              <input type="email" placeholder="Masukan jumlah item!" />
            </div>

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
              <label
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
                  checked={items.sepatu}
                  onChange={() => handleCheckboxChange("sepatu")}
                  style={{ marginRight: "5px" }}
                />
                Sepatu
              </label>
              <label
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
                  checked={items.sandal}
                  onChange={() => handleCheckboxChange("sandal")}
                  style={{ marginRight: "5px" }}
                />
                Sandal
              </label>
              <label
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
                  checked={items.sepatuSandal}
                  onChange={() => handleCheckboxChange("sepatuSandal")}
                  style={{ marginRight: "5px" }}
                />
                Sepatu Sandal
              </label>
              <label
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
                  checked={items.heelsFlatshoes}
                  onChange={() => handleCheckboxChange("heelsFlatshoes")}
                  style={{ marginRight: "5px" }}
                />
                Heels/Flatshoes
              </label>
              <label
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
                  checked={items.tas}
                  onChange={() => handleCheckboxChange("tas")}
                  style={{ marginRight: "5px" }}
                />
                Tas
              </label>
              <label
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
                  checked={items.helm}
                  onChange={() => handleCheckboxChange("helm")}
                  style={{ marginRight: "5px" }}
                />
                Helm
              </label>
              <label
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
                  checked={items.topi}
                  onChange={() => handleCheckboxChange("topi")}
                  style={{ marginRight: "5px" }}
                />
                Topi
              </label>
              <label
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
                  checked={items.stroller}
                  onChange={() => handleCheckboxChange("stroller")}
                  style={{ marginRight: "5px" }}
                />
                Stroller
              </label>
            </div>

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
              <label
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
                  checked={items.deepClean}
                  onChange={() => handleCheckboxChange("deepClean")}
                  style={{ marginRight: "5px" }}
                />
                Deep Clean
              </label>
              <label
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
                  checked={items.outsideClean}
                  onChange={() => handleCheckboxChange("outsideClean")}
                  style={{ marginRight: "5px" }}
                />
                Outside Clean
              </label>
              <label
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
                  checked={items.unYellowing}
                  onChange={() => handleCheckboxChange("unYellowing")}
                  style={{ marginRight: "5px" }}
                />
                Un-Yellowing (Midsole Only)
              </label>
              <label
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
                  checked={items.repaint}
                  onChange={() => handleCheckboxChange("repaint")}
                  style={{ marginRight: "5px" }}
                />
                Repaint
              </label>
              <label
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
                  checked={items.reglue}
                  onChange={() => handleCheckboxChange("reglue")}
                  style={{ marginRight: "5px" }}
                />
                Reglue
              </label>
            </div>

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
              Tidak perlu memilih treatment, jika item yang kamu masukan adalah
              Topi/Helm/Tas/Stroller
            </div>

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
              <label
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
                  checked={items.Apple}
                  onChange={() => handleCheckboxChange("Apple")}
                  style={{ marginRight: "5px" }}
                />
                Apple
              </label>
              <label
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
                  checked={items.Vanilla}
                  onChange={() => handleCheckboxChange("Vanilla")}
                  style={{ marginRight: "5px" }}
                />
                Vanilla
              </label>
              <label
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
                  checked={items.BubbleGum}
                  onChange={() => handleCheckboxChange("BubbleGum")}
                  style={{ marginRight: "5px" }}
                />
                Bubble Gum
              </label>
              <label
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
                  checked={items.Grape}
                  onChange={() => handleCheckboxChange("Grape")}
                  style={{ marginRight: "5px" }}
                />
                Grape
              </label>
              <label
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
                  checked={items.BlackCoffee}
                  onChange={() => handleCheckboxChange("BlackCoffee")}
                  style={{ marginRight: "5px" }}
                />
                Black Coffee
              </label>
              <label
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
                  checked={items.Lavender}
                  onChange={() => handleCheckboxChange("Lavender")}
                  style={{ marginRight: "5px" }}
                />
                Lavender
              </label>
              <label
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
                  checked={items.Coklat}
                  onChange={() => handleCheckboxChange("Coklat")}
                  style={{ marginRight: "5px" }}
                />
                Coklat
              </label>
              <label
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
                  checked={items.Mint}
                  onChange={() => handleCheckboxChange("Mint")}
                  style={{ marginRight: "5px" }}
                />
                Mint
              </label>
            </div>

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
              Parfum akan diberikan saat setelah item selesai dilakukan
              treatment!
            </div>

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
              Admin akan menghubungi anda untuk konfirmasi tanggal pick-up!
            </div>
            <DatePicker
              style={{
                maxWidth: "280px", // Tambahkan "px" untuk menentukan unit lebar
                height: "40px", // Tambahkan "px" untuk menentukan unit tinggi
                paddingLeft: "15px", // Padding kiri
                borderRadius: "20px", // Tambahkan borderRadius
                marginTop: "10px", // Margin atas
                marginLeft: "20px", // Margin kiri
              }}
            />

            <div className="inputs" style={{ marginTop: "30px" }}>
              <div className="input">
                <input type="text" placeholder="Sampaikan pesan khusus!" />
              </div>

              <div
                className="text"
                style={{
                  textAlign: "left",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                  marginBottom: "15px",
                  color: "#545454",
                  maxWidth: "350px",
                }}
              >
                Sampaikan pesan atau permintaan khusus kepada kami! Setelah
                pesan diterima akan kami pertimbangkan dan respon pesan kamu
              </div>
            </div>
            <LazyMotion features={domAnimation}>
              <Link to="/first">
                <m.button
                  className="daftar"
                  whileTap={{ scale: 0.9 }}
                  transition={{ stiffness: 400, damping: 17 }}
                  type="button"
                >
                  Lanjutkan
                </m.button>
              </Link>
            </LazyMotion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
