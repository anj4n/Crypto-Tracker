import React, { useEffect, useState } from "react";
import { fetchCryptos } from "../api/CoinGecko";
import CryptoCard from "../component/CryptoCard";
import { data } from "react-router";

const Home = () => {
  const [datalist, setDatalist] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [view, setView] = useState("grid");
  const [sortby, setSortby] = useState("market_cap_rank");
  const [filterelist, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCryptoData = async () => {
    try {
      const data = await fetchCryptos();
      setDatalist(data);
    } catch (error) {
      console.error("Error fetching crypto:", error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  useEffect(() => {
    sortfilter();
  }, [sortby, datalist, search]);

  const sortfilter = () => {
    let filtered = [...datalist];

    if (search.trim() !== "") {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    filtered.sort((a, b) => {
      switch (sortby) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.current_price - b.current_price;
        case "price_desc":
          return b.current_price - a.current_price;
        case "change":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case "market_cap":
          return a.market_cap - b.market_cap;
        default:
          return a.market_cap_rank - b.market_cap_rank;
      }
    });
    setFilteredList(filtered);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Crypto Tracker</h1>
          </div>
          <div className="search-section">
            <input
              type="search"
              placeholder="search "
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>
      <div className="controls">
        <div className="filter-group">
          <label>Sort By:</label>
          <select
            value={sortby}
            onChange={(event) => {
              setSortby(event.target.value);
            }}
          >
            <option value="market_cap_rank">Rank</option>
            <option value="price">Price low-high</option>
            <option value="price_desc"> Price High-low</option>
            <option value="name">Name</option>
            <option value="change"> Change </option>
            <option value="market cap">Market Cap</option>
          </select>
        </div>
        <div className="view-toggle">
          <button
            onClick={() => {
              setView("grid");
            }}
          >
            Grid
          </button>
          <button
            onClick={() => {
              setView("list");
            }}
          >
            List
          </button>
        </div>
      </div>

      {isloading ? (
        <h1 className="loading">Loading....</h1>
      ) : (
        <div className={`crypto-container ${view}`}>
          {filterelist.map((crypto, key) => (
            <CryptoCard key={key} crypto={crypto} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
