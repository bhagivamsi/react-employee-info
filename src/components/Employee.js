import Datagrid from "./Datagrid";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function Employee() {
  let [employeeData, setEmployeedData] = useState([]);
  let [currentSort, updateSort] = useState({ key: "id", order: "asc" });
  let [search, updateSearch] = useState({ key: "", value: "" });
  let [defaultEmployees, setDefaultEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/employees")
      .then((res) => {
        console.log(res.data);
        setDefaultEmployees(res.data);
        setEmployeedData(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  //   useEffect(() => {

  //   }, [employeeData, currentSort]);

  //   useEffect(() => {
  //     // console.log(search);
  //   }, [employeeData, search]);

  return (
    <div className="bg-light">
      <h1>Employee Information</h1>
      <Datagrid
        employeeData={employeeData}
        updateSort={updateSort}
        currentSort={currentSort}
        updateSearch={updateSearch}
        currentSearch={search}
        setEmployeedData={setEmployeedData}
        defaultEmployees={defaultEmployees}
      ></Datagrid>
    </div>
  );
}
export default Employee;
