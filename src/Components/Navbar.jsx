import React from "react";
import ShoppingIcon from "../assets/shoppinCart.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/terts.png";
const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.totalItems);
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex gap-4 items-center">
          <Link to="cart">
            <img
              src={ShoppingIcon}
              alt="shopping-cart-icon"
              className="w-8 h-8"
            />
          </Link>
          <div className="w-8 h-8 rounded-x text-white flex items-center font-semibold text-2xl">
            {cartItems}
          </div>
        </div>
        <Link to="/">
          <div className="flex  items-center gap-4 text-white text-2xl font-bold text-center md:text-left">
            <p>3</p>
            <img src={logo} alt="Logo" className="h-[65px] w-[80px]" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
