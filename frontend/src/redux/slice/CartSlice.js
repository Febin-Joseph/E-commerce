import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0, itemCount: 0 },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (!existing) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        existing.quantity += 1;
      }
      state.itemCount += 1;
      state.total += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const idx = state.items.findIndex(i => i.id === action.payload);
      if (idx !== -1) {
        state.itemCount -= state.items[idx].quantity;
        state.total -= state.items[idx].price * state.items[idx].quantity;
        state.items.splice(idx, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        const quantityDiff = quantity - item.quantity;
        item.quantity = quantity;
        state.itemCount += quantityDiff;
        state.total += item.price * quantityDiff;
      }
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;