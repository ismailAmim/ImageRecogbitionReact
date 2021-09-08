import React from 'react';
//import Tilt from 'react-tilt';
import './Logo.css';
import LogoIm from './Logo.png'

const Logo =()=> {
   
        return (
            <div className="ma4 mt0 imgc">
 {/*            
 <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
  <div className="Tilt-inner"> 👽 </div>
 </Tilt>
     */}     <img src ={LogoIm} alt= "logo"/>
            </div>
        )
    
}
export default Logo;
