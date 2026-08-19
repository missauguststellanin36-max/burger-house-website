import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const initialReviews = [
  {
    id: 1,
    name: 'John Smith',
    stars: '⭐️⭐️⭐️⭐️⭐️',
    text: 'The burgers are fresh and delicious. Great service and fast delivery!'
  },
  {
    id: 2,
    name: 'Sarah Kim',
    stars: '⭐️⭐️⭐️⭐️⭐️',
    text: 'Best fast food restaurant in town. The fries are crispy and tasty.'
  },
  {
    id: 3,
    name: 'David Lee',
    stars: '⭐️⭐️⭐️⭐️⭐️',
    text: 'Amazing food and affordable prices. I highly recommend the chicken burger.'
  }
]

function Reviews() {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('reviews')
    return saved ? JSON.parse(saved) : initialReviews
  })
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: ''
  })
  const { user } = useAuth()

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  }, [reviews])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.text) {
      alert('Please fill in all fields')
      return
    }

    const newReview = {
      id: Date.now(),
      name: formData.name,
      stars: '⭐️'.repeat(formData.rating),
      text: formData.text
    }

    setReviews([newReview, ...reviews])
    setFormData({ name: '', rating: 5, text: '' })
    alert('Review added successfully!')
  }

  return (
    <>
      <section className="reviews" id="reviews">
        <h2>Customer Reviews</h2>
        <div className="review-container">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <h3>{review.name}</h3>
              <p className="stars">{review.stars}</p>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="review-form-section">
        <div className="review-form-container">
          <h2>Add Your Review</h2>
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={user ? user.name : 'Enter your name'}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <div className="rating-select">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    type="button"
                    className={`star-btn ${formData.rating >= num ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, rating: num }))}
                  >
                    ⭐️
                  </button>
                ))}
              </div>
              <p className="rating-value">{formData.rating} out of 5 stars</p>
            </div>

            <div className="form-group">
              <label htmlFor="text">Your Review:</label>
              <textarea
                id="text"
                name="text"
                placeholder="Share your experience with us..."
                rows="5"
                value={formData.text}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-submit-review">Submit Review</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Reviews
