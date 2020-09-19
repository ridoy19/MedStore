import React, {useEffect, useState} from 'react';
import { getBrainTreeClientToken } from '../braintree/braintree';
import Axios from 'axios'
import Cart from './Cart';
import DropIn from 'braintree-web-drop-in-react';


const Checkout = (props) => {
  console.log(props.dataItem)
  const [paymentType, setPaymentType] = useState('Cash on delivery');
  const handlePaymentMethodChange = (e) => {
    setPaymentType(e.target.value)
  }

  

  console.log(paymentType)
  return (
    <React.Fragment>
      <div className="row">
        <div className="col">              
          <h3>Billing Address</h3>
                <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
                <input className="form-control" type="text" id="fname" name="firstname" placeholder="John M. Doe"/>
                <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
                <input className="form-control" type="text" id="email" name="email" placeholder="john@example.com"/>
                <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
                <input className="form-control" type="text" id="adr" name="address" placeholder="542 W. 15th Street"/>
                <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
                <input className="form-control" type="text" id="city" name="city" placeholder="New York"/>
                <label htmlFor="state">State</label>
                <input className="form-control" type="text" id="state" name="state" placeholder="NY"/>
                <label htmlFor="zip">Zip</label>
                <input className="form-control" type="text" id="zip" name="zip" placeholder="10001"/>        
        
                <label htmlFor="payment"><i className="fa fa-money"></i> Choose payment type</label>

              <select className="form-control" onChange={e => handlePaymentMethodChange(e)}>
                <option value="cash on delivery">Cash on delivery</option>
                <option value="card">Card</option>
                <option value="bKash">bKash</option>
              </select>
        </div>
        <div className="col">
          {
            // paymentType === 'card' ? <div>{showDropIn()}</div> : null
          }
        </div>
      </div>
    </React.Fragment>
    )
}


export default Checkout;