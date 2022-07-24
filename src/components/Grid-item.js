import axios from "axios";

function GridItem({ column, value, id, updateRow, rowDataClone }) {
  const updateValue = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    value = e.target.value;
    let key = e.target.name;

    rowDataClone = { ...rowDataClone, [key]: value };
    console.log(rowDataClone);
    updateRow(rowDataClone);
    axios
      .put("http://localhost:3000/employees/" + rowDataClone.id, rowDataClone)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <td>
      <input
        type="text"
        name={column}
        value={value}
        key={id + column}
        onChange={updateValue}
      />
    </td>
  );
}
export default GridItem;
