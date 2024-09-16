import { createContext, useContext, useState, useEffect } from "react";
import LoadingSpinner from "../../Loader";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false); // Added state to handle delayed spinner display

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setShowSpinner(true); // Show spinner after delay
      }, 300); // Delay in milliseconds
    } else {
      setShowSpinner(false); // Hide spinner immediately if loading is set to false
    }

    return () => clearTimeout(timer); // Clean up the timer on unmount or when loading changes
  }, [loading]);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {showSpinner ? <LoadingSpinner /> : children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
