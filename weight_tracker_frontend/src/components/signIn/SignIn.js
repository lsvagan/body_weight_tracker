import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
   constructor(){
      super()
      this.state = {
         signInEmail: '',
         signInPassword: '',
         signInError: '',
      }
   }

   onEmailChange = (event) => {
      this.setState({signInEmail: event.target.value})
   }

   onPasswordChange = (event) => {
      this.setState({signInPassword: event.target.value})
   }

   signInValidation = () => {
      let { signInEmail, signInPassword } = this.state;

      if(signInEmail === '' || signInPassword === ''){
         return false;
      }

      return true;
   }

   onSubmitSignin = () => {
      if(this.signInValidation()){
      fetch('http://localhost:3000/signin', {
         method: 'POST',
         headers: {'Content-Type':'application/json'},
         body: JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword
         })
      })
      .then(response => response.json())
      .then(data => {
         if(data.user_id){
            this.props.loadUser(data);
            this.props.onRouteChange('home');
         }else{
            this.setState({signInError : data})
         } 
      })
      }
   }

   render(){
      return(

         <div className="center">
         
            <div className='container'>
               
               <h1>Sign In</h1>

               <label htmlFor="email"><b>Email</b></label>
               <input type="text" onChange={this.onEmailChange} placeholder="Enter Email" name="email" required />

               <label htmlFor="psw"><b>Password</b></label>
               <input type="password" onChange={this.onPasswordChange} placeholder="Enter Password" name="psw" required />
               <div className='error'>
                  {this.state.signInError}
               </div>
         
               <button onClick={this.onSubmitSignin}>Sign In</button>

               <p onClick={() => this.props.onRouteChange('register')}>Register</p>
         
            </div>

         </div>

      )
   }
}

export default SignIn;