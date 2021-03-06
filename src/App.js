import React, { Component } from 'react';
import Form from './components/Form';
import Recipes from './components/Recipes';
import './App.css';

const API_KEY = '4a17b94741010ca427096aedf3dcd5b4';

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

  componentDidMount = () => {
    fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=chicken`);
    const json = localStorage.getItem('recipes');
    const recipes = JSON.parse(json);
    this.setState({ recipes: recipes || [] });
  };

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('recipes', recipes);
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
