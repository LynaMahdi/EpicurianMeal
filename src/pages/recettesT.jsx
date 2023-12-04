// PageRecette.js

import React, { useEffect } from "react";
import FilterZ from "../components/filterZ";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../components/filter.css';
import { useHistory } from "react-router-dom";




export default function PageRecette({ user, updateUser }) {
    const history = useHistory();
    
    const checkSession = () => {
        // Retrieve the stored value from sessionStorage
        const userEmail = sessionStorage.getItem('userEmail');
        console.log(userEmail)
    
        if (userEmail==null) {
          history.push('/connexion')
        } 
      };
      
      useEffect(() => {
        checkSession();
      }, []);
      

    return (
        <>
            <Navbar user={user} updateUser={updateUser} />
            <div className="block">
                <FilterZ />
            </div>
            <Footer />
        </>
    );
}
