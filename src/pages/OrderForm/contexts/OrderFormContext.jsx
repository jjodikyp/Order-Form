import { createContext, useContext } from 'react';
import { useOrderForm } from '../../../hooks/useOrderForm';
import { useState } from 'react';

const OrderFormContext = createContext(null);

const OrderFormProvider = ({ children }) => {
  const {
    formik,
    modals,
    setModals,
    initialValues,
  } = useOrderForm();

  const [modalsState, setModalsState] = useState({
    parfum: false,
    tali: false,
    paket: false,
    insole: false
  });

  const values = {
    formik,
    modals: modalsState,
    setModals: setModalsState,
    initialValues,
  }

  return (
    <OrderFormContext.Provider value={values}>
      {children}
    </OrderFormContext.Provider>
  );
};

export { OrderFormContext, OrderFormProvider };