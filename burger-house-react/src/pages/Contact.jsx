import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Message sent! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <section className="contact" id="contact">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input 
            type="email" 
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input 
            type="tel" 
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea 
            rows="5" 
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
        <div className="contact-info">
          <div className="info-item">
            <h3>Phone</h3>
            <p>+ (885) 123-4567</p>
          </div>
          <div className="info-item">
            <h3>Email</h3>
            <p><a href="mailto:info@burgerhouse.com">info@burgerhouse.com</a></p>
          </div>
          <div className="info-item">
            <h3>Address</h3>
            <p>123 Main Street, City, State 12345</p>
          </div>
          <div className="info-item">
            <h3>Follow Us</h3>
            <p>
              <a href="https://facebook.com/burgerhouse" target="_blank" rel="noreferrer">Facebook</a> | 
              <a href="https://instagram.com/burgerhouse" target="_blank" rel="noreferrer">Instagram</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
