import { useState, useEffect } from "react";
import {
  filterFilmsByDirector,
  getListOf,
  getFilmsStats,
} from "../helpers/film.helpers";
import { Link } from "react-router-dom";

function FilmsPage(props) {
  let [list, setList] = useState([]);
  let [searchDirector, setSearchDirector] = useState("");

  function getFilms() {
    fetch("https://studioghibliapi-d6fc8.web.app/films/${id}")
      .then((response) => response.json())
      .then((films) => setList(films))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getFilms();
  }, []);

  let filmsByDirector = filterFilmsByDirector(list, searchDirector);
  let directors = getListOf(list, "director");
  let { avg_score, latest, total } = getFilmsStats(filmsByDirector);

  return (
    <div>
      <h1 className="center"><span className="studio">Studio Ghibli Films</span></h1>
      <form>
        <label htmlFor="searchDirector">Filter By Director</label>
        <select
          name="searchDirector"
          id="searchDirector"
          value={searchDirector}
          onChange={(e) => setSearchDirector(e.target.value)}
        >
          <option value="">All</option>
          {directors.map((director, idx) => {
            return (
              <option key={director + idx} value={director}>
                {director}
              </option>
            );
          })}
        </select>
      </form>
      <div>
        <div>
          <span># Of Films</span>
          <span>{total}</span>
        </div>
        <div>
          <span>Average Rating</span>
          <span>{avg_score.toFixed(2)}</span>
        </div>
        <div>
          <span>Latest Film</span>
          <span>{latest}</span>
        </div>
      </div>
      <ul className="tiles">
        {filmsByDirector.map((film) => {
          return (
            <li key={film.id}>
              <Link to={`/films/${film.id}`}>
                {film.title}</Link>
                {/* <a href={`${film.movie_banner}`}>
                  <img src={`${film.image}`} alt="Film Poster" />
                </a> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FilmsPage;
