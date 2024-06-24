import {useHistory, Link} from 'react-router-dom'
import './Endpage.css'

import newLogo from '../../assets/images/orderplaced.webp'

const Endpage = () => {
  const history = useHistory()

  const handleContinueShopping = () => {
    history.push('/')
  }

  return (
    <div className="endpage-container">
      <h1>Order Placed Successfully!</h1>
      <img src={newLogo} alt="Order Placed" className="order-placed-image" />
      <Link to="/products">
        <button
          type="button"
          onClick={handleContinueShopping}
          className="continue-shopping-button container"
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  )
}

export default Endpage
