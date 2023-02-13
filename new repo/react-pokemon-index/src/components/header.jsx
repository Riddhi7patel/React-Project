import { useEffect, useState } from "react";
import pokeImage from "../components/images/images.jpeg";


 export function Header() {

    return (
        <div className="header-container">
            <img className="pokeball-image"src={pokeImage} alt="pokeball"/>
            <h1>Pokedex</h1>
            <img className="pokeball-image"src={pokeImage} alt="pokeball"/>
        </div>
    )

}
