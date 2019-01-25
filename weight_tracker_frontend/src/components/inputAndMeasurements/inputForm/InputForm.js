import React from 'react';
import './InputForm.css'

class InputForm extends React.Component {
   constructor () {
      super()
      this.state = {
         date: '',
         value: ''
      }
   }

   onDateChange = (event) => {
      this.setState({date: event.target.value})
   }

   onWeightChange = (event) => {
      this.setState({value: event.target.value})
   }

   formValidation = () => {
      let { date, value } = this.state;
      if(date === '' || value === ''){
         return false;
      }
      return true;
   }

   newMeasurement = () => {
      if(this.formValidation()){
      fetch('http://localhost:3000/add', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            value: this.state.value,
            date: this.state.date,
            user_id: this.props.user_id
         })
      })
      .then(response => response.json())
      .then(data => {
         this.props.insertNew(data)
      })
      }
   }

   render () {
      return(

         <div className="center">

            <div className='wrapp'>
   
               <div className="input">
      
                  <label htmlFor="date"><b>Date :</b></label>
                  <input type="date" name="date" onChange={this.onDateChange} />
               
                  <label htmlFor="weight"><b>Weight :</b></label>
                  <input type="number" name="weight" placeholder='Weight (kg)' onChange={this.onWeightChange}/>

                  <button onClick={this.newMeasurement}>ADD</button>

               </div>
   
            </div>

         </div>
         
      )
   }
}

export default InputForm;