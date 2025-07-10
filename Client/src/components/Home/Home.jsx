import React from 'react'
import Landing from '../../assets/Landing.jpg'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import SplitText from "./SplitText";

const Home = () => {
  const navigate = useNavigate()

  const exploreTo = () => {
    navigate("/products")
  }


  return (
        <>
          <div className='container'>
            <img src={Landing} alt="" className='land-img' />
            <div className='description'>
              <h6 className='tagline'>Your Destination for Quality Finds</h6>
              <SplitText
  text="NexBuy"
  className="trending"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
/>
              <p className='welcome'>Welcome to NexBuy, where every product tells a story. From handpicked items to the latest trends!</p>
              <span className='explore' onClick={exploreTo}>EXPLORE OUR PRODUCTS</span>
            </div>
          </div>
          <div className='landing-bottom'>-</div>
        </>
  )
}

export default Home
