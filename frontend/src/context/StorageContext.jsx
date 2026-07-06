// frontend/src/context/StorageContext.jsx
import { createContext, useEffect, useState } from "react";
import Storage from "../services/storage";

let storageData = {
  name: "smartpharm",
  user: null,
  data: {
    products: [],
    loans: [],
    invoices: [],
    patients: [],
    notifications: [],
    sync: []
  },
};

// Load existing storage or use default
const savedStorage = Storage.getItem(storageData.name);
storageData = savedStorage ? savedStorage : storageData;

const StorageContext = createContext();

const StorageProvider = ({ children }) => {
  const [storage, setStorage] = useState(storageData);
  const [user, setUser] = useState(storageData.user);
  const [products, setProducts] = useState(storageData.data.products);
  const [patients, setPatients] = useState(storageData.data.patients);
  const [loans, setLoans] = useState(storageData.data.loans);
  const [invoices, setInvoices] = useState(storageData.data.invoices);
  const [notifications, setNotifications] = useState(storageData.data.notifications);
  const [sync, setSync] = useState(storageData.data.sync);
  const [unlocked, setUnlocked] = useState(sessionStorage.getItem('unlocked') === "true");

  // Save to localStorage whenever data changes
  useEffect(() => {
    const newStorage = {
      name: storage.name,
      user: user,
      data: {
        products,
        loans,
        invoices,
        patients,
        notifications,
        sync
      }
    };
    Storage.setItem(storage.name, newStorage);
  }, [user, products, patients, loans, invoices, notifications, sync, storage.name]);

  // Save unlocked state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("unlocked", unlocked);
  }, [unlocked]);

  // Utility functions for products
  const addProduct = (product) => {
    const newProduct = { ...product, id: product.id || `prod_${Date.now()}` };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (productId, updates) => {
    setProducts(products.map(p => 
      (p.id === productId || p._id === productId) 
        ? { ...p, ...updates, updatedAt: new Date().toISOString() } 
        : p
    ));
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId && p._id !== productId));
  };

  const getProduct = (productId) => {
    return products.find(p => p.id === productId || p._id === productId);
  };

  // Utility functions for patients
  const addPatient = (patient) => {
    const newPatient = { ...patient, id: patient.id || `pat_${Date.now()}` };
    setPatients([...patients, newPatient]);
    return newPatient;
  };

  const updatePatient = (patientId, updates) => {
    setPatients(patients.map(p => 
      (p.id === patientId || p._id === patientId) 
        ? { ...p, ...updates, updatedAt: new Date().toISOString() } 
        : p
    ));
  };

  const deletePatient = (patientId) => {
    setPatients(patients.filter(p => p.id !== patientId && p._id !== patientId));
  };

  const getPatient = (patientId) => {
    return patients.find(p => p.id === patientId || p._id === patientId);
  };

  // Utility functions for loans
  const addLoan = (loan) => {
    const newLoan = { ...loan, id: loan.id || `loan_${Date.now()}` };
    setLoans([...loans, newLoan]);
    return newLoan;
  };

  const updateLoan = (loanId, updates) => {
    setLoans(loans.map(l => 
      (l.id === loanId || l._id === loanId) 
        ? { ...l, ...updates, updatedAt: new Date().toISOString() } 
        : l
    ));
  };

  const deleteLoan = (loanId) => {
    setLoans(loans.filter(l => l.id !== loanId && l._id !== loanId));
  };

  const getLoan = (loanId) => {
    return loans.find(l => l.id === loanId || l._id === loanId);
  };

  // Utility functions for invoices
  const addInvoice = (invoice) => {
    const newInvoice = { ...invoice, id: invoice.id || `inv_${Date.now()}` };
    setInvoices([...invoices, newInvoice]);
    return newInvoice;
  };

  const updateInvoice = (invoiceId, updates) => {
    setInvoices(invoices.map(i => 
      (i.id === invoiceId || i._id === invoiceId) 
        ? { ...i, ...updates, updatedAt: new Date().toISOString() } 
        : i
    ));
  };

  const deleteInvoice = (invoiceId) => {
    setInvoices(invoices.filter(i => i.id !== invoiceId && i._id !== invoiceId));
  };

  const getInvoice = (invoiceId) => {
    return invoices.find(i => i.id === invoiceId || i._id === invoiceId);
  };

  // Utility functions for notifications
  const addNotification = (notification) => {
    const newNotification = { 
      ...notification, 
      id: `notif_${Date.now()}`,
      seen: false,
      createdAt: new Date().toISOString()
    };
    setNotifications([newNotification, ...notifications]);
    return newNotification;
  };

  const markNotificationSeen = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, seen: true } : n
    ));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  // Sync queue utilities
  const addToSync = (syncItem) => {
    const newSyncItem = {
      ...syncItem,
      id: `sync_${Date.now()}`,
      status: 'pending',
      retries: 0,
      createdAt: new Date().toISOString()
    };
    setSync([...sync, newSyncItem]);
    return newSyncItem;
  };

  const updateSyncItem = (syncId, updates) => {
    setSync(sync.map(s => s.id === syncId ? { ...s, ...updates } : s));
  };

  const removeFromSync = (syncId) => {
    setSync(sync.filter(s => s.id !== syncId));
  };

  const getPendingSync = () => {
    return sync.filter(s => s.status === 'pending');
  };

  // Clear all data (logout)
  const clearAllData = () => {
    setUser(null);
    setProducts([]);
    setPatients([]);
    setLoans([]);
    setInvoices([]);
    setNotifications([]);
    setSync([]);
    setUnlocked(false);
  };

  // Export/Import data
  const exportData = () => {
    return {
      user,
      data: {
        products,
        patients,
        loans,
        invoices,
        notifications,
        sync
      }
    };
  };

  const importData = (data) => {
    if (data.user) setUser(data.user);
    if (data.data) {
      if (data.data.products) setProducts(data.data.products);
      if (data.data.patients) setPatients(data.data.patients);
      if (data.data.loans) setLoans(data.data.loans);
      if (data.data.invoices) setInvoices(data.data.invoices);
      if (data.data.notifications) setNotifications(data.data.notifications);
      if (data.data.sync) setSync(data.data.sync);
    }
  };

  return (
    <StorageContext.Provider
      value={{
        // State
        storage,
        user,
        products,
        patients,
        loans,
        invoices,
        notifications,
        sync,
        unlocked,
        
        // Setters
        setUser,
        setProducts,
        setPatients,
        setLoans,
        setInvoices,
        setNotifications,
        setSync,
        setStorage,
        setUnlocked,
        
        // Product utilities
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        
        // Patient utilities
        addPatient,
        updatePatient,
        deletePatient,
        getPatient,
        
        // Loan utilities
        addLoan,
        updateLoan,
        deleteLoan,
        getLoan,
        
        // Invoice utilities
        addInvoice,
        updateInvoice,
        deleteInvoice,
        getInvoice,
        
        // Notification utilities
        addNotification,
        markNotificationSeen,
        deleteNotification,
        
        // Sync utilities
        addToSync,
        updateSyncItem,
        removeFromSync,
        getPendingSync,
        
        // General utilities
        clearAllData,
        exportData,
        importData
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export { StorageContext, StorageProvider };