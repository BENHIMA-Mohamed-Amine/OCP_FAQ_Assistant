import { createContext, useEffect, useState } from "react";

const ConvIdContext = createContext();

export const ConvIdProvider = ({ children }) => {
  const [convIdContext, setConvIdContext] = useState(() => {
    const storedConvId = localStorage.getItem("convIdContext");
    return storedConvId ? JSON.parse(storedConvId) : null;
  });

  useEffect(() => {
    localStorage.setItem("convIdContext", JSON.parse(convIdContext));
  }, [convIdContext]);

  return (
    <ConvIdContext.Provider value={{ convIdContext, setConvIdContext }}>
      {children}
    </ConvIdContext.Provider>
  );
};

export default ConvIdContext;
