import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";
import RoomTable from "../../data/emr/RoomTable";
import PatientQueueTable from "../../data/emr/PatientQueueTable";
import PatientPriorityChart from "../../data/emr/PatientPriorityChart";
import AmbulanceMap from "../../data/emr/AmbulanceMap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  return (
    <Fragment>
      <div
        className="container rounded shadow-sm p-3 mb-5 bg-secondary text-center"
        style={{ color: "pink" }}
      >
        <h1 style={{ color: "pink" }} className="text-center">
          Bed Availability
        </h1>
        <Row>
          <Col>
            <RoomTable />
          </Col>
        </Row>
      </div>
      <div
        className="container rounded shadow-sm p-3 mb-5 bg-secondary text-center"
        style={{ color: "pink" }}
      >
        <h1 style={{ color: "pink" }} className="text-center">
          Patient Queue
        </h1>
        <Row>
          <Col>
            <PatientPriorityChart />
          </Col>
          <Col>
            <PatientQueueTable />
          </Col>
        </Row>
      </div>

      <div
        className="container rounded shadow-sm p-3 mb-5 bg-secondary text-center"
        style={{ color: "pink" }}
      >
        <h1 style={{ color: "pink" }} className="text-center">
          Ambulance Tracking
        </h1>
        <AmbulanceMap />
      </div>
    </Fragment>
  );
};

export default Home;
