import React from 'react';

const Banner = ({ userName }) => {
   return(
      <p>
         {`Hello, ${userName}, welcome to body weight tracker.`}
      </p>
   )
}

export default Banner;