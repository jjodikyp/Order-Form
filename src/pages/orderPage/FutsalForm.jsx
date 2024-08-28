import React, { useEffect, useState } from "react";
import "./member.css";
import { defineElement } from "lord-icon-element";
import lottie from "lottie-web";
import { DatePicker } from "antd";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { Link } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [date, setDate] = useState("");

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
        input.removeEventListener("focus", () => { });
        input.removeEventListener("blur", () => { });
      });
    };
  }, []);

  const ChatToWhatsapp = () => {
    const phoneNumber = '6287795452475'; // Ganti dengan nomor WhatsApp tujuan
    const message = `Saya Futsal BINUSIAN kak!
  
  Voucher untuk Futsal BINUSIAN
  
  Nama  : ${name}
  NIM Mahasiswa : ${nim}
  Tanggal Claim Voucher : ${date}
  
  Yuk claim voucher DISKON 30% kamu, sekarang juga!!!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
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
              Claim Voucher 30%{" "}
              <span style={{ color: "#03AED2", fontSize: "26px" }}>
                Sekarang
              </span>
            </div>
          </div>

          <div
            className="text text-center"
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "15px",
              color: "black",
              paddingLeft: "20px",
            }}
          >
            Masa Berlaku: 1-5 September 2024
          </div>

          <div className="form" style={{ marginTop: "0px" }}>
            <div className="inputs" style={{ marginTop: "30px" }}>
              <div className="input">
                <input
                  type="text"
                  placeholder="Masukan nama anda!"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input">
                <input type="text"
                  placeholder="Masukan NIM anda!"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                />
              </div>

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
              Tanggal Claim Voucher
            </div>

            <DatePicker
              onChange={(date, dateString) => setDate(dateString)}
              style={{
                maxWidth: "100%", // Tambahkan "px" untuk menentukan unit lebar
                height: "40px", // Tambahkan "px" untuk menentukan unit tinggi
                paddingLeft: "15px", // Padding kiri
                borderRadius: "20px", // Tambahkan borderRadius
                marginTop: "10px", // Margin atas
                marginLeft: "20px", // Margin kiri
              }}
            />

            <div
              className="text mt-2"
              style={{
                textAlign: "left",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "14px",
                color: "#545454",
                maxWidth: "350px",
                paddingLeft: "20px",
              }}
            >
              Pastikan tanggal yang kamu pilih diantara tanggal masa berlaku voucher 1-5 September 2024
            </div>

            <LazyMotion features={domAnimation}>
              <m.button
                className="daftar mt-6"
                whileTap={{ scale: 0.9 }}
                transition={{ stiffness: 400, damping: 17 }}
                type="button"
                onClick={() => {
                  ChatToWhatsapp();
                }}
              >
                Chat Admin
              </m.button>
            </LazyMotion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
