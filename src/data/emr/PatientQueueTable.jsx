import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";

const PatientQueueTable = () => {
  const [patientQueueData, setPatientQueueData] = useState(null);
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
        setPatientQueueData(jsonData);
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

  if (!patientQueueData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Table className="table-danger" hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Priority</th>
            <th>Arrival Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {patientQueueData.emergency.patientQueue.map((patient, index) => (
            <tr key={index}>
              <td>{patient.name}</td>
              <td>{patient.priority}</td>
              <td>{patient.arrivalTime}</td>
              <td>{patient.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientQueueTable;
