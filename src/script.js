
const calcButtons = [
{"id": "one","out": 1, "keydown": "", "class": "btn btn-dark"},
{"id": "two","out": 2, "keydown": "", "class": "btn btn-dark"},
{"id": "three","out": 3, "keydown": "",  "class": "btn btn-dark"},
{"id": "add","out": "+", "keydown": "", "class": "btn btn-primary"},
{"id": "four","out": 4, "keydown": "", "class": "btn btn-dark"},
{"id": "five","out": 5, "keydown": "", "class": "btn btn-dark"},
{"id": "six","out": 6, "keydown": "", "class": "btn btn-dark"},
{"id": "subtract","out": "-", "keydown": "", "class": "btn btn-primary"},
{"id": "seven","out": 7, "keydown": "", "class": "btn btn-dark"},
{"id": "eight","out": 8, "keydown": "", "class": "btn btn-dark"},
{"id": "nine","out": 9, "keydown": "", "class": "btn btn-dark"},
{"id": "multiply","out": "x", "keydown": "", "class": "btn btn-primary"},
{"id": "decimal","out": ".", "keydown": "", "class": "btn btn-warning"},
{"id": "zero","out": 0, "keydown": "", "class": "btn btn-dark"},
{"id": "clear","out": "AC", "keydown": "", "class": "btn btn-danger"},
{"id": "divide","out": "/", "keydown": "", "class": "btn btn-primary"},
{"id": "equals","out": "=", "keydown": "", "class": "btn btn-secondary"}
];

class Calculator extends React.Component {
  constructor(props){
   super(props);
 this.state ={
   output : '0',
   onScreen: [],
   dotCount: true,  //Contador de puntos
   zeroCount:false,   //Contador de ceros
   initZero: false,
   memory: ''
   
   
 }
  }
  componentWillMount() {
    this.setState({
      output: ''
    })
  }

  caller(str){

    
    if(str !== calcButtons[14].out && str!== calcButtons[16].out 
    && str !== calcButtons[12].out){
        if (str == calcButtons[11].out /*x*/ || str == calcButtons[3].out /*+*/ ||                   str == calcButtons[15].out /*/*/ || str == calcButtons[7].out /*-*/){
          
            
                    this.setState({
                onScreen: this.state.onScreen.concat(str),
              //  output:this.state.onScreen.concat(str).join(''),
                dotCount: true,
                zeroCount:false,
                multiZero:0
                })
            

        }
      
        else if (str == calcButtons[13].out) {
                 // Evitar que sean colocados multiples ceros sin un entero delante
          this.setState({multiZero: this.state.multiZero++});
            if ((this.state.zeroCount || this.state.multiZero<=1)){
          if(this.state.initZero) {
           this.setState({
            onScreen: this.state.onScreen.pop(),
             initZero: false
           })}
              this.setState({
               onScreen: this.state.onScreen.concat(str),
         //      output:this.state.onScreen.concat(str).join(''),
               dotCount: this.state.dotCount,
               zeroCount: this.state.zeroCount,
              multiZero:this.state.multiZero++})
          }
        }
      
       else {
         if(this.state.initZero) {
           this.setState({
            onScreen: this.state.onScreen.pop(),
             initZero: false
           })
         }
          this.setState({
                onScreen: this.state.onScreen.concat(str),
          //      output:this.state.onScreen.concat(str).join(''),
                dotCount: this.state.dotCount,
                zeroCount: true,
                multiZero: this.state.multiZero--})
       }
     }
          
    else if (str == '.') {
       if(this.state.dotCount){
         if(typeof(this.state.onScreen[this.state.onScreen.length-1]) === 'number'){
         this.setState({
           onScreen: this.state.onScreen.concat(str),
          // output:this.state.onScreen.concat(str).join(''),
           dotCount: false,
            zeroCount: true,
            multiZero:this.state.multiZero--});       
         }
        
         else{
           this.setState({
           dotCount: false});
         }
       }
                 
      
     else if (!this.state.dotCount){
          }  
       }
    
    else if (str == "AC"){
      this.setState({
   output : "",
   onScreen: ['0'],
   dotCount: true,  //Contador de puntos
   initZero: true,  //Contador de operadores
   zeroCount:false,   //Contador de ceros
   multiZero: 0});
      
    }

    else if (str == '=') {
    let arrAux = this.state.onScreen;
    let newArr = [];
    let checkPoint = 0
    
    arrAux.map( (num,idx) => {
      if (typeof(num) == 'number'  && ((!arrAux[idx+1] && typeof(arrAux[idx+1]) !== 'number') || (arrAux[idx+1] != '.' &&  typeof(arrAux[idx+1]) == 'string'))) {
        
       newArr.push(parseFloat(arrAux.slice(checkPoint,idx+1).join('')));checkPoint = idx+1;     
     }
      
      else if (typeof(num) == 'string' && num != '.') {
        
        newArr.push(arrAux.slice(checkPoint,idx+1).join(''));
        checkPoint = idx+1;

     }

    }) 
      this.operator(newArr);
      
    }


}  
  
