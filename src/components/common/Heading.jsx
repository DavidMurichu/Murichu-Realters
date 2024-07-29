import React from "react"

const Heading = ({ title, subtitle }) => {
  return (
    <>
    <div className='heading'>
      <h5>{title}</h5>
      <p>{subtitle}</p>
    </div>
  </>
  )
}

export default Heading
