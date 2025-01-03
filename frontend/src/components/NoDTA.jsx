import React from 'react'
import image from '../assets/hmm.jpeg'

const NoDTA = () => {
  return (
    <div className='imageContainer h-100 d-flex justify-content-center' >
        <picture>
          <img src={image} className='img-fluid' alt='image' />
        </picture>
    </div>
  )
}

export default NoDTA