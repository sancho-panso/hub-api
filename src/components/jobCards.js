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
                {/* {Object.entries(value[1])[0].toString()} */}
                {/* {Object.entries(value[1]).toString()} */}
                {checkForFormula(props,value)}
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

const checkForFormula =(props,value)=>{
  if(value[0].toString() === "formula"){
    let formulaString = "";
    Object.entries(value[1]).forEach(element => {
      //operator - formula object key:
      formulaString = formulaString.concat("Operator:" + element[0])
      let operator = element[0]
      //array of arguments objects:
        if(operator !== "reference"){//value argument
            Object.entries(element[1]).forEach(argument =>{
                console.log(props.job.id);
                console.log( argument);
                if(argument[0] === "reference"){
                  formulaString = formulaString.concat(", argument = " + argument.toString())
                }else{
                  formulaString = formulaString.concat(", argument = " + Object.entries(argument[1]).toString())
                }
            })
        }else{
          // reference argument
          formulaString = formulaString.concat(", argument = " + element[1])
        }
    });

    return formulaString;
  } 
  return Object.entries(value[1]).toString();
}

export default jobCard