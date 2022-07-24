import DatagridRow from "./Datagrid-row";
import "bootstrap/dist/css/bootstrap.css";
import { AscIcon, DescIcon } from "../constants";
function Datagrid({
  employeeData,
  updateSort,
  currentSort,
  updateSearch,
  currentSearch,
  setEmployeedData,
  defaultEmployees,
}) {
  if (employeeData === undefined || employeeData.length === 0) return;

  const columns = Object.keys(employeeData[0]);

  const sortHeader = (e) => {
    console.log(e.target.innerHTML);
    console.log(currentSort.order);
    if (currentSort.key === e.target.innerHTML) {
      if (currentSort.order === "asc") {
        currentSort = { ...currentSort, order: "desc" };
      } else {
        currentSort = { ...currentSort, order: "asc" };
      }
    } else {
      currentSort = { key: e.target.innerHTML, order: "asc" };
    }
    // console.log(currentSort);

    updateSort(currentSort);
    renderIcon(e.target.innerHTML);
    employeeData.sort((a, b) => {
      return a[currentSort.key] > b[currentSort.key] ? 1 : -1;
    });
    if (currentSort.order === "desc") {
      employeeData.reverse();
    }
    setEmployeedData(employeeData);
  };

  const search = (e) => {
    console.log(e.target.value);
    // console.log(e.target.name);
    currentSearch = { key: e.target.name, value: e.target.value };

    updateSearch({ key: e.target.name, value: e.target.value });

    console.log(currentSearch);

    if (currentSearch.value !== "" && currentSearch.key !== "") {
      setEmployeedData(
        defaultEmployees.filter((item) => {
          //   console.log(item[search.key]);
          return (item[currentSearch.key] + "")
            .toLowerCase()
            .includes(currentSearch.value.toLowerCase());
        })
      );
    } else {
      setEmployeedData(defaultEmployees);
    }
  };

  const renderIcon = (column) => {
    if (currentSort.key === column) {
      console.log(column + currentSort.order);
      if (currentSort.order === "desc") return <DescIcon />;
      else return <AscIcon />;
    }
  };

  return (
    <table className="container table table-striped-dark table-bordered table-hover table-light ">
      <thead className="thead-dark">
        <tr>
          {columns.map((column) => (
            <th key={column}>
              <input
                type="text"
                name={column}
                key={"search" + column}
                onChange={search}
                placeholder={`Filter ${column} here`}
              />
              <br />
              <span onClick={sortHeader}>{column}</span>
              {renderIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {employeeData.map((item) => (
          <DatagridRow key={item.id} rowData={item} />
        ))}
      </tbody>
    </table>
  );
}
export default Datagrid;
