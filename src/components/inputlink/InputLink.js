import React from 'react';
import './InputLink.css';

 const InputLink=({onInputChange,onButtonSubmit}) =>{
    return (
        <div>
            <p className="f3">
                {'This Magic neural network power '}
            </p>
            <div className="center">
            <div className="form center p4 br3 shadow-5 ">
                <input className="f4 pa2 w-70 center" 
                    onChange={onInputChange}/>
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" 
                    onClick={onButtonSubmit}>Detect</button>
            </div>
            </div>
        </div>
    )
}
export default InputLink;