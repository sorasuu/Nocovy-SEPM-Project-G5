import React, {Component} from 'react';

import TableRowSpan from './table';
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
  
    return (<div className="container">
        <h4>Product List</h4>
      <div  style={{marginLeft:'10px',marginTop:'10px'}}>
      <TableRowSpan 
      tData={Object.assign([],this.state.tData)} 
      tColumns={columns}
      />
      </div>
    </div>);
  }
}

export default CompanyProduct;
