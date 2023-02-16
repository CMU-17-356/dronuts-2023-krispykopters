import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import Banner from './Banner';

function App() {
  const [data, setData] = useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    fetch('http://localhost:80/')
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
      <Banner />
      <header className="App-header">
        <p>
          Data from the backend:
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
