import React, { useContext, useState } from "react";
import { OrderFormContext } from "../../contexts/OrderFormContext";
import { motion as m } from "framer-motion";
import { LazyMotion, domAnimation } from "framer-motion";

const ModalInsole = () => {
  const { formik, modals, setModals } = useContext(OrderFormContext);
  const { setFieldValue } = formik;
  const [insoleData, setInsoleData] = useState({
    thickness: "",
    length: "",
    shoeSize: "",
    price: 0,
  });

  const insoleVariants = [
    { thickness: "1cm", price: 45000, description: "Ketebalan area tumit 1cm" },
    { thickness: "2cm", price: 58000, description: "Ketebalan area tumit 2cm" },
    {
      thickness: "2.5cm",
      price: 63000,
      description: "Ketebalan area tumit 2.5cm",
    },
    { thickness: "3cm", price: 63000, description: "Ketebalan area tumit 3cm" },
  ];

  const handleInsoleChange = (name, value) => {
    if (name === "thickness") {
      const selectedVariant = insoleVariants.find((v) => v.thickness === value);
      setInsoleData((prev) => ({
        ...prev,
        thickness: value,
        price: selectedVariant?.price || 0,
      }));
    } else if (name === "length") {
      const formattedValue = value.replace(',', '.');
      if (formattedValue === '' || (!isNaN(formattedValue) && parseFloat(formattedValue) > 0)) {
        setInsoleData((prev) => ({
          ...prev,
          [name]: formattedValue
        }));
      }
    } else if (name === "shoeSize") {
      const formattedValue = value.replace(',', '.');
      if (formattedValue === '' || !isNaN(formattedValue)) {
        setInsoleData((prev) => ({
          ...prev,
          [name]: formattedValue
        }));
      }
    }
  };

  const handleAddInsoleToCart = () => {
    const length = parseFloat(insoleData.length.replace(',', '.'));
    const shoeSize = parseFloat(insoleData.shoeSize.replace(',', '.'));

    if (!insoleData.thickness || !length || !shoeSize) {
      alert("Silakan lengkapi semua data insole");
      return;
    }

    const newItem = {
      type: "insole",
      thickness: insoleData.thickness,
      length: insoleData.length.replace(',', '.'),
      shoeSize: insoleData.shoeSize.replace(',', '.'),
      price: insoleData.price,
      quantity: 1,
    };

    setFieldValue("cart", [...formik.values.cart, newItem]);
    setModals({ ...modals, insole: false });
    setInsoleData({
      thickness: "",
      length: "",
      shoeSize: "",
      price: 0,
    });
  };

  return (
    <div>
      {modals.insole && (
        <>
          <div className="blur-background"></div>
          <div
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
              zIndex: 1000,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              id="popupContent"
              style={{
                color: "black",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <h3
                style={{
                  marginBottom: "15px",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                Katalog Insole Sepatu
              </h3>

              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ marginBottom: "10px", fontSize: "16px" }}>
                  Pilih Ketebalan:
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "10px",
                  }}
                >
                  {insoleVariants.map((variant) => (
                    <m.button
                      key={variant.thickness}
                      onClick={() =>
                        handleInsoleChange("thickness", variant.thickness)
                      }
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor:
                          insoleData.thickness === variant.thickness
                            ? "#3787F7"
                            : "#f0f0f0",
                        color:
                          insoleData.thickness === variant.thickness
                            ? "white"
                            : "black",
                        cursor: "pointer",
                        fontSize: "14px",
                        textAlign: "left",
                      }}
                    >
                      {variant.description}
                      <br />
                      <span style={{ fontSize: "12px" }}>
                        Rp{variant.price.toLocaleString()}
                      </span>
                    </m.button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "14px",
                  }}
                >
                  Panjang Insole (CM):
                </label>
                <input
                  type="text"
                  value={insoleData.length}
                  onChange={(e) => handleInsoleChange("length", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "black",
                  }}
                  placeholder="Contoh: 25.5 atau 25,5"
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "14px",
                  }}
                >
                  Ukuran Sepatu:
                </label>
                <input
                  type="text"
                  value={insoleData.shoeSize}
                  onChange={(e) => handleInsoleChange("shoeSize", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "black",
                  }}
                  placeholder="Contoh: 42.5 atau 42,5"
                />
              </div>

              <LazyMotion features={domAnimation}>
                <m.button
                  onClick={handleAddInsoleToCart}
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
                    width: "100%",
                    fontSize: "16px",
                  }}
                >
                  Tambah ke Keranjang
                </m.button>
                <m.button
                  onClick={() => setModals({ ...modals, insole: false })}
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
                    width: "100%",
                    fontSize: "16px",
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
  );
};

export default ModalInsole;
