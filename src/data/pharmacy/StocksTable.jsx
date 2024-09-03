import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const StocksTable = () => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log("Fetched data:", jsonData); // Log the fetched data
        setStockData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Stock Details</h1>
      <Table className="table-danger" hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock Level</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {stockData.pharmacy.pharmacyStockDetails.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.stockLevel}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <style>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
      `}</style>
    </div>
  );
};

export default StocksTable;
