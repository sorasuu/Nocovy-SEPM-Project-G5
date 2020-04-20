import React, {Component} from 'react';

import TableRowspan from './table';
import authors from './authors'

class CompanyProduct extends Component {
  constructor(props,context){
    super(props,context);
    this.state={
      tData:authors
    }
  }
  render() {
    let columns=
      [
        {
          header:'Id',
          sort:'true'
        },
        {
          header:'Product',
          sort:'true'
        },
        {
          header:'Retailer',
          sort:'true'
        }
      ]
  
    return (<div className="App">
        <h4>Product List</h4>
      <div  style={{width:'600px',marginTop:'10px'}}>
      <TableRowspan 
      tData={Object.assign([],this.state.tData)} 
      tColumns={columns}
      />
      </div>
    </div>);
  }
}

export default CompanyProduct;
