import logo from './logo.svg';
import './App.css';
import CardList from './components/cardlist/cardlist.component';
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/searchbar.component';
import axios from 'axios';

function App() {
  const[monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);

  const[searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const fetchMonsters = async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      //const monsters = await response.json();
      console.log(response.data);
      setMonsters(response.data);
    };
    fetchMonsters();
  }, []);//the [] is SUPPER IMPORTANT
  useEffect(() => {
    let filtered = [];
    if(searchInput === "") {
      filtered = monsters
    } else {
      filtered = monsters.filter(monster =>
        monster.name.toLowerCase().includes(searchInput.toLowerCase())
      );

    }
    setFilteredMonsters(filtered);
  }, [monsters, searchInput]);//whenever our search changes or monsters change we update
   
  const handleInput = e => {
    //console.log(e.target.value)
    setSearchInput(e.target.value)
  };

    
  return (
    <div className="App">
      <h1>Monster Rolodex</h1>
      <SearchBar
        placeholder='Search Monster'
        handleInput={handleInput}
      />
      <CardList monsters={filteredMonsters}></CardList>
    </div>
  );
}

export default App;
