import React from 'react';
import InputForm from './inputForm/InputForm';
import Measurements from './measurements/Measurements'

class InputAndMeasurements extends React.Component {
   constructor(){
      super();
      this.state= {
         measurements: []
      }
   }

   insertNew = (newMeasurement) => {
      let newMeasurements = this.state.measurements.concat(newMeasurement);
    
      this.setState({
        measurements: newMeasurements
      })
    }

    updateMeasurements = (update) => {
      let updateMeasurements = this.state.measurements.filter(measurement => {
         return measurement.id !== update.id
      })
      this.setState({ measurements: updateMeasurements})
    }

   componentDidMount(){
      fetch('http://localhost:3000/measurements', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            user_id: this.props.user_id
         })
      })
      .then(response => response.json())
      .then(data => {
         this.setState({measurements:data})
      })
   }

   render(){
      return(
         <div>
            <InputForm insertNew={this.insertNew} user_id={this.props.user_id} />
            <Measurements measurements={this.state.measurements} user_id={this.props.user_id} updateMeasurements={this.updateMeasurements} />
         </div>
         
      )
   }
}


export default InputAndMeasurements;