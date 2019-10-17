import { createSelector } from 'reselect';

// select cart from state
const selectCart = state => state.cart;

// memoized selector
export const selectCartItems = createSelector(
  [selectCart],
  cart => {
    return cart.cartItems;
  }
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, item) => accumalatedQuantity + item.quantity,
      0
    )
);
