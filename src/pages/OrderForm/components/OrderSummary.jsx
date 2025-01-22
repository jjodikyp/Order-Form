import { useContext } from "react";
import "../styling/member.css";
import { LazyMotion, m, domAnimation } from "framer-motion";
import TaliSepatu from "../../../assets/images/talisepatu.png";
import PaketTambahan from "../../../assets/images/tambahan.jpg";
import Parfum from "../../../assets/images/parfum.png";
import { Link } from "react-router-dom";
import ModalParfum from "./componentsOrderSummary/ModalParfum";
import { OrderFormContext } from "../contexts/OrderFormContext";
import ModalShoelace from "./componentsOrderSummary/ModalShoelace";
import ModalPaket from "./componentsOrderSummary/ModalPaket";
import ModalCart from "./componentsOrderSummary/ModalCart";
import ModalConfirm from "./componentsOrderSummary/ModalConfirm";


function OrderSummary() {
  const { modals, setModals } = useContext(OrderFormContext);

  const renderHeader = () => {
    return (
      <div>
        <div style={{ zIndex: 1 }}>
          <div className="" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "26px",
            marginTop: "0px",
            color: "black",
          }}>
            Pembelian&nbsp;
            <span style={{ color: "#3787F7", fontSize: "26px" }}>Produk</span>
          </div>
        </div>
      </div>
    )
  }

  const renderParfumProduct = () => {
    return (
      <div>
        {modals.parfum && (
          <ModalParfum />
        )}
        {/* Parfum Product */}
        <div className="katalog" style={{ marginTop: "0px", position: "relative" }}>
          <div className="product-image" style={{ marginRight: "10px" }}>
            <img
              src={Parfum}
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
                onClick={() => setModals({ ...modals, parfum: true })}
                className="order-button"
                whileTap={{ scale: 0.9 }}
                transition={{ stiffness: 1000, damping: 5 }}
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
      </div>
    )
  }

  const renderShoelaceProduct = () => {
    return (
      <div>
        {modals.shoelace && (
          <ModalShoelace />
        )}

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
                onClick={() => setModals({ ...modals, shoelace: true })}
                className="order-button"
                whileTap={{ scale: 0.9 }}
                transition={{ stiffness: 1000, damping: 5 }}
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

      </div>
    )
  }

  const renderPaketProduct = () => {
    return (
      <div>
        {modals.paket && (
          <ModalPaket />
        )}
        {/* Paket Product */}
        <div className="katalog" style={{ marginTop: "20px", position: "relative" }}>
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
              Treatment Tambahan
            </div>
            <div className="product-description" style={{ color: "black", fontFamily: "Montserrat, sans-serif" }}>
              Start Rp5.000
            </div>
          </div>
          <div className="order-button" style={{ position: "relative" }}>
            <LazyMotion features={domAnimation}>
              <m.button
                onClick={() => setModals({ ...modals, paket: true })}
                className="order-button"
                whileTap={{ scale: 0.9 }}
                transition={{ stiffness: 1000, damping: 5 }}
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

      </div>
    )
  }

  const renderButtonConfirm = () => {
    const handleOpenConfirmOrder = () => {
      setModals({ ...modals, confirmation: true });
    };

    return (
      <div>
        {modals.confirmation && (
          <ModalConfirm />
        )}
        <div className="" style={{
          textAlign: "center",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "14px",
          marginTop: "15px",
          marginBottom: "15px",
          color: "#545454",
          alignItems: "center",
          justifyContent: "center",
        }}>
          Lewati jika tidak ingin membeli produk!
        </div>

        {!modals.popup && !modals.shoelace && !modals.paket && (
          <LazyMotion features={domAnimation}>
            <Link to="/">
              <m.button
                className="kembali"
                whileTap={{ scale: 0.9 }}
                transition={{ stiffness: 1000, damping: 5 }}
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
              transition={{ stiffness: 1000, damping: 5 }}
              type="button"
              onClick={handleOpenConfirmOrder}
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
    )
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="container w-full flex justify-center">
        <div className="flex flex-col items-center">

          {renderHeader()}
          {renderPaketProduct()}
          {renderParfumProduct()}
          {renderShoelaceProduct()}
          <ModalCart />
          {renderButtonConfirm()}

        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
