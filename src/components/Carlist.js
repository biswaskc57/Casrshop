import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Addcar from "./Addcar";
import Editcar from "./Editcar";

function Carlist() {
  const [cars, setCars] = useState([]);

  const BASE_URL = "https://car-rest-service-carshop.2.rahtiapp.fi";

  // Fetch all cars
  const fetchAllCars = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cars`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Error fetching cars collection");
      }

      const data = await response.json();
      // Extract cars array from the embedded object
      setCars(data._embedded.cars);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  // Delete a car by ID
  const deleteCarById = async (carId) => {
    try {
      const response = await fetch(`${BASE_URL}/cars/${carId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }
      console.log(`Car with ID ${carId} deleted successfully`);
      fetchAllCars(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  // Save a new car
  const saveCar = async (car) => {
    try {
      const response = await fetch(`${BASE_URL}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(car)
      });

      if (!response.ok) {
        throw new Error("Error saving car");
      }
      fetchAllCars(); // Refresh list after adding new car
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  // Update an existing car
  const updateCar = async (car, carId) => {
    try {
      const response = await fetch(`${BASE_URL}/cars/${carId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(car)
      });

      if (!response.ok) {
        throw new Error("Error updating car");
      }
      fetchAllCars(); // Refresh list after update
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  const columns = [
    { field: "brand", headerName: "Brand", sortable: true, filter: true },
    { field: "model", headerName: "Model", sortable: true, filter: true },
    { field: "color", headerName: "Color", sortable: true, filter: true },
    { field: "fuel", headerName: "Fuel", sortable: true, filter: true },
    { field: "modelYear", headerName: "Year", sortable: true, filter: true, width: 100 },
    { field: "price", headerName: "Price (€)", sortable: true, filter: true, width: 100 },
    {
      headerName: "",
      width: 100,
      cellRendererFramework: (params) => (
        <Editcar updateCar={updateCar} car={params.data} />
      ),
    },
    {
      headerName: "",
      width: 100,
      cellRendererFramework: (params) => (
        <IconButton color="secondary" onClick={() => deleteCarById(params.data.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "90%", margin: "auto" }}
    >
      <Addcar saveCar={saveCar} />
      <AgGridReact
        rowData={cars}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        suppressCellSelection={true}
      />
    </div>
  );
}

export default Carlist;
