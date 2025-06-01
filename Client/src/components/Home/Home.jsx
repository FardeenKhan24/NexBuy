import React from 'react'
import Landing from '../../assets/Landing.jpg'
import { useNavigate } from 'react-router-dom'
import './Home.css'

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
              <h2 className='trending'>NexBuy</h2>
              <p className='welcome'>Welcome to NexBuy, where every product tells a story. From handpicked items to the latest trends!</p>
              <span className='explore' onClick={exploreTo}>EXPLORE OUR PRODUCTS</span>
            </div>
          </div>
          <div className='landing-bottom'>-</div>
        </>
  )
}

export default Home
