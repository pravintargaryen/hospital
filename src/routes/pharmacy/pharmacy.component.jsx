import { Fragment } from "react";
import StocksTable from "../../data/pharmacy/StocksTable";
import OrdersTable from "../../data/pharmacy/OrdersTable";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Pharmacy = () => {
  return (
    <Fragment>
      <div
        className="container rounded shadow-sm p-3 mb-5 bg-secondary text-center"
        style={{ color: "pink" }}
      >
        <Row>
          <Col>
            <StocksTable />
          </Col>
        </Row>
      </div>
      <div
        className="container rounded shadow-sm p-3 mb-5 bg-secondary text-center"
        style={{ color: "pink" }}
      >
        <Row>
          <Col>
            <OrdersTable />
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Pharmacy;
