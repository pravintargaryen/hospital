import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

const AmbulanceMap = () => {
  const [ambulanceData, setAmbulanceData] = useState(null);
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
        setAmbulanceData(jsonData);
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

  if (!ambulanceData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MapContainer
        center={[40.7128, -74.006]}
        zoom={6}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {ambulanceData.emergency.ambulanceTracking.map((ambulance) => (
          <Marker
            key={ambulance.id}
            position={[ambulance.latitude, ambulance.longitude]}
            icon={L.icon({
              iconUrl: "/ambulance-icon.png", // Add your ambulance icon path
              iconSize: [32, 32],
            })}
          >
            <Popup>
              Ambulance ID: {ambulance.id}
              <br />
              Status: {ambulance.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AmbulanceMap;
