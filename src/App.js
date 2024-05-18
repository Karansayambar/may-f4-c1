import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./Table/Table";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortCriteria, setSortCriteria] = useState(null);

  const handleSortByMarketCap = () => setSortCriteria("market_cap");
  const handleSortByPercentage = () => setSortCriteria("percentage");

  useEffect(() => {
    const fetchCryptoData = async () => {
      const url =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
      try {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCryptoData();
  }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <div className="head">
        <span className="search">
          <input
            type="search"
            onChange={searchHandler}
            placeholder="Search by name"
          />
        </span>
        <span className="sort">
          <button onClick={handleSortByMarketCap}>Sort by Market Cap</button>
          <button onClick={handleSortByPercentage}>Sort by Percentage</button>
        </span>
      </div>
      <Table data={data} search={search} sortCriteria={sortCriteria} />
    </div>
  );
}

export default App;
