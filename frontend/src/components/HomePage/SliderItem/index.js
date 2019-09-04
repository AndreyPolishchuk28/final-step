import React from 'react';

const SliderItem = props => {
  return (
  

          <div >
            <div >
              <h1>{props.name}</h1>
              <p>{props.price}$</p>
              <button type="primary" shape="round">Buy</button>
              
            </div>
            <section>
              <img
                src={props.url}
                alt="img"
              />
              <span>
                Posted by <strong>Vasyl</strong>
              </span>
            </section>
          </div>
        
    
  )
}

export default SliderItem