import React, { Component } from 'react';
import Config from './components/Config'
import RapPad from './components/RapPad'



import './styles/App.css';

class App extends Component {
  constructor(){
    super();

    this.state={
        frecuencia:15,
        palabras:[],
        config:false,
        pad:true
        
    }
    this.set=this.set.bind(this);
    this.turn=this.turn.bind(this);
}


set(fq,pb){
  this.setState({
    frecuencia:fq,
    palabras:pb
  })
   this.turn()
}

turn(){
  if(this.state.config===true){
    this.setState({
      config:false,
      pad:true
    })
  }else{
    this.setState({
      config:true,
      pad:false
    })
  }
}


  render() {
    return (
      <div className="App">

 
      



        <div className="App-intro">

{/*
          {(this.state.Showfig)?  null : <RapPad handleShowfig={this.handleShowfig}/>}
          {(this.state.Showfig)? <Config/> : null}
*/}         

 {(this.state.config)? <Config set={this.set}/> : null}
{(this.state.pad)? <RapPad fq={this.state.frecuencia} pb={this.state.palabras} turn={this.turn}/> : null}



          
        </div>
      </div>
    );
  }
}

export default App;
