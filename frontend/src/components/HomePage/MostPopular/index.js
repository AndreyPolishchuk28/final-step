import React from 'react';
import {Link} from 'react-router-dom'

export const MostPopular = props => {
  return (
    <Link to={`/product/${props.id}`} className='most-popular-wrapper'>
      <p>{props.title}</p>
      <img className='most-popular' src={props.url}></img>
      <p>$ {props.price}</p>
    </Link>
    
  )
}