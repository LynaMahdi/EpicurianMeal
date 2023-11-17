import React from "react";
import FilterZ from "../components/filterZ";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../components/filter.css'

export default function PageRecette({user}){
    return(
        <>
            <Navbar user={user}/>
            <div className="block">
                <FilterZ/>
            </div>
            <Footer/>
        </>
    )
}