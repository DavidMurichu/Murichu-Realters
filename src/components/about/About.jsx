import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Our Agency Story' subtitle='Check out our company story and work process' />

            <p>Welcome to Murichu Realtors, where dreams find their homes. Established in 2020, we have been a cornerstone in the real estate market, dedicated to providing unparalleled service and expertise. Our mission is to connect people with the perfect property that fits their needs and lifestyle.</p>
            <p>Our team of experienced professionals is committed to guiding you through every step of the buying, selling, or renting process. We believe in a personalized approach, understanding that each client is unique and deserves a tailored experience.</p>
            <p>At Murichu Realtors, we pride ourselves on our deep knowledge of the market and our unwavering dedication to customer satisfaction. We leverage cutting-edge technology and marketing strategies to ensure your property gets the visibility it deserves.</p>
            <p>Join us on this journey and discover why countless clients trust Murichu Realtors for their real estate needs. Your dream home is just a step away.</p>
          </div>
          <div className='right row'>
            <img src='./immio.jpg' alt='Our Agency' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
