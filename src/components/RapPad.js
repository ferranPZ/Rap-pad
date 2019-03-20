import React, { Component } from 'react';
import '.././styles/RapPad.css';
import palabras from '../words/palabras.json';


class RapPad extends Component {
    constructor(props){
        super(props);

        this.state={
            palabra:"",
            palabras:this.props.pb,
            frecuencia:this.props.fq,
            tiempo:"",
            rimas:[]
        }
        this.handleChange=this.handleChange.bind(this);
        this.removeFirst=this.removeFirst.bind(this);
        this.addRandomWord= this.addRandomWord.bind(this);
        this.getRhymes=this.getRhymes.bind(this);
    }



    config(){
        this.props.turn();
        console.log("handleShowfig triggered");
    }

    handleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    removeFirst(){
            this.setState({
                palabras:this.state.palabras.filter((e,i)=>{ return i !== 0 })
            })
       
      }

    getRhymes(){
        console.log("palabra: "+this.state.palabras[0]);
        console.log("rimas: ")

        var list = [];
        var max=0;


        fetch('http://rhymebrain.com/talk?function=getRhymes&word='+this.state.palabras[0]+'&lang=es&includePron=1')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) { 

                if(myJson.length>=100)
                {max=100;}else{max=myJson.length}

                for(var j=0;j<max;j++){
                    list.push(myJson[j].word);

                   
                 }
             });

             this.setState({
                rimas:list
             })
             
             console.log(this.state.rimas)
            

        }


        clearRimas(){
            this.setState({
                rimas:[]
            })
        }
    


    componentDidMount(){

        if(this.state.palabras.length===0){ 
        this.addRandomWord()
        }
        const intervalo = this.state.frecuencia;
        var time = intervalo;
        var i=0;

        window.setInterval( function(){

             
            
            this.setState({
                tiempo : time
            })
            time--;
            if(time===-1){
                time=intervalo;

               
                
            }


            
            if(this.state.tiempo===this.state.frecuencia){

                
                if(i===0){
                this.getRhymes();
                
                

                }else{
                    this.clearRimas()
                    this.removeFirst();
                    
                    if(this.state.palabras.length===0){
                        this.addRandomWord()
                    }
                    this.getRhymes();
                    console.log(time);
                }
                i++
            }

          
            }.bind(this),1000);
        
    }


    addRandomWord(){
        
        var value = Math.floor((Math.random() * 249387) + 1);
        this.setState({
            palabras:[...this.state.palabras,palabras[value]]
        })

        console.log(palabras[value]);
    }

    

  render() {

    var x=10;
    const array = this.state.rimas.map(
      (rimas,i)=>{ 
        return (

          <div className="col-4" key={i}>
            {rimas}

          
          </div>



        )
      })


        
      
    return (

      <div className="App">

        <div className="container">

            <div className="card">

                <div className="card-header">
                
                    
                    <h5 className="card-title mt-3">Entrenador de Freestyle Rap!</h5>
                   
                    <button type="button" className="btn btn-outline-secondary config mb-4" onClick={this.config.bind(this)} >Configurar</button>

                </div>
                
                <div  className="card-body " >
                
                <div className="row word">
                   <p className="col"> {this.state.palabras[0]}</p> 
                </div>                
                    <div class="row progress mb-4">
                        <div class="progress-bar" style={{width: ((this.state.tiempo*100)/this.state.frecuencia)+"%" }} role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                        <p className="seg">{this.state.tiempo}</p>
                    </div>
                </div>
        
               
             

           
                    <div className="row rimas">
                        {array}
                    </div>




               

                <div className="row music mt-3">


                <iframe width="100%" height="200" src={"https://www.youtube.com/embed?listType=playlist&list=PLXhSAMqlo7Ii0SlLoxFqe4DbVZfTIVuGl&autoplay=1&loop=1&index="+3} frameBorder="0" ></iframe>

                
                </div>




                </div>

                <div className="card-footer text-muted">
                        copyright
                </div>



            </div>
        </div>
       

        
      </div>

    );

  }
}

export default RapPad;
