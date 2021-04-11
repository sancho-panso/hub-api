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
                if(argument[0] === "reference"){
                  formulaString = formulaString.concat(" argument = " + argument[1])
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

    return formulaString;
  }
  let [innerValue] = Object.entries(value[1])
  return (typeof(innerValue[1]) + " " + innerValue[1].toString());
}

export default jobCard