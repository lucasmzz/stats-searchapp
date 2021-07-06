import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearchTermChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSearchTermSubmit = async (e) => {
    e.preventDefault();

    setResults([]);

    const statistaRegex = /statista/gi;

    //This was added to emulate the fact that only the 'Statista' search term
    // would return results. While interacting with a real API, and to be able
    // to test error handling in the interaction with it.
    if (!statistaRegex.test(searchTerm)) {
      setError(
        `No results found for ${searchTerm}. Suggested: 'Statista' or 'statista'.`
      );
      return;
    }

    //Clean up of the error upon a successful API call after the error is displayed
    if (error) {
      setError("");
    }
    try {
      setLoading(true);
      const result = await axios.get(
        " https://cdn.statcdn.com/static/application/search_results.json"
      );
      if (result.data) {
        setResults(result.data.items);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderResults = () => {
    if (results.length > 0) {
      return results.map((item) => (
        <div className="result-card" key={item.identifier}>
          <div className="result-header">
            <a
              className="result-title"
              target="_blank"
              rel="noreferrer"
              href={item.link}
            >
              {item.title}
            </a>
            <small>
              Published by <em>Statista</em>, on <strong>{item.date}</strong>
            </small>
          </div>
          <div className="result-content">
            <p className="result-subject">
              <em>{item.subject}</em>
            </p>
            <div className="result-image-container">
              <img
                className="result-image"
                src={item.teaser_image_urls[0].src}
                width={item.teaser_image_urls[0].width}
                alt={item.subject}
              />
            </div>
            <p className="result-description">{item.description}</p>
          </div>
          <div className="result-footer">
            <small className="result-link">
              <strong>© Statista 2021</strong> - For details, please refer to
              the
              <a target="_blank" rel="noreferrer" href={item.link}>
                {" "}
                full article
              </a>
              .
            </small>
          </div>
        </div>
      ));
    }
  };

  const handleClearResults = (e) => {
    e.preventDefault();
    setSearchTerm("");
    setResults([]);
  };

  const Loading = () => {
    return <div id="loading">Loading...</div>;
  };

  const ErrorPanel = () => {
    return <div id="error-panel">{error}</div>;
  };

  const ResultsCounter = () => {
    return (
      <div id="results-counter">
        <small>
          <strong>{results.length}</strong> results matched your search
          criteria.
        </small>
      </div>
    );
  };

  return (
    <div id="search-container">
      <div id="search-bar">
        <h1 id="search-bar-title">My Statista SearchApp</h1>
        <form onSubmit={handleSearchTermSubmit} id="search-form">
          <input
            onChange={handleSearchTermChange}
            id="search-term"
            type="text"
            value={searchTerm}
            placeholder="Enter a search term (suggested: 'Statista' or 'statista')"
            name="search-term"
            required
          />
          <button className="btn" id="btn-search" type="submit">
            Search
          </button>
          <button className="btn" onClick={handleClearResults} id="btn-clear">
            Clear
          </button>
        </form>
      </div>
      {error && <ErrorPanel />}
      {results.length > 0 && <ResultsCounter />}
      {loading && <Loading />}
      <div id="results-container">{renderResults()}</div>
    </div>
  );
};

export default Search;
