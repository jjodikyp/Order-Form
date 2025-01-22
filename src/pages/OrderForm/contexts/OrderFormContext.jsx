import { createContext, useContext } from 'react';
import { useOrderForm } from '../../../hooks/useOrderForm';

const OrderFormContext = createContext(null);

const OrderFormProvider = ({ children }) => {
  const {
    formik,
    modals,
    setModals,
    initialValues,
  } = useOrderForm();

  const values = {
    formik,
    modals,
    setModals,
    initialValues,
  }

  return (
    <OrderFormContext.Provider value={values}>
      {children}
    </OrderFormContext.Provider>
  );
};

export { OrderFormContext, OrderFormProvider };