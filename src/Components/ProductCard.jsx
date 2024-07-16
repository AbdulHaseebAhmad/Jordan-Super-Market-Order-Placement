import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../store/cart-slice";
import { modalActions } from "../store/modal-slice";
import WeightCartCard from "./WeightCartCard";
import { FaCheck } from "react-icons/fa6";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  //console.log(cartItems);

  //console.log(product);
  const isAddedToCart =
    cartItems &&
    cartItems.find((eachProduct) => {
      return eachProduct.name == product.name;
    })
      ? true
      : false;
  console.log(isAddedToCart);
  const itemQuantityInCart =
    isAddedToCart &&
    cartItems.find((eachProduct) => {
      return eachProduct.id === product.id;
    });
  console.log(itemQuantityInCart);
  const addProductToCartHandle = () => {
    dispatch(cartAction.addItemToCart(product));
  };

  const toggleWeightModal = (id) => {
    dispatch(modalActions.toggleWeightModal({ id }));
    //dispatch(modalActions.toggleOrderPlacedModal({ id }));
  };

  const isWeightModal = useSelector((state) => state.modal.weightmodal);
  const weightmodalid = useSelector((state) => state.modal.weightmodalid);
  const isorderplaced = useSelector((state) => state.modal.orderplacedmodal);
  console.log(cartItems);

  const totalQuant = cartItems
    .filter((eachProduct) => {
      return eachProduct.id === product.id;
    })
    .map((eachItem) => {
      return parseInt(eachItem.quantity);
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  useEffect(() => {
    if (isorderplaced) {
      setTimeout(() => {
        dispatch(modalActions.clearModals());
      }, 500);
    }
  }, [isorderplaced, weightmodalid]);
  return (
    <div className="relative bg-white p-4 shadow rounded flex flex-col items-end">
      {isAddedToCart && (
        <span className="absolute left-2 bg-white px-2 text-gray-900 font-semibold">
          In Cart : {totalQuant}{" "}
        </span>
      )}
      {isorderplaced && weightmodalid === product.id && (
        <div className="absolute top-[50%] flex w-[90%] justify-center items-center gap-2 bg-orange-300 p-2">
          <FaCheck />
          <p className="font-semibold">Order Placed</p>
        </div>
      )}
      <div className="absolute bg-gray-900 px-2 text-white ">
        {(product.fresh && <p>Fresh</p>) || (product.frozen && <p>Frozen</p>)}
      </div>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-50 object-cover mb-4 rounded mt-6"
      />
      <h2 className="text-lg font-bold mb-2 text-left ">{product.name}</h2>
      <div className="w-full flex justify-between items-center mt-auto py-4">
        {product.fixedPrice && !product.soldByPieces && !product.varyingWeight && (
          <button
            onClick={addProductToCartHandle}
            className="text-gray-800 font-semibold border border-gray-800 px-4 py-1 rounded hover:bg-gray-800 hover:text-white "
          >
            Add to Cart
          </button>
        ) }{!product.fixedPrice && (product.varyingWeight || !product.varyingWeight) && !product.soldByPieces && (
          <button
            onClick={() => {
              toggleWeightModal(product.id);
            }}
            className="text-gray-800 font-semibold border border-gray-800 px-4 py-1 rounded hover:bg-gray-800 hover:text-white "
          >
            Buy by Weight
          </button>
        )}
        {product.soldByPieces && !product.fixedPrice && !product.varyingWeight && (
          <button
            onClick={() => {
              toggleWeightModal(product.id);
            }}
            className="text-gray-800 font-semibold border border-gray-800 px-4 py-1 rounded hover:bg-gray-800 hover:text-white "
          >
            Buy by Pieces
          </button>
        )}
        <span className="text-xl font-semibold">{product.price} د.ا</span>
      </div>
      {isWeightModal && product.id === weightmodalid && (
        <WeightCartCard product={product} />
      )}
    </div>
  );
};

export default ProductCard;
