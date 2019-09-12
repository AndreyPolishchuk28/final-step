import React from 'react';
import {Link} from 'react-router-dom'

const SliderItem = props => {
  return (
  

    <Link to={`/product/${props.id}`}>
            <div >
              <p className='guitar-name'>{props.name}</p>
              <p className='guitar-price'>$ {props.price}</p>
            <button type="primary" shape="round">
              {/* <p>New Price</p> */}
              <p>$ {Math.round(props.price /1.3)}</p>
              </button>
              
            </div>
            <section>
              <img
                src={props.url}
                alt="img"
              />
              <p className='copyRight'>
                Posted by <strong>DAN-IT Monster-Students</strong>
              </p>
            </section>
          </Link>
        
    
  )
}

export default SliderItem