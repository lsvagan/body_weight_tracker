import React from 'react';
import trash from './trash.png';
import './Delete.css';

const Delete = ({id, deleteMeasurement}) => {
   return (
      
      <img onClick={()=> deleteMeasurement(id)}className='trash' src={trash} alt="trash"/>
    
   )
}

export default Delete;