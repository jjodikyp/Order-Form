import { LazyMotion, m, domAnimation } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { OrderFormContext } from '../contexts/OrderFormContext';

export const ModalPickupTime = () => {
  const { modals, setModals } = useContext(OrderFormContext);

  useEffect(() => {
    // Set timeout untuk menampilkan modal setelah 5 detik
    const timer = setTimeout(() => {
      // Cek apakah modal sudah pernah ditampilkan sebelumnya
      const hasShownModal = modals.showPickupTimePopup;
      if (!hasShownModal) {
        setModals({
          ...modals,
          pickupTime: true
        });
      }
    }, 5000); // 5000ms = 5 detik

    setModals({
      ...modals,
      showPickupTimePopup: true
    });

    // Cleanup timer saat component unmount
    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setModals({
      ...modals,
      pickupTime: false
    });
  };

  if (!modals.pickupTime) return null;

  return (
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
  );
};