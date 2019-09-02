import React from 'react';

export const MostPopular = (props) => {
  return (
    <div className='most-popular-wrapper'>
      <p>{props.title}</p>
      <img className='most-popular' src={props.url}></img>
    </div>
    
  )
}