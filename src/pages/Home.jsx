import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section
        className="hero"
        id="home"
        style={{ '--hero-image': `url("${import.meta.env.BASE_URL}images/burger.jpg")` }}
      >
        <h1>Delicious Fast Food</h1>
        <p>Fresh Burgers, Crispy Fries & Cold Drinks</p>
        <Link to="/menu" className="btn">View Menu</Link>
      </section>
    </>
  )
}

export default Home
