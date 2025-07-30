import React from 'react'
import Lottie from "lottie-react";
import loader from "../../assets/wingo/lottifile/loder.json"
const Loader = () => {
  return (
    <div className='loder-container'>
      <Lottie animationData={loader} loop={true} />
      <h4>Withdraw fast,safe and stable</h4>
    </div>
  )
}

export default Loader
