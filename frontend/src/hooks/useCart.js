import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../redux/slice/CartSlice';

export default function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  return {
    cart,
    add: (product) => dispatch(addToCart(product)),
    remove: (id) => dispatch(removeFromCart(id)),
    updateQuantity: (id, quantity) => dispatch(updateQuantity({ id, quantity }))
  };
}