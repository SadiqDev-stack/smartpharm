import { createContext, useEffect, useState } from "react";
import Storage from "../services/storage";

let storageData = {
  user: null,
  name: "smartpharm",
  data: {
    products: [],
    loans: [],
    invoices: [],
    patients: [],
    notifications: [],
  },
};

storageData = Storage.getItem(storageData.name)
  ? Storage.getItem(storageData.name)
  : storageData;

const StorageContext = createContext();

const StorageProvider = ({ children }) => {
  const [storage, setStorage] = useState(storageData);
  const [user, setUser] = useState(storage.user);
  const [products, setProducts] = useState(storage.products);
  const [patients, setPatients] = useState(storage.patients);
  const [loans, setLoans] = useState(storage.loans);
  const [invoices, setInvoices] = useState(storage.invoices);
  const [notifications, setNotifications] = useState(storage.notifications);
  const [unlocked, setUnlocked]  = useState(sessionStorage.getItem('unlocked') == "true");

  // saves to storage
  useEffect(() => {
    Storage.setItem(storage.name);
  }, [storage, user, products, patients, loans, invoices]);

  useEffect(() => {
    sessionStorage.setItem("unlocked", unlocked)
  }, [unlocked]);

  return (
    <StorageContext.Provider
      value={{
        storage,
        user,
        products,
        patients,
        loans,
        invoices,
        notifications,
        setUser,
        setLoans,
        setInvoices,
        setPatients,
        setProducts,
        setStorage,
        setNotifications,
        unlocked,
        setUnlocked
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export { StorageContext, StorageProvider };