  operator(str){

    str.map((char, idx) => {
      if (typeof(char) == 'string'){
     let count = idx;
        while (typeof(str[count]) == "string") {count++}
      str.splice(idx,count-idx-1)
      } 
    })
    

   str.map((char, idx) => {
if (char == calcButtons[11].out /*x*/){
  str.splice(idx-1,3,str[idx-1]*str[idx+1])
    }})
    
    str.map((char, idx) => {

      if (char == calcButtons[15].out /*/*/){
  str.splice(idx-1,3,str[idx-1]/str[idx+1])
    }})
    
     str.map((char, idx) => {
        
if (char == calcButtons[7].out /*-*/){
  str.splice(idx-1,3,str[idx-1]-str[idx+1])
     }})
    
     str.map((char, idx) => {
if (char == calcButtons[3].out /*+*/){
   
   str.splice(idx-1,3,str[idx-1]+str[idx+1])
     }})
    
    
   
    
    this.setState({
      output: str,
      onScreen: str
    })
  }

  
 render(){

   return(<div id= "container">
         <div id = 'screen'>
          <input id = "display" value ={this.state.onScreen.join('')} disabled/>
          <input id = "inp" value ={this.state.output} disabled/>
          </div>
       
        <div id="buttons">
          {calcButtons.map((obj) => {
            return (<button id={obj.id} onClick={this.caller.bind(this, obj.out)} class= {obj.class}>{obj.out}</button>)
          })
          }
          </div>           
       </div>
   )
 } 
  
}

ReactDOM.render(<Calculator/>,document.getElementById("app"))



/*cal(e){
  var test = /x|(\d+\.?\d+)|\+|\-|\/|\=/gi;
  let str = e.target.value;  
  let auxStr = str.match(test);
  auxStr.forEach((dat,idx) => {
    console.log(dat,idx)
    if( dat == "x" || dat == "/"){
      dat == "x" ? console.log(auxStr[idx-1] * auxStr[idx+1]): console.log(auxStr[idx-1] / auxStr[idx+1])
    }else {if(dat == "+" || dat == "-"){
       dat == "+" ? console.log(auxStr[idx-1] + auxStr[idx+1]): console.log(auxStr[idx-1] - auxStr[idx+1])} }
  })
  }*/



/*User Story #1: My calculator should contain a clickable element containing an = (equal sign) with a corresponding id="equals".
User Story #2: My calculator should contain 10 clickable elements containing one number each from 0-9, with the following corresponding IDs: id="zero", id="one", id="two", id="three", id="four", id="five", id="six", id="seven", id="eight", and id="nine".
User Story #3: My calculator should contain 4 clickable elements each containing one of the 4 primary mathematical operators with the following corresponding IDs: id="add", id="subtract", id="multiply", id="divide".
User Story #4: My calculator should contain a clickable element containing a . (decimal point) symbol with a corresponding id="decimal".
User Story #5: My calculator should contain a clickable element with an id="clear".
User Story #6: My calculator should contain an element to display values with a corresponding id="display".
User Story #7: At any time, pressing the clear button clears the input and output values, and returns the calculator to its initialized state; 0 should be shown in the element with the id of display.
User Story #8: As I input numbers, I should be able to see my input in the element with the id of display.
User Story #9: In any order, I should be able to add, subtract, multiply and divide a chain of numbers of any length, and when I hit =, the correct result should be shown in the element with the id of display.
User Story #10: When inputting numbers, my calculator should not allow a number to begin with multiple zeros.
User Story #11: When the decimal element is clicked, a . should append to the currently displayed value; two . in one number should not be accepted.
User Story #12: I should be able to perform any operation (+, -, *, /) on numbers containing decimal points.
User Story #13: If 2 or more operators are entered consecutively, the operation performed should be the last operator entered.
User Story #14: Pressing an operator immediately following = should start a new calculation that operates on the result of the previous evaluation.
User Story #15: My calculator should have several decimal places of precision when it comes to rounding (note that there is no exact standard, but you should be able to handle calculations like 2 / 7 with reasonable precision to at least 4 decimal places).
Note On Calculator Logic: It should be noted that there are two main schools of thought on calculator input logic: immediate execution logic and formula logic. Our example utilizes formula logic and observes order of operation precedence, immediate execution does not. Either is acceptable, but please note that depending on which you choose, your calculator may yield different results than ours for certain equations (see below example). As long as your math can be verified by another production calculator, please do not consider this a bug.*/