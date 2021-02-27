import "./styles.css";

const getNames = (results) => {
  return results.reduce((acc, item) => [...acc, item.name], []);
};

const getNameAndBirth = (results) => {
  return results.reduce(
    (acc, item) => [
      ...acc,
      {
        name: item.name,
        birth: item.birth_year
      }
    ],
    []
  );
};

const getNameAndHair = (results) => {
  return results
    .filter((item) => item.species !== [])
    .reduce(
      (acc, item) => [...acc, { name: item.name, hair: item.hair_color }],
      []
    );
};

const boyKiloEndeksi = (arr) => {
  return arr.reduce(
    (acc, item) => [
      ...acc,
      {
        name: item.name,
        endeks: Math.floor(item.height / item.mass),
        healthStatus: item.height / item.mass > 2 ? "Healthy" : "Watch out!"
      }
    ],
    []
  );
};

//karakterlerin, isim, boy, kilo deglerini alip, isim ve boy/kilo endeksini dondurun.

//[{name: 'luke skywalker', endeks: boy/kilo}]

//turu olmayan kisileri filtreleyip cikarin
//ve kalan kisilerin bana isim ve sac rengini dondurun

//boyu 160'dan buyuk olan karakterlerin yer aldiklari filmleri istiyorum

const tallCharactersMovies = (arr) => {
  return arr
    .filter((value) => value.height > 160 && value.gender === "male")
    .reduce(
      (acc, item) => [...acc, { name: item.name, movie: item.films }],
      []
    );
};

const fetchKanye = () => {
  fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    .then(
      (data) =>
        (document.getElementById("kanye").innerHTML = JSON.stringify(
          data.results,
          undefined,
          2
        ))
    );
};

const fetchCat = () => {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((data) => console.warn(data));
};

const fetchStarWars = () => {
  fetch("https://swapi.dev/api/people/")
    .then((response) => response.json())
    .then(
      //const {results} = data
      (data) => {
        document.getElementById("starWarsResults").innerHTML = JSON.stringify(
          data.results,
          undefined,
          2
        );
        document.getElementById("names").innerHTML = JSON.stringify(
          getNames(data.results),
          undefined,
          2
        );
        document.getElementById("nameAndBirth").innerHTML = JSON.stringify(
          getNameAndBirth(data.results),
          undefined,
          2
        );
        document.getElementById("nameAndHairColor").innerHTML = JSON.stringify(
          getNameAndHair(data.results),
          undefined,
          2
        );
        document.getElementById("boyKilo").innerHTML = JSON.stringify(
          boyKiloEndeksi(data.results),
          undefined,
          2
        );
        document.getElementById(
          "tallCharacterMovies"
        ).innerHTML = JSON.stringify(
          tallCharactersMovies(data.results),
          undefined,
          2
        );
      }
    );
};

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={() => fetchCat()}>Cat</button>
      <button onClick={() => fetchKanye()}>Kanye</button>
      <button onClick={() => fetchStarWars()}>Star Wars</button>
      <pre id="kanye"></pre>
      <pre id="starWarsResults"></pre>
      <pre id="names"></pre>
      <pre id="nameAndBirth"></pre>
      <pre id="nameAndHairColor"></pre>
      <pre id="boyKilo"></pre>
      <pre id="tallCharacterMovies"></pre>
    </div>
  );
}
