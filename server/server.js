const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
const products = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 2499,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
    description: 'Comfortable wireless headphones with long battery life.',
  },
  {
    id: 2,
    title: 'Smart Watch',
    price: 3999,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
    description: 'A daily smart watch for fitness, calls, and notifications.',
  },
  {
    id: 3,
    title: 'Bluetooth Speaker',
    price: 1799,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80',
    description: 'Portable speaker with clear sound for home and travel.',
  },
]
app.get('/', (req, res) => {
  res.send('Backend is running')
})
app.get('/api/products', (req, res) => {
  res.json(products)
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})