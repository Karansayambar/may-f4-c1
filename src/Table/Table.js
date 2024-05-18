import React from "react";
import "./table.css";
function Table({ data, search, sortCriteria }) {
  // Sort data based on the selected criteria
  const sortedData = [...data].sort((a, b) => {
    if (sortCriteria === "market_cap") {
      return b.market_cap - a.market_cap;
    } else if (sortCriteria === "percentage") {
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    } else {
      return 0;
    }
  });

  // Filter data based on the search term
  const filteredData = search
    ? sortedData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : sortedData;

  // Return a single table with multiple rows
  return (
    <div>
      {filteredData.length === 0 ? (
        <p>No matching results found.</p>
      ) : (
        <table>
          <tbody>
            {filteredData.map((item) => {
              const priceChangeColor =
                item.price_change_percentage_24h >= 0 ? "green" : "red";
              return (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      width="40"
                      height="40"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.symbol}</td>
                  <td>${item.current_price.toLocaleString()}</td>
                  <td>${item.total_volume.toLocaleString()}</td>
                  <td style={{ color: priceChangeColor }}>
                    {item.price_change_percentage_24h >= 0 ? "+" : ""}
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>Mkt Cap: ${item.market_cap.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
