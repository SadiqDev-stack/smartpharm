import { StorageContext } from "../context/StorageContext";
import { useContext } from "react";

const useStorage = () => {
  return useContext(StorageContext);
};

export default useStorage;
