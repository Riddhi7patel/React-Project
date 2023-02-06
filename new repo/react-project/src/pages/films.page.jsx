import { useState, useEffect } from "react";
import { filterFilmsByDirector, getListOf, getFilmStats } from "../helpers/film.helpers";
import { Link } from "react-router-dom";

function FilmsPage(props) {
  let [list, setList] = useState([]);
  let [searchDirector, setSearchDirector] = useState("");

  function getFilms() {
    fetch("https://studioghibliapi-d6fc8.web.app/films")
      .then((response) => response.json())
      .then((films) => setList(films))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getFilms();
  }, []);

  let filmsByDirector = filterFilmsByDirector(list, searchDirector);
  let directors = getListOf(list, "director");
  let { avg_score, latest, total } = getFilmStats(filmsByDirector);

  return (
    <div>
    <div className="filmHraderSection">
      <h1 className="H1-center"><span className="studio">Studio Ghibli Films</span></h1>
      <form>
         <div className="form-group">
             <label htmlFor="searchDirector">Filter By Director</label>
             <select
               name="searchDirector"
               id="searchDirector"
               value={searchDirector}
               onChange={(e) => {
                setSearchDirector(e.target.value);
              }}
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
          </div>
        </form>
        </div>
        <div className="director-data">
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
        {filmsByDirector.length !== 0 &&
        filmsByDirector.map((film) => {
          return (
          <li key={film.id}>
            <Link to={`/film/${film.id}`}>
              <h2>{film.title}</h2>
            </Link>
            <img src={`${film.image}`} alt="Film Poster" />
          </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FilmsPage;
