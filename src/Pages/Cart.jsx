import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../store/cart-slice";
import { redirect, useNavigate } from "react-router-dom";
export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  console.log(cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderplaced, setorderplaced] = useState(false);

  const url = "";
  const token =
    "";

  const cartSummary = cartItems.map(
    (item) =>
      `${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(
        2
      )}`
  );
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const payload = {
    messaging_product: "whatsapp",
    to: "", //
    type: "template",
    template: {
      name: "order_confirmation",
      language: {
        code: "en",
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: `${cartSummary}`,
            },
            {
              type: "text",
              text: totalQuantity,
            },
            {
              type: "text",
              text: totalPrice,
            },
          ],
        },
      ],
    },
  };

  const sendOrder = async () => {
    const sendRequest = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
    dispatch(cartAction.resetCart());
    setorderplaced(true);
  };

  const increaseQuantityHandle = (item) => {
    console.log(item);
    dispatch(cartAction.addItemToCart({ ...item, quantity: 1 }));
  };

  const decreaseQuantityHandle = (item) => {
    dispatch(cartAction.removeItemFromCart({ ...item, quantity: 1 }));
  };

  const clearCartHandle = () => {
    dispatch(cartAction.resetCart());
  };
  return (
    <>
      {orderplaced ? (
        <div className="w-6/12 mt-12 mx-auto h-[150px] flex flex-col gap-4 justify-center items-center mb-[227px] shadow-custom-dark p-4 bg-white">
          <p className="text-xl text-gray-900 font-semibold ">
            The Order Has Been Placed
          </p>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="border border-gray-900 py-1 px-6 rounded-lg font-semibold text-md"
          >
            Confirm
          </button>
        </div>
      ) : (
        <div className="container mx-auto p-4 mb-8">
          <h2 className="text-2xl font-bold mb-4 mt-7">Shopping Cart</h2>
          <div className="overflow-x-auto overflow-y-scroll h-[200px]">
            <table className=" w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Item Name</th>
                  <th className="px-4 py-2">Price per Unit/KG</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Total Price</th>
                  <th className="px-4 py-2">Cart Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b text-center">
                    <td className="px-4 py-2">
                      {item.name} <br />
                      {`${
                        !item.fixedPrice && item.weight
                          ? `(${item.weight} grams  )`
                          : ""
                      } `}
                      {`${
                        !item.fixedPrice && item.soldByPieces
                          ? `(${item.pieces} pieces  )`
                          : ""
                      } `}
                    </td>
                    <td className="px-4 py-2">د.ا {item.price.toFixed(2)}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">
                      د.ا{" "}
                      {!item.fixedPrice &&
                        !item.soldByPieces &&
                        `${(
                          ((item.weight * item.price) / 1000) *
                          item.quantity
                        ).toFixed(2)}`}

                        {item.fixedPrice && (item.price * item.quantity).toFixed(2) }

                        {!item.fixedPrice && item.soldByPieces && ((parseInt(item.perPiecePrice) * parseInt(item.pieces)) ) *
                          item.quantity}
                    </td>
                    {
                      <td className="px-4 py-2 flex gap-2 justify-center">
                        <button
                          onClick={() => {
                            increaseQuantityHandle(item);
                          }}
                          className="w-6 h-6 bg-gray-900 text-white hover:bg-white hover:text-gray-900 hover:font-bold"
                        >
                          +
                        </button>
                        <button
                          onClick={() => {
                            decreaseQuantityHandle(item);
                          }}
                          className="w-6 h-6 bg-gray-900 text-white hover:bg-white hover:text-gray-900 hover:font-bold"
                        >
                          -
                        </button>
                      </td>
                    }
                  </tr>
                ))}
                <tr className="border-b">
                  <td className="border py-2 text-start"></td>
                  <td className="border py-2 text-start"></td>
                  <td className="border py-2 text-center font-semibold">
                    <p className="text-sm">Total Quantity: {totalItems}</p>
                  </td>
                  <td className="border py-2 text-center font-semibold">
                    <p className="text-sm">
                      Total Price: {totalAmount && totalAmount.toFixed(2)} د.ا
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-[45px] flex gap-5 mt-8">
            {cartItems.length > 0 && (
              <>
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={sendOrder}
                >
                  Place Order
                </button>
                <button
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={clearCartHandle}
                >
                  Clear Cart
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
