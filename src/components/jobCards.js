import React from 'react'
import { Card} from 'semantic-ui-react'

const jobCard = (props) => {
  const jobInfo = props.job.data.map((element, index) => {
    return(
      <Card.Content extra key={index}>
        {
          element.map((d, index) =>{
          const [value] = Object.entries(d);
          return(
            <React.Fragment key={index}>
              <Card.Meta>
                {value[0].toString()}
              </Card.Meta>
              <Card.Description>
                {checkForFormula(props.job, value)}
              </Card.Description>            
            </React.Fragment>
          )})
        }
      </Card.Content>
    )})
    
  return(
    <Card>
      <Card.Content>
        <Card.Header>{props.job.id}</Card.Header>
      </Card.Content>
      {jobInfo}
    </Card>
)}

const checkForFormula =(job, value)=>{
  if(value[0].toString() === "formula"){
    let formulaString = "";

    console.log((value[1]));
    console.log(findOperator(value[1]));
    console.log(calculateResult(value[1], job.data))
  
    Object.entries(value[1]).forEach(element => {
      //operator - formula object key:
      formulaString = formulaString.concat("Operator:" + element[0])
      let operator = element[0]
      //array of arguments objects:
        if(operator !== "reference"){//value argument
            Object.entries(element[1]).forEach(argument =>{
                if(argument[0] === "reference"){
                  formulaString = formulaString.concat(" argument = " + argument[1]);
                  referenceValue(job.data, argument[1])
                }else{
                  let [arg] = Object.entries(argument[1])
                  if(arg[0]=== "reference"){
                    formulaString = formulaString.concat(" argument = " + arg[1])
                  }else{
                    let [notRef] = Object.entries(arg[1])
                    formulaString = formulaString.concat(" argument = " + notRef[1])
                  }
                }
            })
        }else{
          // reference argument
          formulaString = formulaString.concat(" argument = " + element[1])
        }
    });

    return(
      <React.Fragment>
        <Card.Description>
          {formulaString}
        </Card.Description>
        <Card.Meta>
          Result:
        </Card.Meta>
        <Card.Description>
          {calculateResult(value[1], job.data)}
        </Card.Description>
      </React.Fragment>
    ) 
  }
  let [innerValue] = Object.entries(value[1])
  return (typeof(innerValue[1]) + " " + innerValue[1].toString());
}

const referenceValue = (data, reference) => {
    let [cordChar, cordNumber] = reference;
    let dataRow = data[cordNumber-1];
    let dataCell = dataRow[charToNumber(cordChar)].value;
    return dataCell;
 }

const findOperator = (formula) => {
  let [formulaObject] = Object.entries(formula);
  return formulaObject[0];
}

const calculateResult = (formula, data) => {
   let operator = findOperator(formula);
   let result;
   switch (operator) {
     case "sum":
       result = calculateSum(getArguments(formula), data);
       break;
   
     default:
       break;
   }
   return result
}

const charToNumber= (char) => {
  return char.charCodeAt(0)-65
}

const findFormulas = (data) =>{
  let formulaArray =[];
  data.forEach(element =>{
    if(element.formula){
      let formula = element.formula;
      formulaArray.push(formula)
    }
  })
  return formulaArray;
}

const getArguments = (formula) =>{
  let argArray = [];
  let descriptor = findOperator(formula);
  if(descriptor === "value"){
    argArray = argArray.concat(formula.value);
  }
  if (descriptor === "reference") {
    argArray = argArray.concat(formula);
  }
  else{
    let [formulaObject] = Object.entries(formula);
    argArray = argArray.concat(formulaObject[1]);
  }
  console.log(argArray);
  return argArray
}

const calculateSum=(argumentsArray, data) =>{
  let result = 0;
  argumentsArray.forEach(element =>{
    let [destructor] = Object.entries(element);
    console.log(destructor[0]);
    console.log(destructor[1]);
    
    if(destructor[0] === "number"){
      result = result + destructor[1];
    }
    if(destructor[0] === "reference" && typeof(referenceValue(data, destructor[1]).number) === "number"){
      console.log(referenceValue(data, destructor[1]).number);
      result = result + referenceValue(data, destructor[1]).number
      console.log(`result: ${result}`);
    }else{
      result = {"error":"Not valid argument"};
    }
  })
  return result;
}

export default jobCard