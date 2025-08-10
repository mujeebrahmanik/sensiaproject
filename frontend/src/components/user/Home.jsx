import React from 'react'
import Cards from './Cards'

const Home = () => {
  return (
    <>
      <div className="container py-5">
            <div className="row">
                <h3 className='text-center mb-5'>Home</h3>

            </div>
            <div className="row">
              <Cards name='Products' url='/products'/>
              <Cards name='Marketing' url='/marketing'/>
              <Cards name='Orders' url='/orders'/>
              <Cards name='Media Plans' url='/media_plans'/>
              <Cards name='Offers' url='/offer'/>
              <Cards name='Clients' url='/clients'/>
              <Cards name='Suppliers' url='/suppliers'/>
              <Cards name='Customer Support' url='/customer_support'/>
              <Cards name='Sales Report' url='/sales_report'/>
              <Cards name='Finance Accounting' url='/finance_accounting'/>


            </div>
            
        </div>
    </>
  )
}

export default Home
