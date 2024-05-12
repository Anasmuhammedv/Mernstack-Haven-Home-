import React from 'react'
import Allproducts from './Allproducts'
import Header from './Header'
import Footer from './Footer'

function Collection() {
  return (
    <div className='m-t-20px'>
      <Header/>
        <h1 className='card-title mb-50px'>Collection is here</h1>
        <Allproducts/>
        {/* <Footer/> */}
      
    </div>
  )
}


export default Collection