import React, { Component } from 'react';
import Form from './components/Form';
import Recipes from './components/Recipes';
import './App.css';

const API_KEY = '98f11fb71fd58670a5d64c2cda611a22';

class App extends Component {
  state = {
    recipes: []
  };
  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(
      `https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}`
    );

    const data = await api_call.json();
    this.setState({ recipes: data.recipes });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
