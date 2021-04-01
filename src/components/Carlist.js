import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
export default function Carlist() {
  const [cars, setCars] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://carrestapi.herokuapp.com/cars")
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars));
  };
  const columns = [
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Color",
      accessor: "color",
    },
    {
      Header: "Fuel",
      accessor: "fuel",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Year",
      accessor: "year",
    },
  ];

  return (
    <div>
      <ReactTable data={cars} columns={columns} />
    </div>
  );
}
