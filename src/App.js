// components import 
import React, { Component } from 'react';
//import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


import Navigation  from './components/navigation/Navigation';
import Logo  from './components/logo/Logo';
import InputLink  from './components/inputlink/InputLink';
import Rank  from './components/rank/Rank';
import ImageRecognition  from './components/imagerecognition/ImageRecognition';
import SignIn from './components/signin/SignIn';
import Register  from './components/register/Register';

import './App.css';
const app = new Clarifai.App({
  apiKey: "2a1714f342c943438b2a31917be1ccdf",
});
class  App extends Component {
  
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {}, 
      route : 'signin',
      isSignedIn :false, 
      user :{
        id : "",
        name : "",
        email : "",
        entries : 0,
        joined : new Date ()
      }
    };
  }

  loadUser= (dataUser) => {
    this.setState(
      {
      user :{
        id : dataUser.id,
        name : dataUser.name,
        email : dataUser.email,
        entries : dataUser.entries,
        joined : dataUser.joined
      
    }})
  }
  componentDidMount(){
    fetch('http://localhost:3000/')
    .then(res=>res.json())
    //.then(console.log); 
  }

calculateFaceLocation = (res)=>{
  console.log('problem 1');
  console.log(res)
  const clarifaiFace = res.outputs[0].data.regions[0].region_info.bounding_box;
  console.log(clarifaiFace);
  const image = document.getElementById('inputimage');
  
  const height = Number(image.height);
  console.log(height);
  const width = Number(image.width);
  console.log(width);
  
  return  {
    leftCol : clarifaiFace.left_col * width,
    topRow :   clarifaiFace.top_row * height,
    rightCol : width -clarifaiFace.right_col * width,
    bottomRow : height - clarifaiFace.bottom_row * height
  };
} 

  // use onInputChange function to setState for our input 
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

displayBox =(data)=> {
   console.log(data);
   this.setState({box : data});
}

  // execute a function when submitting with onSubmit
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
    .then(res=>{
      console.log("id  :",this.state.user.id)
     if(res){
        fetch("http://localhost:3000/image",{
      method:"put",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        id:this.state.user.id
      })
      }).then (response=>response.json())
      .then(count=>{
         this.setState(Object.assign(this.state.user,{
           entries:count
         }));
        });
      this.displayBox(this.calculateFaceLocation(res))
   }
  })
    
    /*
    .then(
     function (response) {
       // response data fetch from FACE_DETECT_MODEL
       console.log(response);
        the data needed from the response data from clarifai API,
       note we are just comparing the two
       console.log(
        response.outputs[0].data.regions[0].region_info.bounding_box
       );
      },
    function (err) {
        // there was an error
        }
      );*/
      
      .catch(err => console.log( "there is a problem  ",err))
    }

  onRouteChange =(r)=> {
    if(r==='signout'){
      this.setState({isSignedIn: false});
    }else if (r ==='home'){
      this.setState({isSignedIn: true});
    }
    
    this.setState({route: r});
  }
  
  render() {
   const  {imageUrl, box,route,isSignedIn} = this.state;
  return (

    <div className="App">
      <Navigation  
      isSignedIn = {isSignedIn}
      onRouteChange={this.onRouteChange}/>
      {
        
        route ==='home'?
        <div>
      
      <Logo/>
      <Rank 
        name={this.state.user.name}
        entries ={this.state.user.entries}
      />
      <InputLink 
         onInputChange={this.onInputChange} 
         onButtonSubmit={this.onButtonSubmit}/>
      <ImageRecognition
        box ={box} 
        imageUrl={imageUrl} />
        </div>
        :(
          route==="signin" ?
        <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>)
        }
    </div>
  )
    }
}

export default App;
