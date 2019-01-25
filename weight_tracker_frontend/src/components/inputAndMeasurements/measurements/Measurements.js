import React from 'react';
import './Measurements.css';
import Delete from '../../delete/Delete'

class Measurements extends React.Component {
   
   deleteMeasurement = (id) => {
      /*console.log(id);*/
      fetch('http://localhost:3000/remove', {
         method: 'DELETE',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            id: id,
            user_id: this.props.user_id
         })
      })
      .then(response => response.json())
      .then(data => {
         this.props.updateMeasurements(data)
      })
   }

   render(){
      if(this.props.measurements.length){
         let usersList = this.props.measurements.map(measurement => {
            return(
               <div className='measurement' key={measurement.id}>
                  <p>
                     {`Date: ${measurement.date} your body weight: ${measurement.value}kg.`}
                     <Delete id={measurement.id} deleteMeasurement={this.deleteMeasurement}/>
                  </p>
               </div>
            )
         })
        
         return(
            <div className="mesurementsList">
               {usersList}
            </div>  
         )
      }else{
         return(
            <div className="mesurementsList">
               {'Enter date and your weight, then click add button'}
            </div> 
         )  
      }
      
   }
   
}

export default Measurements;