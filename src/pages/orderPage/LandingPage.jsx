import React, { useEffect, useState } from "react";
import "./member.css";
import { defineElement } from "lord-icon-element";
import lottie from "lottie-web";
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import { LazyMotion, m, domAnimation } from "framer-motion";
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  
  // Load initial form data from localStorage
  const initialFormData = JSON.parse(localStorage.getItem('form')) || {
    name: "",
    address: "",
    itemCount: "",
    selectedItems: [],
    selectedTreatments: [], 
    selectedAromas: [],
    pickupDate: null,
    specialMessage: "",
    location: null
  };

  // Convert pickupDate string to dayjs object if exists
  if (initialFormData.pickupDate) {
    initialFormData.pickupDate = dayjs(initialFormData.pickupDate);
  }

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});

  // Load initial items state from localStorage
  const initialItems = JSON.parse(localStorage.getItem('items')) || {
    Sepatu: false,
    Sandal: false,
    SepatuSandal: false,
    HeelsFlatshoes: false,
    Tas: false,
    Helm: false,
    Topi: false,
    Stroller: false,
  };

  const [items, setItems] = useState(initialItems);

  // Load initial treatments state from localStorage  
  const initialTreatments = JSON.parse(localStorage.getItem('treatments')) || {
    DeepClean: false,
    OutsideClean: false,
    UnYellowing: false,
    Repaint: false,
    Reglue: false,
  };

  const [treatments, setTreatments] = useState(initialTreatments);

  // Load initial aromas state from localStorage
  const initialAromas = JSON.parse(localStorage.getItem('aromas')) || {
    Apple: false,
    Vanilla: false,
    BubbleGum: false,
    Grape: false,
    BlackCoffee: false,
    Lavender: false,
    Coklat: false,
  };

  const [aromas, setAromas] = useState(initialAromas);

  useEffect(() => {
    defineElement(lottie.loadAnimation);

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

    startAnimationOnInputFocus();

    return () => {
      const inputElement = document.querySelectorAll(".input input");
      inputElement.forEach((input) => {
        input.removeEventListener("focus", () => {});
        input.removeEventListener("blur", () => {});
      });
    };
  }, []);

  // Save all form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('form', JSON.stringify(formData));
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('treatments', JSON.stringify(treatments));
    localStorage.setItem('aromas', JSON.stringify(aromas));
  }, [formData, items, treatments, aromas]);

  const saveFormDataToLocalStorage = (data) => {
    localStorage.setItem('form', JSON.stringify(data));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      saveFormDataToLocalStorage(newFormData);
      return newFormData;
    });
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setFormData(prev => {
            const newFormData = {
              ...prev,
              locationLink: googleMapsLink
            };
            saveFormDataToLocalStorage(newFormData);
            return newFormData;
          });
          alert('Lokasi berhasil dibagikan!');
        }, 
        (error) => {
          console.error("Error getting location:", error);
          alert('Gagal mendapatkan lokasi. Pastikan GPS aktif dan izin lokasi diberikan.');
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      alert("Browser anda tidak mendukung geolokasi.");
    }
  };
  
  const handleCheckboxChange = (category, itemName) => {
    let updatedItems;
    let updatedFormData;
    
    switch (category) {
      case "items":
        updatedItems = { ...items, [itemName]: !items[itemName] };
        setItems(updatedItems);
        updatedFormData = { 
          ...formData, 
          selectedItems: Object.keys(updatedItems).filter(key => updatedItems[key]).map(item => item.toLowerCase())
        };
        break;
      case "treatments":
        updatedItems = { ...treatments, [itemName]: !treatments[itemName] };
        setTreatments(updatedItems);
        updatedFormData = { 
          ...formData, 
          selectedTreatments: Object.keys(updatedItems).filter(key => updatedItems[key]).map(treatment => treatment.toLowerCase())
        };
        break;
      case "aromas":
        updatedItems = { ...aromas, [itemName]: !aromas[itemName] };
        setAromas(updatedItems);
        updatedFormData = { 
          ...formData, 
          selectedAromas: Object.keys(updatedItems).filter(key => updatedItems[key])
        };
        break;
      default:
        return;
    }
  
    setFormData(updatedFormData);
    saveFormDataToLocalStorage(updatedFormData);
  };
  
  const handleDateChange = (date) => {
    const updatedFormData = { ...formData, pickupDate: date };
    setFormData(updatedFormData);
    saveFormDataToLocalStorage(updatedFormData);
    if (errors.pickupDate) {
      setErrors((prev) => ({
        ...prev,
        pickupDate: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "[X]";
    }

    if (!formData.address.trim()) {
      newErrors.address = "[X]";
    }

    if (!formData.itemCount.trim()) {
      newErrors.itemCount = "[X]";
    }

    const selectedItemsCount = Object.values(items).filter(Boolean).length;
    if (selectedItemsCount === 0) {
      newErrors.items = "Pilih minimal satu item!";
    }

    const selectedItemsThatNeedTreatment = [
      "Sepatu",
      "Sandal", 
      "SepatuSandal",
      "HeelsFlatshoes",
    ];
    const hasItemsThatNeedTreatment = selectedItemsThatNeedTreatment.some(
      (item) => items[item]
    );

    if (hasItemsThatNeedTreatment) {
      const selectedTreatmentsCount =
        Object.values(treatments).filter(Boolean).length;
      if (selectedTreatmentsCount === 0) {
        newErrors.treatments = "Pilih minimal satu treatment!";
      }
    }

    const selectedAromasCount = Object.values(aromas).filter(Boolean).length;
    if (selectedAromasCount === 0) {
      newErrors.aromas = "Pilih minimal satu aroma!";
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = "Tanggal pick-up harus dipilih!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedItemsList = Object.keys(items).filter(key => items[key]).map(item => item.toLowerCase());
      const selectedTreatmentsList = Object.keys(treatments).filter(key => treatments[key]).map(treatment => treatment.toLowerCase());
      const selectedAromasList = Object.keys(aromas).filter(key => aromas[key]);
      
      const finalFormData = {
        ...formData,
        selectedItems: selectedItemsList,
        selectedTreatments: selectedTreatmentsList,
        selectedAromas: selectedAromasList
      };
      
      saveFormDataToLocalStorage(finalFormData);
      
      console.log("Form is valid!", finalFormData);
      navigate("/first");
    } else {
      console.log("Form is invalid!", errors);
    }
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
              <span style={{ color: "#3787F7", fontSize: "26px" }}>
                Katsikat
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="form"
            style={{ marginTop: "0px" }}
          >
            <div className="inputs" style={{ marginTop: "30px" }}>
              <div className="input">
                <input
                  type="text"
                  name="name"
                  placeholder="Masukan nama anda!"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="input">
                <input
                  type="text"
                  name="address"
                  placeholder="Masukan alamat anda!"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                {errors.address && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.address}
                  </div>
                )}
              </div>

              <LazyMotion features={domAnimation}>
                <m.button
                  type="button"
                  className="daftar"
                  onClick={handleGetLocation}
                  style={{ marginBottom: "10px" }}
                  transition={{ stiffness: 400, damping: 17 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Bagikan Lokasi (Google Maps)
                </m.button>
              </LazyMotion>

              <div
                className="text"
                style={{
                  textAlign: "left",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                  marginBottom: "20px",
                  color: "#545454",
                  maxWidth: "350px",
                }}
              >
                PickUp dan Delivery diatas 7km akan dikenakan tarif ongkos
                kirim!
              </div>
            </div>

            <div className="input">
              <input
                type="number"
                name="itemCount"
                placeholder="Masukan jumlah item!"
                value={formData.itemCount}
                onChange={handleInputChange}
                min="1"
              />
              {errors.itemCount && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {errors.itemCount}
                </div>
              )}
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
              {Object.keys(items).map((itemName) => (
                <label
                  key={itemName}
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
                    checked={items[itemName]}
                    onChange={() => handleCheckboxChange("items", itemName)}
                    style={{ marginRight: "5px" }}
                  />
                  {itemName}
                </label>
              ))}
            </div>
            {errors.items && (
              <div
                style={{ color: "red", fontSize: "12px", paddingLeft: "20px" }}
              >
                {errors.items}
              </div>
            )}

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
              {Object.keys(treatments).map((treatmentName) => (
                <label
                  key={treatmentName}
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
                    checked={treatments[treatmentName]}
                    onChange={() =>
                      handleCheckboxChange("treatments", treatmentName)
                    }
                    style={{ marginRight: "5px" }}
                  />
                  {treatmentName === "UnYellowing"
                    ? "Un-Yellowing (Midsole Only)"
                    : treatmentName}
                </label>
              ))}
            </div>
            {errors.treatments && (
              <div
                style={{ color: "red", fontSize: "12px", paddingLeft: "20px" }}
              >
                {errors.treatments}
              </div>
            )}

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
              {Object.keys(aromas).map((aromaName) => (
                <label
                  key={aromaName}
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
                    checked={aromas[aromaName]}
                    onChange={() => handleCheckboxChange("aromas", aromaName)}
                    style={{ marginRight: "5px" }}
                  />
                  {aromaName}
                </label>
              ))}
            </div>
            {errors.aromas && (
              <div
                style={{ color: "red", fontSize: "12px", paddingLeft: "20px" }}
              >
                {errors.aromas}
              </div>
            )}

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
              className="input"
              style={{
                maxWidth: "450px",
                height: "40px",
                borderRadius: "20px",
                marginTop: "10px",
              }}
              onChange={handleDateChange}
              value={formData.pickupDate ? dayjs(formData.pickupDate) : null}
            />
            {errors.pickupDate && (
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  paddingLeft: "20px",
                  marginTop: "10px",
                }}
              >
                {errors.pickupDate}
              </div>
            )}

            <div className="inputs" style={{ marginTop: "30px" }}>
              <div>
                <textarea
                  className="inputPesan"
                  name="specialMessage"
                  placeholder="Sampaikan pesan khusus!"
                  rows={3}
                  value={formData.specialMessage}
                  onChange={handleInputChange}
                />
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
              <m.button
                type="submit"
                className="daftar"
                transition={{ stiffness: 400, damping: 17 }}
                whileTap={{ scale: 0.9 }}
              >
                Lanjutkan
              </m.button>
            </LazyMotion>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
