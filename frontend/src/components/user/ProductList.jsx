import React from 'react'
import Comments from './Comments'

const ProductList = () => {
  return (
    <>
        <div className="container py-5">
            <div className="row">
                <h3 className='text-center'>Product List</h3>
            </div>
            <Comments/>
        </div>
      
    </>
  )
}

export default ProductList
