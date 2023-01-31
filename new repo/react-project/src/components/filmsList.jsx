import { Component } from "react";
import "./filmListStyle.css"

class FilmsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  getFilms() {
    fetch("https://studioghibliapi-d6fc8.web.app/films")
      .then((response) => response.json())
      .then((films) => this.setState({ list: films }))
      .catch((error) => console.error(error));
  }

  componentDidMount() {
    this.getFilms();
  }

  render() {
    return (
      <ul className="tiles">
        {this.state.list.map((film) => {
          return ( <li key={film.id}>
            <h2>{film.title}</h2>
            <a href={`${film.movie_banner}`}>
            <img src={`${film.image}`} alt="" />
            </a>
          </li>
          );
        })}
      </ul>
    );
  }
}

export default FilmsList;