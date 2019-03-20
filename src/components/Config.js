import React, { Component } from 'react';
import '.././styles/Config.css';

class Config extends Component {
    constructor(){
        super();

        this.state={
            palabra:"",
            frecuencia:15,
            palabras:[]
        }
        this.handleChange=this.handleChange.bind(this);
    }

    handleRemove(index){
        this.setState({
          palabras:this.state.palabras.filter((e,i)=>{ return i !== index })
        })
      }

    handleSubmit(e){
        e.preventDefault();
       
      }

    enterPressed(event) {
        

        var code = event.keyCode || event.which;
        if(code === 13 ) { 

 
            var regexp = /^[a-zA-Záéíóúñ]+$/;
            if (regexp.test(this.state.palabra)) {
               
                this.setState({
                    palabras:[...this.state.palabras,this.state.palabra]
                })
                this.setState({
                    palabra:"",
                })
            }
            
        }

    }

    handleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    send(){
        this.props.set(this.state.frecuencia,this.state.palabras)
    }

  render() {

    const array = this.state.palabras.map(
        (item,i)=>{ 
          return (
            
            
                 <span key={i} className="badge badge-info mx-1 mt-2" onClick={this.handleRemove.bind(this,i)}> {item} x </span> 

                

          )
        })
  




    return (

      <div className="App">

        <div className="container">

            <div className="card">

                <div className="card-header">
                    
                    <h5 className="card-title mt-3">Entrenador de Freestyle Rap!</h5>

                </div>
                
                <form  className="card-body " onSubmit={this.handleSubmit}>
                

                    <div className="card-text mb-4">Añade algunas palabras con las que quieras comenzar </div>

                    <div className="row justify-content-center">
                        <div className="col-4">
                            <div className="form-group">
                                <input name="palabra" value={this.state.palabra} className="form-control form-control-sm " type="text" placeholder="Palabra" onChange={this.handleChange} onKeyPress={this.enterPressed.bind(this)}  autoComplete="off"/>
                            </div>
                        </div>
                    </div>


                    <div className="row">

                    {array}

                    </div>

                    <div className="mt-4 mb-4">Velocidad con la que cambian las palabras</div>

                    Cada        <select name="frecuencia" value={this.state.frecuencia} className="custom-select mx-3" onChange={this.handleChange}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option  value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                            </select>
                    segundos.
                    

                </form>

                <div className="card-footer text-muted">
                    <button type="button" className="btn btn-outline-secondary" onClick={this.send.bind(this)}>Improvisar!</button>
                </div>



            </div>
        </div>
       

        
      </div>

    );

  }
}

export default Config;
