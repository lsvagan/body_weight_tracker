import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Banner from './components/banner/Banner';
import InputAndMeasurements from './components/inputAndMeasurements/InputAndMeasurements'
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';

class App extends Component {
  constructor(){
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false,
      user: {
        user_id: '',
         name: '' 
      }
    }
  }

  loadUser = (user) => {
    this.setState({
      user:{
        user_id: user.user_id,
        name: user.name,
      }
    })
  }

  onRouteChange = (route) => {
    if(route==='home'){
      this.setState({isSignedIn: true})
    }else{
      this.setState({isSignedIn: false})
    }

    this.setState({route: route})
  }



  render() {
    return (
      <div className="App">

        <Navigation isSignedIn={this.state.isSignedIn}
        onRouteChange={this.onRouteChange} />
        
        {this.state.route === 'home' ? 

        <div>
          <Banner userName={this.state.user.name} />
          <InputAndMeasurements user_id={this.state.user.user_id} />
        </div> 
        :
        (this.state.route === 'signin' ?
        <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        :
        <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        )
        }
        
      </div>
    );
  }
}

export default App;
