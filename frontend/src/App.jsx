import { useState } from 'react'
import './App.css'
const addToCart = (product) => {
  setCartItems([...cartItems, product])
}
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
  const addToCart = (product) => {
  setCartItems([...cartItems, product])
}
  return (
    <div className="app">
      <header className="navbar">
        <h1>Amazon Clone</h1>
        <input type="text" placeholder="Search products" />
        <button>Cart ({cartItems.length})</button>
      </header>

      <main className="product-section">
        <h2>Products</h2>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App