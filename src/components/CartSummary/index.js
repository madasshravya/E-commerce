import {Link} from 'react-router-dom'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalPrice = cartList.reduce(
        (total, each) => total + each.price * each.quantity,
        0,
      )
      return (
        <div className="summary-container">
          <h1 className="summary-head">
            Order Total :{' '}
            <span className="summary-price">Rs {totalPrice} /-</span>
          </h1>
          <p className="summary-para">{cartList.length} items in cart</p>
          <Link to="/address">
            <button className="summary-button" type="button">
              checkout
            </button>
          </Link>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
