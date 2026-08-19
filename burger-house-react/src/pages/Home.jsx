import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="hero" id="home">
        <h1>Delicious Fast Food</h1>
        <p>Fresh Burgers, Crispy Fries & Cold Drinks</p>
        <Link to="/menu" className="btn">View Menu</Link>
      </section>
    </>
  )
}

export default Home
