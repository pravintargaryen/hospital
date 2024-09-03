import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";

const RoomTable = () => {
  const [roomData, setRoomData] = useState(null);
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
        setRoomData(jsonData);
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

  if (!roomData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table className="table-danger" hover>
        <thead>
          <tr>
            <th>Room</th>
            <th>Bed</th>
            <th>Status</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {roomData.emergency.bedAvailability.map((item, index) => (
            <tr key={index}>
              <td>{item.room}</td>
              <td>{item.bed}</td>
              <td>{item.status}</td>
              <td>{item.type}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RoomTable;
