import React from 'react'
import { Link } from 'react-router-dom'

const Cards = (props) => {
  return (
    <>
         <div className="col-md-3 mb-3">
                    <div className="card text-center py-3">
                        <h5>{props.name}</h5>
                        <Link to={props.url}><button className='btn btn-sm btn-success mt-3' >view</button></Link>
                    </div>
        </div>
    </>
  )
}

export default Cards
