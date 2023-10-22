import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [answer, setAnswer] = useState("0");
  const[expression, setExpression] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const et = expression.trim();
  
  const isOperator = (symbol: string) => {
  return /[-+*/]/.test(symbol);
}  
  


  const buttonPress = (symbol: string) => {
    const et = expression.trim();

    if (symbol === 'clear'){
      setAnswer("");
      setExpression("0");
      setLimitReached(false)
     
    } else if (symbol === "negative"){
      if(answer === "") return;
    setAnswer(
      answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent"){
      if (answer === "") return;
    setAnswer((parseFloat(answer)/ 100).toString());
    } else if (isOperator(symbol)){
        setExpression(et + " " + symbol + " ");
    }else if (symbol === "="){
      calculate();
    }else if (symbol === "0"){
      if (expression.charAt(0) !== "0"){
        setExpression(expression + symbol);
      }
    } else if (symbol === "."){
    const lastNumber = expression.split(/[-+/*]/g).pop();
    if(!lastNumber) return;
       console.log("lastNumber :>> ", lastNumber);

      if(lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if(expression.length < 18) {
        if (expression.charAt(0) === "0") {
          setExpression(expression.slice(1) + symbol);
        } else {
          setExpression(expression + symbol);
        }
      } else {
        setExpression(expression.slice(1) + symbol);
      }
    } 
    if (expression.length === 18) {
      setLimitReached(true);
      return;
   
      }
  };

  const calculate = () => {
      if (isOperator(et.charAt(et.length - 1)))return;
      const parts = et.split(" ");
      const newParts = [];

      for (let i = parts.length-1; i>= 0; i--){
        if(["*", "/", "+"].includes(parts[i]) && isOperator(parts[i-1])){
          newParts.unshift(parts[i]);
            let j = 0;
            let k = i -1;
            while(isOperator(parts[k])){
              k--;
              j++;
            }
              i-=j;
        } else {
          newParts.unshift(parts[i]);
        }
      }
        const newExpression = newParts.join(" ");
        if (isOperator(newExpression.charAt(0))) {
          setAnswer(eval(answer + newExpression)as string);
        } else {
          setAnswer(eval(newExpression)as string);
        }
            setExpression("");
  };


  // attempt to allow users to use their keyboard to manipulate the calculator:
  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === 'Enter') {
      buttonPress('=');
      calculate();
    } else if (key === 'Backspace') {
      buttonPress('clear');
    } else if (key === '1'){
      buttonPress('1');
    }else if (key === '2'){
      buttonPress('2');
    }else if (key === '3'){
      buttonPress('3');
    }else if (key === '4'){
      buttonPress('4');
    }else if (key === '5'){
      buttonPress('5');
    }else if (key === '6'){
      buttonPress('6');
    }else if (key === '7'){
      buttonPress('7');
    }else if (key === '8'){
      buttonPress('8');
    }else if (key === '9'){
      buttonPress('9');
    }else if (key === '0'){
      buttonPress('0');
    }else if (key === '+'){
      buttonPress('+');
    }else if (key === '.'){
      buttonPress('.');
    }else if (key === '-'){
      buttonPress('-');
    }
  };

  useEffect (() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
 
 

  return (
    
    <div className="container">
      <h1>計算機のアプリ</h1>
      <div id="calculator">
        <div id="display" style={{textAlign:"right"}}>
        <div id="answer">{answer}</div>
        <div id="expression">
          {limitReached ? <span className='limit'> ❗Limit Reached❗</span> : expression}
          
          
          </div>
        
        </div>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("clear")} className="cal-button light" id='clear'>C</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("negative")} className="cal-button light" id='negative'>+/-</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("percent")} className="cal-button light" id='percent'>%</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("/")} className="cal-button operand" id='divide'>/</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("7")} className="cal-button" id='seven'>7</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("8")} className="cal-button" id='eight'>8</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("9")} className="cal-button" id='nine'>9</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("*")} className="cal-button operand" id='multiply'>X</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("4")} className="cal-button" id='four'>4</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("5")} className="cal-button" id='five'>5</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("6")} className="cal-button" id='six'>6</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("-")} className="cal-button operand" id='subtract'>-</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("1")} className="cal-button" id='one'>1</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("2")} className="cal-button" id='two'>2</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("3")} className="cal-button" id='three'>3</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("+")} className="cal-button operand" id='add'>+</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("0")} className="cal-button" id='zero'>0</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress(".")} className="cal-button" id='decimal'>.</button>
          <button onKeyDown={()=> handleKeyDown} onClick={()=> buttonPress("=")} className="cal-button operand" id='equals'>=</button>
      </div>
    </div>
      
  )
}

export default App
