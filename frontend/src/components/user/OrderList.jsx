import React from 'react'
import Comments from './Comments'
const OrderList = () => {
  return (
    <>
        <div className="container py-5">
            <div className="row">
                <h3 className='text-center'>Order List</h3>
            </div>
            <Comments/>
        </div>
    </>
  )
}

export default OrderList