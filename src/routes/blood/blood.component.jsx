import { Fragment } from "react";
import InventoryPieChart from "../../data/blood/InventoryPieChart";
import DonorsBarChart from "../../data/blood/DonorsBarChart";
import RequestsLineChart from "../../data/blood/RequestsLineChart";
import DonorTrendsLineChart from "../../data/blood/DonorTrendsLineChart";

const Blood = () => {
  return (
    <Fragment>
      <div className="container rounded shadow-sm p-3 mb-5 bg-secondary text-center">
        <h1 style={{ color: "pink" }} className="text-center">
          Blood Inventory
          <InventoryPieChart />
        </h1>
      </div>
      <div className="container rounded shadow-sm p-3 mb-5 bg-secondary text-center">
        <h1 style={{ color: "pink" }} className="text-center">
          Donors
          <DonorsBarChart />
        </h1>
      </div>
      <div className="container rounded shadow-sm p-3 mb-5 bg-secondary text-center">
        <h1 style={{ color: "pink" }} className="text-center">
          Requests
          <RequestsLineChart />
        </h1>
      </div>
      <div className="container rounded shadow-sm p-3 mb-5 bg-secondary text-center">
        <h1 style={{ color: "pink" }} className="text-center">
          Donor Trends
          <DonorTrendsLineChart />
        </h1>
      </div>
    </Fragment>
  );
};

export default Blood;
