import { createSlice } from "@reduxjs/toolkit";
import { parse } from "postcss";

const initialCartState = {
  totalItems: 0,
  cartItems: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      console.log(JSON.stringify(action.payload));
      const newItem = action.payload;

      if (state.totalItems === 0) {
        state.cartItems.push(newItem);

        if (!newItem.fixedPrice && !newItem.soldByPieces) {
          //console.log(JSON.stringify(action.payload));

          state.totalAmount +=
            ((parseInt(newItem.price) * parseInt(newItem.weight)) / 1000) *
            newItem.quantity;
          state.totalItems += parseInt(newItem.quantity);
        }
        if (!newItem.fixedPrice && newItem.soldByPieces) {
          state.totalAmount +=
            parseInt(newItem.perPiecePrice) *
            parseInt(newItem.pieces) *
            newItem.quantity;
          state.totalItems += parseInt(newItem.quantity);
        }
        if (newItem.fixedPrice) {
          state.totalAmount += parseInt(newItem.price);
          state.totalItems += parseInt(newItem.quantity);
        }
      } else {
        const isNotFixedPriceItem = !newItem.fixedPrice;
        const isFixedPrice = newItem.fixedPrice;
        if (isNotFixedPriceItem) {
          if (!newItem.soldByPieces) {
            const existingItem = state.cartItems
              .filter((eachItem) => {
                return eachItem.id === newItem.id;
              })
              .find((eachItem) => {
                return eachItem.weight === newItem.weight;
              });
            if (existingItem) {
              existingItem.quantity += parseInt(newItem.quantity);
              state.totalItems += parseInt(newItem.quantity);
              state.totalAmount +=
                ((parseInt(newItem.price) * parseInt(newItem.weight)) / 1000) *
                newItem.quantity;
            } else {
              state.cartItems.push(newItem);
              state.totalAmount +=
                ((parseInt(newItem.price) * parseInt(newItem.weight)) / 1000) *
                newItem.quantity;
              state.totalItems += parseInt(newItem.quantity);
            }
          }
          if (newItem.soldByPieces) {
            const existingItem = state.cartItems
              .filter((eachItem) => {
                return eachItem.id === newItem.id;
              })
              .find((eachItem) => {
                return eachItem.pieces === newItem.pieces;
              });
            if (existingItem) {
              existingItem.quantity += parseInt(newItem.quantity);
              state.totalItems += parseInt(newItem.quantity);
              state.totalAmount +=
                parseInt(newItem.perPiecePrice) *
                parseInt(newItem.pieces) *
                newItem.quantity;
            } else {
              state.cartItems.push(newItem);
              state.totalAmount +=
                parseInt(newItem.perPiecePrice) *
                parseInt(newItem.pieces) *
                newItem.quantity;
              state.totalItems += parseInt(newItem.quantity);
            }
          }
        } else if (isFixedPrice) {
          const existingItem = state.cartItems.find((eachItem) => {
            return eachItem.id === newItem.id;
          });
          if (existingItem) {
            existingItem.quantity++;
            state.totalAmount += parseInt(newItem.price);
            state.totalItems++;
          } else {
            state.cartItems.push(newItem);

            state.totalAmount += parseInt(newItem.price);
            state.totalItems += parseInt(newItem.quantity);
          }
        }
      }
    },
    removeItemFromCart(state, action) {
      const itemToRemove = action.payload;

      if (state.totalItems > 0) {
        const isNotFixedPriceItem = !itemToRemove.fixedPrice;
        const isFixedPrice = itemToRemove.fixedPrice;

        if (isNotFixedPriceItem) {
          if (!itemToRemove.soldByPieces) {
            const existingItem = state.cartItems
              .filter((eachItem) => {
                return eachItem.id === itemToRemove.id;
              })
              .find((eachItem) => {
                return eachItem.weight === itemToRemove.weight;
              });

            if (existingItem) {
              if (existingItem.quantity > 1) {
                existingItem.quantity -= parseInt(itemToRemove.quantity);
                state.totalItems -= parseInt(itemToRemove.quantity);
                state.totalAmount -=
                  ((parseInt(existingItem.price) *
                    parseInt(existingItem.weight)) /
                    1000) *
                  itemToRemove.quantity;
              } else {
                state.cartItems = state.cartItems.filter(
                  (eachItem) =>
                    eachItem.id !== itemToRemove.id ||
                    eachItem.weight !== itemToRemove.weight
                );
                state.totalItems -= parseInt(itemToRemove.quantity);
                state.totalAmount -=
                  ((parseInt(existingItem.price) *
                    parseInt(existingItem.weight)) /
                    1000) *
                  itemToRemove.quantity;
              }
            }
          }
          if (itemToRemove.soldByPieces) {
            const existingItem = state.cartItems
              .filter((eachItem) => {
                return eachItem.id === itemToRemove.id;
              })
              .find((eachItem) => {
                return eachItem.pieces === itemToRemove.pieces;
              });

            if (existingItem) {
              if (existingItem.quantity > 1) {
                existingItem.quantity -= parseInt(itemToRemove.quantity);
                state.totalItems -= parseInt(itemToRemove.quantity);
                state.totalAmount -=
                  parseInt(existingItem.perPiecePrice) *
                  parseInt(existingItem.pieces) *
                  itemToRemove.quantity;
              } else {
                state.cartItems = state.cartItems.filter(
                  (eachItem) =>
                    eachItem.id !== itemToRemove.id ||
                    eachItem.pieces !== itemToRemove.pieces
                );
                state.totalItems -= parseInt(itemToRemove.quantity);
                state.totalAmount -=
                  parseInt(existingItem.perPiecePrice) *
                  parseInt(existingItem.pieces) *
                  itemToRemove.quantity;
              }
            }
          }
        } else if (isFixedPrice) {
          const existingItem = state.cartItems.find((eachItem) => {
            return eachItem.id === itemToRemove.id;
          });

          if (existingItem) {
            if (existingItem.quantity > 1) {
              existingItem.quantity--;
              state.totalItems--;
              state.totalAmount -= parseInt(existingItem.price);
            } else {
              state.cartItems = state.cartItems.filter(
                (eachItem) => eachItem.id !== itemToRemove.id
              );
              state.totalItems--;
              state.totalAmount -= parseInt(existingItem.price);
            }
          }
        }
      }
    },
    resetCart(state) {
      state.totalItems = 0;
      state.totalAmount = 0;
      state.cartItems = [];
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;

/**
 *  state.totalItems += newItem.quantity ? newItem.quantity : 1;

      if (state.cartItems.length === 0) {
        if (newItem.customOrder) {
          state.totalAmount +=
            parseInt(newItem.totalprice) * parseInt(newItem.quantity);
        } else {
          state.totalAmount += parseInt(newItem.price);
        }
        state.cartItems.push(newItem);
      } else {
        const existingItem = state.cartItems.find(
          (eachItem) => eachItem.id === newItem.id
        );

        if (existingItem) {
          if (newItem.customOrder) {
            if (existingItem.weight === newItem.weight) {
              existingItem.quantity += parseInt(newItem.quantity);
              state.totalAmount +=
                parseInt(newItem.totalprice) * parseInt(newItem.quantity);
            } else {
              state.cartItems.push(newItem);
              state.totalAmount +=
                parseInt(newItem.totalprice) * parseInt(newItem.quantity);
            }
          } else {
            existingItem.quantity += parseInt(newItem.quantity);
            state.totalAmount += parseInt(newItem.price);
          }
        } else {
          if (newItem.customOrder) {
            state.cartItems.push(newItem);
            state.totalAmount +=
              parseInt(newItem.totalprice) * parseInt(newItem.quantity);
          } else {
            state.cartItems.push(newItem);
            state.totalAmount += parseInt(newItem.price);
          }
        }
      }
 */
