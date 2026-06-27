import { useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 2499,
    image: 'https://via.placeholder.com/220',
    description: 'Comfortable wireless headphones with long battery life.',
  },
  {
    id: 2,
    title: 'Smart Watch',
    price: 3999,
    image: 'https://via.placeholder.com/220',
    description: 'A daily smart watch for fitness, calls, and notifications.',
  },
  {
    id: 3,
    title: 'Bluetooth Speaker',
    price: 1799,
    image: 'https://via.placeholder.com/220',
    description: 'Portable speaker with clear sound for home and travel.',
  },
]

function App() {
  const [cartItems, setCartItems] = useState([])
  const [searchText, setSearchText] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [orderMessage, setOrderMessage] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [authMode, setAuthMode] = useState('login')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  const addToCart = (product) => {
    setCartItems([...cartItems, product])
  }

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((item, index) => {
      return index !== indexToRemove
    })

    setCartItems(updatedCart)
  }

  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.price
  }, 0)

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchText.toLowerCase())
  })

  const placeOrder = () => {
    if (cartItems.length === 0) {
      setOrderMessage('Add at least one product before placing an order.')
      return
    }

    if (!customerName || !deliveryAddress) {
      setOrderMessage('Please enter your name and delivery address.')
      return
    }

    setOrderMessage(`Order placed successfully for ${customerName}.`)
    setCartItems([])
    setCustomerName('')
    setDeliveryAddress('')
  }

  const handleAuthSubmit = (event) => {
    event.preventDefault()

    const displayName = authMode === 'signup' ? userName : userEmail
    setCurrentUser(displayName)
    setUserName('')
    setUserEmail('')
    setUserPassword('')
  }

  const logout = () => {
    setCurrentUser(null)
  }

  if (!currentUser) {
    return (
      <div className="auth-page">
        <section className="auth-panel">
          <div className="auth-brand">
            <h1>Amazon Clone</h1>
            <p>Sign in to shop products, manage your cart, and checkout.</p>
          </div>

          <div className="auth-tabs">
            <button
              className={authMode === 'login' ? 'active' : ''}
              onClick={() => setAuthMode('login')}
            >
              Login
            </button>
            <button
              className={authMode === 'signup' ? 'active' : ''}
              onClick={() => setAuthMode('signup')}
            >
              Signup
            </button>
          </div>

          <form className="auth-form" onSubmit={handleAuthSubmit}>
            {authMode === 'signup' && (
              <input
                type="text"
                placeholder="Full name"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={(event) => setUserPassword(event.target.value)}
              required
            />
            <button type="submit">
              {authMode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>
        </section>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="navbar">
        <h1>Amazon Clone</h1>
        <input
          type="text"
          placeholder="Search products"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        {currentUser ? (
          <div className="user-summary">
            <span>Hi, {currentUser}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <span className="guest-label">Guest</span>
        )}
        <button>Cart ({cartItems.length})</button>
      </header>

      <main className="product-section">
        <h2>Products</h2>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                onClick={() => setSelectedProduct(product)}
              />
              <h3>{product.title}</h3>
              <p>Rs {product.price}</p>
              <button
                className="details-button"
                onClick={() => setSelectedProduct(product)}
              >
                View Details
              </button>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <section className="product-detail">
            <button
              className="close-detail"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <div>
              <h2>{selectedProduct.title}</h2>
              <p>{selectedProduct.description}</p>
              <strong>Rs {selectedProduct.price}</strong>
              <button onClick={() => addToCart(selectedProduct)}>
                Add to Cart
              </button>
            </div>
          </section>
        )}

        <section className="cart-section">
          <h2>Cart</h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <span>{item.title}</span>
                <strong>Rs {item.price}</strong>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            ))
          )}

          <h3>Total: Rs {cartTotal}</h3>

          <div className="checkout-form">
            <h2>Checkout</h2>
            <input
              type="text"
              placeholder="Full name"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
            <textarea
              placeholder="Delivery address"
              value={deliveryAddress}
              onChange={(event) => setDeliveryAddress(event.target.value)}
            ></textarea>
            <button onClick={placeOrder}>Place Order</button>
            {orderMessage && <p className="order-message">{orderMessage}</p>}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
