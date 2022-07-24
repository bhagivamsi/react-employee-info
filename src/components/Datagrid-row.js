import { useState } from "react";
import GridItem from "./Grid-item";

function DatagridRow({ rowData }) {
  let [rowDataClone, updateRow] = useState(rowData);

  const keys = Object.keys(rowDataClone);

  return (
    <tr>
      {keys.map((key) => (
        <GridItem
          key={rowDataClone.id + key}
          column={key}
          value={rowDataClone[key]}
          updateRow={updateRow}
          rowDataClone={rowDataClone}
        />
      ))}
    </tr>
  );
}

export default DatagridRow;
