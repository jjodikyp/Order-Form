import React, { useEffect, useState } from "react";
import "./member.css";
import { defineElement } from "lord-icon-element";
import lottie from "lottie-web";
import { DatePicker } from "antd";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { Link } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    alamat: false,
    date: false,
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

  const validateForm = () => {
    const newErrors = {
      name: name.trim() === "",
      alamat: alamat.trim() === "",
      date: date === "",
    };

    setErrors(newErrors);

    // Return true if all fields are valid (no errors)
    return !(newErrors.name || newErrors.alamat || newErrors.date);
  };

  const ChatToWhatsapp = () => {
    // First validate the form
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    const phoneNumber = "6287795452475";
    const message = `Halo kak, saya ingin claim voucher!
  
    Nama: ${name}
    Alamat Penjemputan: ${alamat}
    Tolong ambil pada tanggal: ${date}
    Pesan dari saya: ${note}
  
    _Voucher ini diclaim melalui booth Katsikat di Mall Malang Town Square_`;

    // Encode pesan agar sesuai dengan format URL
    const encodedMessage = encodeURIComponent(message);

    // Buat URL WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Debug URL yang dihasilkan untuk memastikan benar
    console.log("Generated WhatsApp URL:", whatsappUrl);

    // Buka WhatsApp URL
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
              Claim Voucher{" "}
              <span style={{ color: "#03AED2", fontSize: "26px" }}>
                50k untuk 2 Pasang
              </span>
            </div>
          </div>

          <div
            className="text text-center mt-2"
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "15px",
              color: "black",
              paddingLeft: "20px",
            }}
          >
            Berlaku hingga 1 Desember 2024
          </div>

          <div className="form" style={{ marginTop: "0px" }}>
            <div className="inputs" style={{ marginTop: "30px" }}>
              <div className="input">
                <input
                  type="text"
                  placeholder="Masukan nama anda!"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: false }));
                  }}
                  style={{
                    borderColor: errors.name ? "red" : "",
                    borderWidth: errors.name ? "2px" : "",
                  }}
                />
                {errors.name && (
                  <div
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    Nama harus diisi
                  </div>
                )}
              </div>

              <div className="input">
                <input
                  type="text"
                  placeholder="Masukan alamat penjempuatan!"
                  value={alamat}
                  onChange={(e) => {
                    setAlamat(e.target.value);
                    setErrors((prev) => ({ ...prev, alamat: false }));
                  }}
                  style={{
                    borderColor: errors.alamat ? "red" : "",
                    borderWidth: errors.alamat ? "2px" : "",
                  }}
                />
                {errors.alamat && (
                  <div
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    Alamat harus diisi
                  </div>
                )}
              </div>

              <div>
                <textarea
                  className="inputPesan"
                  placeholder="Sampaikan pesan khusus!"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
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

              <div>
                <DatePicker
                  className="input"
                  onChange={(date, dateString) => {
                    setDate(dateString);
                    setErrors((prev) => ({ ...prev, date: false }));
                  }}
                  status={errors.date ? "error" : ""}
                />
                {errors.date && (
                  <div
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    Tanggal harus dipilih
                  </div>
                )}
              </div>
            </div>

            <div
              className="text mt-6"
              style={{
                textAlign: "left",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "14px",
                color: "#545454",
                maxWidth: "450px",
                paddingLeft: "20px",
              }}
            >
              Voucher hanya berlaku hingga tanggal 1 Desember 2024. Apabila
              tanggal penjemputan melewati batas berlaku voucher, maka akan
              dikenakan harga normal!
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
                Ambil Voucher Sekarang
              </m.button>
            </LazyMotion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
