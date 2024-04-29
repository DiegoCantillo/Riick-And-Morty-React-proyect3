import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Character from "./components/Character";
import rickandmortygif from "./assets/rickAndMorty.jpg";

function App() {
  const [locationRickAndMorty, setLocationRickAndMorty] = useState({});
  const [typeId, setTypeId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const randomId = Math.floor(Math.random() * 126) + 1;
  console.log("soy randomId", randomId);

  useEffect(() => {
    if (typeId) {
      axios
        .get(`https://rickandmortyapi.com/api/location?name=${typeId}`)
        .then((res) => setSuggestions(res.data.results))
        .catch((error) => console.log(error.response.data));
    } else {
      setSuggestions([]);
    }
  }, [typeId]);

  const suggestionSlice = suggestions.slice(0, 5);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/location/20`).then((res) => {
      setIsLoading(false);
      setLocationRickAndMorty(res.data);
    });
  }, []);

  const searchLocation = () => {
    axios
      .get(`https://rickandmortyapi.com/api/location/${typeId}`)
      .then((res) => {
        setIsLoading(false);
        setLocationRickAndMorty(res.data);
        setTypeId('')
      });
  };
  const [page, setPage] = useState(1);
  const rickPerPage = 12;
  const lastIndex = page * rickPerPage;
  const firstIndex = lastIndex - rickPerPage;
  const rickPaginator = locationRickAndMorty.residents?.slice(
    firstIndex,
    lastIndex
  );
  const totalPage = Math.ceil(
    locationRickAndMorty.residents?.length / rickPerPage
  );

  let numbers = [];
  for (let i = 1; i <= totalPage; i++) {
    numbers.push(i);
  }

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <div className="App">
            <h1 className="title">Rick And Morty</h1>
            <div className="header">
              <img
                className="header-img"
                src={rickandmortygif}
                alt="rick and morty"
              />
            </div>
            <div className="searched">
              <div className="search">
                <div className="container__input-btn">
                  <input
                    type="text"
                    value={typeId}
                    placeholder="Write here"
                    onChange={(e) => setTypeId(e.target.value)}
                  />
                  {typeId >= 127 || typeId == 0 ? (
                    <button
                      disabled
                      className="btn"
                      style={{ background: "red", color: "white" }}
                    >
                      Search
                    </button>
                  ) : (
                    <button
                      onClick={searchLocation}
                      className="btn"
                      style={{ background: "#165e19", color: "white" }}
                    >
                      Search
                    </button>
                  )}
                </div>
                {suggestionSlice.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    onClick={() => {setLocationRickAndMorty(suggestion); setTypeId('')} }
                  >
                    {" "}
                    <p>{suggestion.name}</p>{" "}
                  </li>
                ))}
              </div>
              <div className="location">
                <h2>{locationRickAndMorty.dimension}</h2>
                <div className="location-info">
                  <p>
                    <b className="white-info">Type: </b>
                    {locationRickAndMorty.type}
                  </p>
                  <p>
                    <b className="white-info">Dimension: </b>
                    {locationRickAndMorty.dimension}
                  </p>
                  <p>
                    <b className="white-info">Population: </b>
                    {locationRickAndMorty.residents?.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="main" key={location}>
              <div className="container_content-card">
                <div className="cards-content" id="containerCards">
                  {rickPaginator.map((location) => (
                    <Character key={location} location={location} />
                  ))}
                </div>
              </div>
            </div>
            <div
              className="container__Paginator-footer"
              style={{ marginTop: "auto" }}
            >
              <div className="btn-paginators">
                <button
                  className="btn-next-and-prev"
                  onClick={() => setPage(page - 1)}
                  disabled={page == 1}
                >
                  {" "}
                  prev
                </button>
                {numbers.map((number) => (
                  <button onClick={() => setPage(number)}>{number}</button>
                ))}
                <button
                  className="btn-next-and-prev"
                  onClick={() => setPage(page + 1)}
                  disabled={page == totalPage}
                >
                  Next
                </button>
              </div>
              <div className="footer">
                <h2>Made With ❤️ By Diego Cantillo & Jhorman Nieto</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
