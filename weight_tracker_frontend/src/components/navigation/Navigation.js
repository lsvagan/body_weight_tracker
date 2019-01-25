import React from 'react';
import './Navigation.css';

const Navigation = ({isSignedIn, onRouteChange}) => {
   
   if(isSignedIn){
      return(
         <nav>
            <p className='navigation' onClick={() => onRouteChange('signin')}>Sign Out</p>
         </nav>
      ) 
   }else{
      return(
         <nav>
            <p className='navigation'onClick={() => onRouteChange('signin')}>Sign In</p>

            <p className='navigation'onClick={() => onRouteChange('register')}>Register</p>
         </nav>
         )
   }
   
   
   
}

export default Navigation;