import { useState } from 'react'
import './App.css'
const products = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 2499,
    image: 'https://via.placeholder.com/220',
  },
  {
    id: 2,
    title: 'Smart Watch',
    price: 3999,
    image: 'https://via.placeholder.com/220',
  },
  {
    id: 3,
    title: 'Bluetooth Speaker',
    price: 1799,
    image: 'https://via.placeholder.com/220',
  },
]

 function App() {
  const [cartItems, setCartItems] = useState([])
  const [searchText, setSearchText] = useState('')
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
        <button>Cart ({cartItems.length})</button>
      </header>

      <main className="product-section">
        <h2>Products</h2>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <section className="cart-section">
  <h2>Cart</h2>
  
  {cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
  cartItems.map((item, index) => (
  <div className="cart-item" key={index}>
    <span>{item.title}</span>
    <strong>₹{item.price}</strong>
    <button onClick={() => removeFromCart(index)}>Remove</button>
  </div>
))
  )}
  <h3>Total: ₹{cartTotal}</h3>
</section>
      </main>
    </div>
  )
}

export default App