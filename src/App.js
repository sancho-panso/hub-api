import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Container } from 'semantic-ui-react';
import './App.css';
import Header from './components/header';
import Table from './components/tableOutput';

const App = () => {
  const [jobs, setJobs] = useState([])

  useEffect(()=> {
    axios.get('https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/jobs')
    .then(response =>{
      setJobs(response.data.jobs)
    })
  }, [])

  return (
    <div className="App">
      <Container style={{marginTop:"2em"}}>
        <Header />
        <Table jobs={jobs}/>
      </Container>
    </div>
  );
}

export default App;
