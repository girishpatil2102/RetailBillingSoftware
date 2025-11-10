import { createContext, useEffect } from "react";
import { fetchCategories } from "../Service/CategoryService";
import { useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

   const [categories, setCategories] = useState([]);

   useEffect(() => {
      async function loadData() {
         try {
            const response = await fetchCategories();
            setCategories(response.data);
         } catch (error) {
            console.error("Error fetching categories:", error);
         }
      }

      loadData();
   }, []);


   const contextValue = {
      categories,
      setCategories
   }

   return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>;

}
