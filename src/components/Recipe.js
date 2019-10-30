import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const API_KEY = '4a17b94741010ca427096aedf3dcd5b4';

class Recipe extends Component {
  state = {
    activeRecipe: []
  };
  componentDidMount = async () => {
    const title = this.props.location.state.recipe;
    const req = await fetch(
      `https://www.food2fork.com/api/search?key=${API_KEY}&q=${title}`
    );

    const res = await req.json();
    this.setState({ activeRecipe: res.recipes[0] });
  };
  render() {
    const recipe = this.state.activeRecipe;
    if (this.state.activeRecipe === undefined) {
      return (
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">No Details</h1>
            <button className="active-recipe__button">
              <Link to="/">Go Home</Link>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        {this.state.activeRecipe.length !== 0 && (
          <div className="active-recipe">
            <img
              className="active-recipe__img"
              src={recipe.image_url}
              alt={recipe.title}
            />
            <h3 className="active-recipe__title">{recipe.title}</h3>
            <h4 className="active-recipe__publisher">
              Publisher: <span>{recipe.publisher}</span>
            </h4>
            <p className="active-recipe__website">
              Website:
              <span>
                <a href={recipe.publisher_url}>{recipe.publisher_url}</a>
              </span>
            </p>
            <button className="active-recipe__button">
              <Link to="/">Go Home</Link>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Recipe;
