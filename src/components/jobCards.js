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
                {Object.entries(value[1])[0].toString()}
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

export default jobCard