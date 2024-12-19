import React, { useEffect, useState, useRef } from "react";
import "./member.css";
import { defineElement } from "lord-icon-element";
import lottie from "lottie-web";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";

const KOTA_MALANG = {
  districts: ["Blimbing", "Kedungkandang", "Klojen", "Lowokwaru", "Sukun"],
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
    "Wonosari",
  ],
};

function App() {
  const navigate = useNavigate();

  // Refs for form elements
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const itemCountRef = useRef(null);
  const itemsRef = useRef(null);
  const treatmentsRef = useRef(null);
  const aromasRef = useRef(null);
  const pickupDateRef = useRef(null);
  const pickupTimeRef = useRef(null);

  // Load initial form data from localStorage
  const initialFormData = JSON.parse(localStorage.getItem("form")) || {
    name: "",
    address: "",
    itemCount: "",
    selectedItems: [],
    selectedTreatments: [],
    selectedAromas: [],
    pickupDate: null,
    pickupTime: null,
    specialMessage: "",
    location: null,
    selectedArea: "kota",
    selectedDistrict: "",
  };

  // Convert pickupDate dan pickupTime string ke dayjs object jika ada
  if (initialFormData.pickupDate) {
    initialFormData.pickupDate = dayjs(initialFormData.pickupDate);
  }
  if (initialFormData.pickupTime) {
    initialFormData.pickupTime = dayjs(initialFormData.pickupTime);
  }

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});

  // Load initial items state from localStorage
  const initialItems = JSON.parse(localStorage.getItem("items")) || {
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
  const initialTreatments = JSON.parse(localStorage.getItem("treatments")) || {
    DeepClean: false,
    OutsideClean: false,
    UnYellowing: false,
    Repaint: false,
    Reglue: false,
    Filler: false,
  };

  const [treatments, setTreatments] = useState(initialTreatments);

  // Load initial aromas state from localStorage
  const initialAromas = JSON.parse(localStorage.getItem("aromas")) || {
    Apple: false,
    Vanilla: false,
    BubbleGum: false,
    BlackCoffee: false,
    Lavender: false,
    Coklat: false,
  };

  const [aromas, setAromas] = useState(initialAromas);

  const [selectedArea, setSelectedArea] = useState(
    initialFormData.selectedArea
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    initialFormData.selectedDistrict
  );

  // Modifikasi state popup dengan mengecek sessionStorage
  const [showPickupTimePopup, setShowPickupTimePopup] = useState(() => {
    return false;
  });

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

  // Modifikasi useEffect untuk menampilkan popup
  useEffect(() => {
    const handleScroll = () => {
      const pickupTimeElement = pickupTimeRef.current;
      if (pickupTimeElement) {
        const rect = pickupTimeElement.getBoundingClientRect();
        if (
          rect.top < window.innerHeight &&
          !sessionStorage.getItem("pickupTimePopupShown")
        ) {
          setShowPickupTimePopup(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modifikasi handler untuk menutup popup
  const handleClosePopup = () => {
    setShowPickupTimePopup(false);
    sessionStorage.setItem("pickupTimePopupShown", "true");
  };

  // Save all form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(formData));
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("treatments", JSON.stringify(treatments));
    localStorage.setItem("aromas", JSON.stringify(aromas));
  }, [formData, items, treatments, aromas]);

  const saveFormDataToLocalStorage = (data) => {
    localStorage.setItem("form", JSON.stringify(data));
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

          setFormData((prev) => {
            const newFormData = {
              ...prev,
              locationLink: googleMapsLink,
            };
            saveFormDataToLocalStorage(newFormData);
            return newFormData;
          });

          alert(
            "Lokasi berhasil dibagikan! Lokasi anda telah diubah menjadi Link Google Maps dan akan digunakan untuk keperluan pengiriman!"
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Gagal mendapatkan lokasi. Pastikan GPS aktif dan izin lokasi diberikan."
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
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
          selectedItems: Object.keys(updatedItems)
            .filter((key) => updatedItems[key])
            .map((item) => item.toLowerCase()),
        };
        break;
      case "treatments":
        updatedItems = { ...treatments, [itemName]: !treatments[itemName] };
        setTreatments(updatedItems);
        updatedFormData = {
          ...formData,
          selectedTreatments: Object.keys(updatedItems)
            .filter((key) => updatedItems[key])
            .map((treatment) => treatment.toLowerCase()),
        };
        break;
      case "aromas":
        updatedItems = { ...aromas, [itemName]: !aromas[itemName] };
        setAromas(updatedItems);
        updatedFormData = {
          ...formData,
          selectedAromas: Object.keys(updatedItems).filter(
            (key) => updatedItems[key]
          ),
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

  // Perbaikan fungsi disabledTime untuk membatasi jam yang bisa dipilih
  const disabledTime = () => ({
    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 20, 21, 22, 23],
    disabledMinutes: () => [],
    disabledSeconds: () => [],
  });

  // Modifikasi handleTimeChange untuk memvalidasi waktu
  const handleTimeChange = (time) => {
    if (time) {
      const hour = time.hour();
      if (hour >= 9 && hour < 20) {
        const updatedFormData = { ...formData, pickupTime: time };
        setFormData(updatedFormData);
        saveFormDataToLocalStorage(updatedFormData);
        if (errors.pickupTime) {
          setErrors((prev) => ({
            ...prev,
            pickupTime: "",
          }));
        }
      }
    } else {
      const updatedFormData = { ...formData, pickupTime: null };
      setFormData(updatedFormData);
      saveFormDataToLocalStorage(updatedFormData);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let firstError = null;

    if (!formData.name.trim()) {
      newErrors.name = "[X]";
      if (!firstError) firstError = nameRef;
    }

    if (!formData.address.trim()) {
      newErrors.address = "[X]";
      if (!firstError) firstError = addressRef;
    }

    if (!formData.itemCount.trim()) {
      newErrors.itemCount = "[X]";
      if (!firstError) firstError = itemCountRef;
    }

    const selectedItemsCount = Object.values(items).filter(Boolean).length;
    if (selectedItemsCount === 0) {
      newErrors.items = "Pilih minimal satu item!";
      if (!firstError) firstError = itemsRef;
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
        if (!firstError) firstError = treatmentsRef;
      }
    }

    const selectedAromasCount = Object.values(aromas).filter(Boolean).length;
    if (selectedAromasCount === 0) {
      newErrors.aromas = "Pilih minimal satu aroma!";
      if (!firstError) firstError = aromasRef;
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = "Tanggal pick-up harus dipilih!";
      if (!firstError) firstError = pickupDateRef;
    }

    setErrors(newErrors);

    // Scroll to first error if exists
    if (firstError && firstError.current) {
      firstError.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedItemsList = Object.keys(items)
        .filter((key) => items[key])
        .map((item) => item.toLowerCase());
      const selectedTreatmentsList = Object.keys(treatments)
        .filter((key) => treatments[key])
        .map((treatment) => treatment.toLowerCase());
      const selectedAromasList = Object.keys(aromas).filter(
        (key) => aromas[key]
      );

      const finalFormData = {
        ...formData,
        selectedItems: selectedItemsList,
        selectedTreatments: selectedTreatmentsList,
        selectedAromas: selectedAromasList,
      };

      saveFormDataToLocalStorage(finalFormData);

      console.log("Form is valid!", finalFormData);
      navigate("/first");
    } else {
      console.log("Form is invalid!", errors);
    }
  };

  const handleAreaChange = (e) => {
    const newArea = e.target.value;
    setSelectedArea(newArea);
    setSelectedDistrict(""); // Reset district saat area berubah

    setFormData((prev) => {
      const newFormData = {
        ...prev,
        selectedArea: newArea,
        selectedDistrict: "",
      };
      localStorage.setItem("form", JSON.stringify(newFormData));
      return newFormData;
    });
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setSelectedDistrict(newDistrict);

    setFormData((prev) => {
      const newFormData = {
        ...prev,
        selectedDistrict: newDistrict,
      };
      localStorage.setItem("form", JSON.stringify(newFormData));
      return newFormData;
    });
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
              <div className="input" ref={nameRef}>
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

              <div className="input" ref={addressRef}>
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

              <div className="input-group">
                <div
                  className="radio-group"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    padding: "0 25px",
                    maxWidth: "450px",
                    margin: "0 auto",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px 15px", // Mengurangi padding vertikal dan horizontal
                      border: "1px solid #ddd",
                      borderRadius: "25px",
                      cursor: "pointer",
                      backgroundColor:
                        selectedArea === "kota" ? "#3787F7" : "#fff",
                      color: selectedArea === "kota" ? "#fff" : "#000",
                      fontFamily: "Montserrat, sans-serif",
                      flex: 1,
                      textAlign: "center",
                      fontSize: "14px", // Mengurangi ukuran font
                    }}
                  >
                    <input
                      type="radio"
                      name="area"
                      value="kota"
                      checked={selectedArea === "kota"}
                      onChange={handleAreaChange}
                      style={{ display: "none" }}
                    />
                    Kota Malang
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px 15px", // Mengurangi padding vertikal dan horizontal
                      border: "1px solid #ddd",
                      borderRadius: "25px",
                      cursor: "pointer",
                      backgroundColor:
                        selectedArea === "kabupaten" ? "#3787F7" : "#fff",
                      color: selectedArea === "kabupaten" ? "#fff" : "#000",
                      fontFamily: "Montserrat, sans-serif",
                      flex: 1,
                      textAlign: "center",
                      fontSize: "14px", // Mengurangi ukuran font
                    }}
                  >
                    <input
                      type="radio"
                      name="area"
                      value="kabupaten"
                      checked={selectedArea === "kabupaten"}
                      onChange={handleAreaChange}
                      style={{ display: "none" }}
                    />
                    Kabupaten Malang
                  </label>
                </div>

                <div>
                  <select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="input"
                    required
                    style={{
                      marginTop: "30px",
                      fontFamily: "Montserrat, sans-serif",
                      paddingLeft: "20px",
                      textIndent: "20px",
                      color: "#545454",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 20px center",
                      backgroundSize: "1em",
                    }}
                  >
                    <option value="" disabled>
                      Pilih Kecamatan
                    </option>
                    {selectedArea === "kota"
                      ? KOTA_MALANG.districts.map((district) => (
                          <option
                            key={district}
                            value={district}
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                          >
                            {district}
                          </option>
                        ))
                      : KABUPATEN_MALANG.districts.map((district) => (
                          <option
                            key={district}
                            value={district}
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                          >
                            {district}
                          </option>
                        ))}
                  </select>
                  {!selectedDistrict && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "2px",
                        marginLeft: "20px",
                      }}
                    >
                      Kecamatan wajib dipilih
                    </div>
                  )}
                </div>
              </div>

              <LazyMotion features={domAnimation}>
                <m.button
                  type="button"
                  className="daftar"
                  onClick={handleGetLocation}
                  style={{ marginBottom: "0px", backgroundColor: "#3787F7" }}
                  transition={{ stiffness: 1000, damping: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Bagikan Lokasi (Google Maps)
                </m.button>
              </LazyMotion>

              <div
                className="text"
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                  marginBottom: "20px",
                  color: "#545454",
                  maxWidth: "350px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}
              >
                PickUp dan Delivery diatas 7km akan dikenakan tarif ongkos
                kirim!
              </div>
            </div>

            <div className="input" ref={itemCountRef}>
              <input
                type="number"
                name="itemCount"
                placeholder="Masukan jumlah item!"
                value={formData.itemCount}
                onChange={handleInputChange}
                min="1"
                pattern="[0-9]*"
                inputMode="numeric"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
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
              ref={itemsRef}
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
              ref={treatmentsRef}
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
              <span style={{ color: "#3787F7" }}>
                Tidak perlu memilih treatment, jika item yang kamu masukan
                adalah Topi/Helm/Tas/Stroller
              </span>
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
              ref={aromasRef}
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
              <span style={{ color: "#3787F7" }}>
                Pilihan Favorit Pelanggan: BlackCoffee, BubbleGum, Lavender
              </span>
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
            <div ref={pickupDateRef}>
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
                readOnly
                inputReadOnly={true} // Mencegah keyboard muncul di iPhone
                editable={false} // Mencegah keyboard muncul di iPhone
                placeholder="Pilih tanggal pick-up"
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
            </div>

            <div
              className="text"
              style={{
                textAlign: "left",
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "15px",
                marginTop: "25px",
                marginBottom: "10px",
                color: "black",
                paddingLeft: "20px",
              }}
            >
              Request Jam Pick-Up
            </div>

            <div style={{ padding: "0 20px" }}>
              <form className="max-w-[8.5rem] mx-auto">
                <div className="flex">
                  <input
                    type="time"
                    id="time"
                    className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    min="09:00"
                    max="18:00"
                    value={formData.pickupTime}
                    onChange={handleTimeChange}
                    required
                  />
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </form>
              {errors.pickupTime && (
                <div
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                >
                  {errors.pickupTime}
                </div>
              )}
            </div>

            <div className="inputs" style={{ marginTop: "20px" }}>
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
                  textAlign: "center",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                  marginBottom: "15px",
                  color: "#545454",
                  maxWidth: "350px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  marginBottom: "30px",
                }}
              >
                Sampaikan pesan atau permintaan khusus kepada kami! Setelah
                pesan diterima, akan kami pertimbangkan dan respon pesan Anda.
              </div>
            </div>
            <LazyMotion features={domAnimation}>
              <m.button
                type="submit"
                className="daftar"
                style={{ backgroundColor: "#3787F7" }}
                transition={{ stiffness: 1000, damping: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                Lanjutkan
              </m.button>
            </LazyMotion>
          </form>
        </div>
      </div>

      {/* Tambahkan popup notification */}
      {showPickupTimePopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "80%",
              textAlign: "center",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            <p
              style={{
                marginBottom: "20px",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              Sesuai ketentuan, jam PickUp hanya berlaku mulai jam 09.00 sampai
              19.00. Silahkan pindah ke hari selanjutnya apabila sudah melewati
              batas jam PickUp. Terima Kasih
            </p>
            <LazyMotion features={domAnimation}>
              <m.button
                onClick={handleClosePopup}
                style={{
                  backgroundColor: "#3787F7",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ stiffness: 1000, damping: 5 }}
              >
                Baik, Saya Paham
              </m.button>
            </LazyMotion>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
