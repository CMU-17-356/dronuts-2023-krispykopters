import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    const url = process.env.REACT_APP_DEPLOYMENT === 'true' ? 'http://krispykopters.fly.dev:3000/' : 'http://localhost:3000/';
    console.log('Deployment: ' + process.env.REACT_APP_DEPLOYMENT);
    console.log('Url: ' + url);
    fetch(url)
      .then(response => {
        console.log('response: ', response);
        return response.json();
      })
      .then(data => {
        console.log('data: ', data);
        setData(data);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Data from the backend (Deployment: {process.env.REACT_APP_DEPLOYMENT}):
        </p>
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
