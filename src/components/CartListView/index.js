import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const stringifiedCartList = localStorage.getItem('cartData')
      /* cart list added to local storage with the given key name */
      const parsedCartList = JSON.parse(stringifiedCartList)
      /* cart list parsed here with the method JSON.parse() */
      return (
        <ul className="cart-list">
          {parsedCartList.map(eachCartItem => (
            /* the parsed cart list is inserted into cart item component */
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
