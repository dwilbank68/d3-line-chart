import React, { useEffect, useState } from "react";
import BBTimeline from "./BBTimeline";
import "./App.css";

function App() {
    const [bbEpisodes, setBbEpisodes] = useState([]);
    const [bbCharacters, setBbCharacters] = useState([]);
    const [highlight, setHighlight] = useState();

    useEffect(() => {
        fetch("https://www.breakingbadapi.com/api/characters?category=Breaking+Bad")
            .then(res => res.ok && res.json())
            .then(chars => {
                setBbCharacters(
                    chars.sort((a, b) => a.name.localeCompare(b.name))
                );
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        fetch("https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad")
            .then(res => res.ok && res.json())
            .then(episodes => {
                console.warn(episodes);
                setBbEpisodes(episodes);
            })
            .catch(console.error);
    }, []);

    return (
        <React.Fragment>
            <h1>Breaking Bad Timeline</h1>
            <BBTimeline highlight={highlight} data={bbEpisodes} />

            <h2>Select your character</h2>
            <select value={highlight} onChange={e => setHighlight(e.target.value)}>
                <option>Select character</option>
                {bbCharacters.map(char => (
                    <option key={char.name}>{char.name}</option>
                ))}
            </select>
        </React.Fragment>
    );
}

export default App;