import React, { createContext,  useState } from "react";
import { useNavigate } from "react-router-dom";
import prodects from "../Components/Source/Prodects"

export const ShopContext = createContext();



export const ShopContextProvider = (props) => {

  const navigate = useNavigate(); 
 const [all_product] = useState(prodects);

 
const ContextValue = {
  navigate,
  all_product,
};

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
