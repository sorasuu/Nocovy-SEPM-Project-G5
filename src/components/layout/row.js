import React from 'react';
import TableColumn from './col';


    const Row=({rData})=>{
    return(
      <tr>
      {rData.map((colData, key)=>
        <TableColumn key={key} colData={colData}/>
      )}
   </tr>
 );
}

export default Row;
