import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';

const Error404 = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
      <Player
        autoplay
        loop
        src="https://assets5.lottiefiles.com/packages/lf20_j3gumpgp.json"
        style={{ height: '50vh', width: 'auto' }}
      >
      </Player>
    </div>
  )
}

export default Error404
