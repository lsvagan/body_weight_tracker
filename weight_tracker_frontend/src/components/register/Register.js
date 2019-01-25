import React from 'react';
import './Register.css';

class Register extends React.Component{
   constructor(){
      super()
      this.state = {
         registerName: '',
         registerEmail: '',
         registerPassword: '',
         nameError: '',
         emailError: '',
         passwordError: ''
      }
   }

   onRegisterNameChange = (event) => {
      this.setState({ registerName: event.target.value})
   }

   onRegisterEmailChange = (event) => {
      this.setState({ registerEmail: event.target.value})
   }

   onRegisterPasswordChange = (event) => {
      this.setState({ registerPassword: event.target.value})
   }

   inputValidation = () => {
      let { registerName, registerEmail, registerPassword} = this.state;

      if(registerName === '' || registerEmail === '' || registerPassword === ''){

         if(registerName === ''){
            this.setState({nameError: '*Pease enter your name'})
         }

         if(registerEmail === ''){
            this.setState({emailError: '*Pease enter your email'})
         }

         if(registerPassword === ''){
            this.setState({passwordError: '*Pease enter your password'})
         }
         
         return false;

      }else{
         this.setState({
            nameError: '',
            emailError: '',
            passwordError: ''
         })
      }

      if(!registerEmail.includes('@')){
         this.setState({emailError: '*Invalid email'})
         return false;
      }

      return true;
   }

   onSubmitRegister = () => {
      if(this.inputValidation()){
         fetch('http://localhost:3000/register' , {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            name: this.state.registerName,
            email: this.state.registerEmail,
            password: this.state.registerPassword
         })
      })
      .then(response => response.json())
      .then(data => {
         if(data){
            this.props.loadUser(data);
            this.props.onRouteChange('home')
         }
      })
      }
   }

   render(){
      return(
         <div className="center">
         
            <div className='container'>
               
               <h1>Register</h1>
               
               <label htmlFor="name"><b>Name</b></label>
               <input type="text" onChange={this.onRegisterNameChange} placeholder="Enter Name" name="name" />
               <div className='error'>
                  {this.state.nameError}
               </div>

               <label htmlFor="email"><b>Email</b></label>
               <input type="text" onChange={this.onRegisterEmailChange} placeholder="Enter Email" name="email" />
               <div className='error'>
                  {this.state.emailError}
               </div>

               <label htmlFor="psw"><b>Password</b></label>
               <input type="password" onChange={this.onRegisterPasswordChange} placeholder="Enter Password" name="psw" />
               <div className='error'>
                  {this.state.passwordError}
               </div>
         
               <button onClick={this.onSubmitRegister}>Register</button>
         
            </div>

         </div>
      )
   }
}

export default Register;