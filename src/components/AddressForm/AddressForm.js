import {Link} from 'react-router-dom'

import {useState} from 'react'
import './AddressForm.css' // Ensure the CSS file is in the same directory or correct the path

const AddressForm = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name) newErrors.name = 'Name is required'
    if (!form.address) newErrors.address = 'Address is required'
    if (!form.city) newErrors.city = 'City is required'
    if (!form.state) newErrors.state = 'State is required'
    if (!form.zip) newErrors.zip = 'Zip code is required'
    if (!form.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      console.log('Form submitted:', form)
      // Add your form submission logic here
    }
  }

  return (
    <div className="form-container">
      <h1>Shipping Address</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={form.state}
            onChange={handleChange}
          />
          {errors.state && <p className="error">{errors.state}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="zip">Zip Code:</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={form.zip}
            onChange={handleChange}
          />
          {errors.zip && <p className="error">{errors.zip}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Select a payment method</option>
            <option value="creditCard">Cash on delivery</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bitcoin">Bitcoin</option>
          </select>
          {errors.paymentMethod && (
            <p className="error">{errors.paymentMethod}</p>
          )}
        </div>
        <Link to="/end">
          <button type="submit">Submit</button>
        </Link>
      </form>
    </div>
  )
}

export default AddressForm
