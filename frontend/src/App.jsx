import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'



function App() {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [searchText, setSearchText] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [orderMessage, setOrderMessage] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activePage, setActivePage] = useState('products')
  const [authMode, setAuthMode] = useState('login')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://amazon-clone-backend-kt6m.onrender.com/api/products'
      )
      setProducts(response.data)
    } catch (error) {
      console.log('Error fetching products:', error)
    }
  }

  fetchProducts()
}, [])
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      const updatedCart = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 }
        }

        return item
      })

      setCartItems(updatedCart)
      return
    }

    setCartItems([...cartItems, { ...product, quantity: 1 }])
  }

  const updateQuantity = (productId, change) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + change }
        }

        return item
      })
      .filter((item) => item.quantity > 0)

    setCartItems(updatedCart)
  }

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId)

    setCartItems(updatedCart)
  }

  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity
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
        <nav className="nav-links">
          <button
            className={activePage === 'products' ? 'active' : ''}
            onClick={() => setActivePage('products')}
          >
            Products
          </button>
          <button
            className={activePage === 'cart' ? 'active' : ''}
            onClick={() => setActivePage('cart')}
          >
            Cart
          </button>
          <button
            className={activePage === 'checkout' ? 'active' : ''}
            onClick={() => setActivePage('checkout')}
          >
            Checkout
          </button>
        </nav>
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
        <button onClick={() => setActivePage('cart')}>Cart ({cartCount})</button>
      </header>

      <main className="product-section">
        {activePage === 'products' && (
          <>
            <section className="shop-hero">
              <div>
                <p>Weekend deals</p>
                <h2>Shop everyday essentials in one place</h2>
              </div>
              <span>{filteredProducts.length} products available</span>
            </section>

            <div className="section-heading">
              <h2>Products</h2>
              <p>Search, view details, and add items to your cart.</p>
            </div>

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
          </>
        )}

        {activePage === 'cart' && (
          <section className="cart-section">
          <h2>Cart</h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <span>{item.title}</span>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <strong>{item.quantity}</strong>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <strong>Rs {item.price * item.quantity}</strong>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))
          )}

          <h3>Total: Rs {cartTotal}</h3>
          <button
            className="checkout-link"
            disabled={cartItems.length === 0}
            onClick={() => setActivePage('checkout')}
          >
            Continue to Checkout
          </button>
        </section>
        )}

        {activePage === 'checkout' && (
          <section className="checkout-page">
            <div className="checkout-summary">
              <h2>Order Summary</h2>
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div className="summary-row" key={item.id}>
                    <span>
                      {item.title} x {item.quantity}
                    </span>
                    <strong>Rs {item.price * item.quantity}</strong>
                  </div>
                ))
              )}
              <h3>Total: Rs {cartTotal}</h3>
            </div>
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
        )}
      </main>
    </div>
  )
}

export default App
