import React from 'react'
import { Outlet, Link, redirect, useLocation } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function CustomerRootElement() {

  return (
    <div >
      <Navbar/>
      {<Outlet/>}
      <Footer/>
    </div>
  )
}
