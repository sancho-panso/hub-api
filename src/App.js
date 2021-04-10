import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Container, Card } from 'semantic-ui-react';
import './App.css';
import Header from './components/header';
import JobCard from './components/jobCards';

const App = () => {
  const [jobs, setJobs] = useState([])

  useEffect(()=> {
    axios.get('https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/jobs')
    .then(response =>{
      setJobs(response.data.jobs)
    })
  }, [])

  const cards = jobs.map((job,index)=>{
    return(
      <JobCard key={index} job={job}/>
    )
  });

  return (
    <div className="App">
      <Container style={{marginTop:"2em"}}>
        <Header />
        {/* <Table jobs={jobs}/> */}
        <Card.Group itemsPerRow={4}>
          {cards}
        </Card.Group>
      </Container>
    </div>
  );
}

export default App;
