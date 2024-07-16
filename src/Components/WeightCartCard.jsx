import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/modal-slice";
import { cartAction } from "../store/cart-slice";

export default function WeightCartCard({ product }) {
  const dispatch = useDispatch();
  const [selectedWeright, setSelectedWeight] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [localQuantity, setLocalQuantity] = useState(1);
  const [selectedPieces, setSelectedPieces] = useState(0);

  const cancelweightCartHandle = () => {
    dispatch(modalActions.clearModals());
  };

  const { id, name, price } = product;

  const weightChangeHandle = (e) => {
    const { name, value } = e.target;
    setSelectedWeight(value);
    const totalAmount = value * (price / 1000);
    setTotalAmount(totalAmount);
    setTotalWeight(value);
  };

  const amountChangeHandle = (e) => {
    const { name, value } = e.target;
    setSelectedAmount(value);
    const totalWeight = (value / price) * 1000;
    setTotalWeight(totalWeight);
    setTotalAmount(value);
    console.log(value);
  };

  const pieceChangeHandle = (e) => {
    const { name, value } = e.target;
    setSelectedPieces(value)
    const pprice = product.perPiecePrice;
    const totlAmoun = parseInt(pprice) * value;

    setTotalAmount(totlAmoun)
    //setTotalAmount()
  }
  const quantiyChangeHandle = (e) => {
    const { name, value } = e.target;
    if (name === "decreaseQ" && localQuantity !== 0) {
      setLocalQuantity((prevQ) => prevQ - 1);
    }
    if (name === "increaseQ") {
      setLocalQuantity((prevQ) => prevQ + 1);
    }
  };

  const addToCartHandle = () => {
    dispatch(
      cartAction.addItemToCart({
        ...product,
        totalprice: totalAmount,
        quantity: localQuantity,
        weight: !product.fixedPrice && !product.soldByPieces ? totalWeight : false,
        pieces: !product.fixedPrice && product.soldByPieces ? selectedPieces : false
      })
    );
    /**{
        name: name,
        price: price,
        totalprice: totalAmount,
        quantity: localQuantity,
        id: id,
        customOrder: !product.fixedPrice ? true : false,
        weight:totalWeight
      } */
    dispatch(modalActions.toggleWeightModal({ id: "" }));
    dispatch(modalActions.toggleOrderPlacedModal({ id }));
  };
  return (
    <div
      className="absolute bg-gray-100 h-[95%] w-full bg-opacity-75 px-7 left-2    flex flex-col"
      style={{ gap: product.varyingweight ? "18px" : "10px" }}
    >
      <div className="flex  justify-center items-center">
        <p className="font-medium text-lg text-gray-800">{name}</p>
      </div>

      <div className="flex gap-2 justify-center items-center">
        <p className="font-semibold text-xl text-gray-800">Price Per KG</p>
        <p className="font-medium text-lg text-gray-800">{price} د.ا</p>
      </div>

      <div className=" flex flex-wrap gap-1 mx-auto justify-center items-center">
        {product.varyingweight && (
          <p className="mx-auto text-center mt-4 mb-2 text-gray-900 font-medium text-lg">
            Choose a specific Weight out of the available weights
          </p>
        )}
        {product.varyingweight &&
          product.varyingweight.map((eachweight) => {
            return (
              <button
                key={eachweight}
                onClick={weightChangeHandle}
                value={eachweight}
                className="text-green text-lg font-medium text-green-800 hover:text-gray-900"
              >
                {eachweight}
              </button>
            );
          })}
      </div>

      {!product.varyingweight && !product.soldByPieces && (
        <>
          <div className="">
            <p className="font-bold mb-1 text-gray-900">Note:</p>
            <p className="font-medium">This is a Note</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="weight" className="font-medium text-gray-800">
                Weight <small>(in grams)</small>
              </label>
              <input
                className=" p-2 outline-none"
                id="weight"
                step={500}
                type="number"
                onChange={weightChangeHandle}
                value={totalWeight}
              ></input>
            </div>
          </div>
        </>
      )}

      {/*<div className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="weight" className="font-medium text-gray-800">
            Amount
          </label>
          <input
            className=" p-2 outline-none"
            id="weight"
            step={5}
            type="number"
            onChange={amountChangeHandle}
            value={totalAmount}
          ></input>
        </div>
      </div>*/}

      {product.soldByPieces &&
        !product.fixedPrice &&
        !product.varyingWeight && (
          <>
            <div className="">
              <p className="font-bold mb-1 text-gray-900">Note:</p>
              <p className="font-medium">This is a Note</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="weight" className="font-medium text-gray-800">
                  Pieces
                </label>
                <input
                  className=" p-2 outline-none"
                  id="weight"
                  step={1}
                  type="number"
                  onChange={pieceChangeHandle}
                  value={selectedPieces}
                ></input>
              </div>
            </div>
          </>
        )}
      {!product.fixedPrice &&
        (product.varyingWeight || !product.soldByPieces) && (
          <>
            <div className="flex gap-4 justify-center items-center text-center">
              <div className="flex flex-col justify-center items-center">
                <p className="font-semibold text-lg text-gray-800">
                  Total Price
                </p>
                <p className="font-medium text-md text-gray-800">
                  {totalAmount && totalAmount.toFixed(2)} د.ا{" "}
                </p>
              </div>

              <div className="flex flex-col justify-center items-center">
                <p className="font-semibold text-lg text-gray-800">
                  Total Weight
                </p>
                <p className="font-medium text-md text-gray-800">
                  {totalWeight} Grams
                </p>
              </div>
            </div>
          </>
        )}

      {product.soldByPieces && (
        <>
          <div className="flex gap-4 justify-center items-center text-center">
            <div className="flex flex-col justify-center items-center">
              <p className="font-semibold text-lg text-gray-800">Estimated Price</p>
              <p className="font-medium text-md text-gray-800">
                {totalAmount && totalAmount.toFixed(2)} د.ا{" "}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="font-semibold text-lg text-gray-800">
                Total Pieces
              </p>
              <p className="font-medium text-md text-gray-800">
                {selectedPieces}x
              </p>
            </div>
          </div>
        </>
      )}
      <div className="w-ful flex flex-col justify-center items-center gap-2">
        <div className="flex items-center space-x-4">
          <button
            onClick={quantiyChangeHandle}
            name="decreaseQ"
            className="flex items-center justify-center w-5 h-5 bg-gray-900 text-white"
          >
            -
          </button>
          <div className="text-xl">{localQuantity}</div>
          <button
            onClick={quantiyChangeHandle}
            name="increaseQ"
            className="flex items-center justify-center w-5 h-5 bg-gray-900 text-white"
          >
            +
          </button>
        </div>
        <button
          onClick={addToCartHandle}
          className="bg-gray-900 text-white py-1 px-2 w-full rounded-md"
          disabled={selectedWeright === 0 && selectedAmount === 0 && selectedPieces === 0}
          style={{
            display:
              selectedWeright == 0 && selectedAmount == 0 && selectedPieces === 0 ? "none" : "block",
          }}
        >
          Add To Cart
        </button>
        <button
          className="bg-red-900 text-white py-1 px-2 w-full rounded-md"
          onClick={cancelweightCartHandle}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
