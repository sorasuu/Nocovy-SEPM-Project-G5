import React, { Component} from 'react';
import Row from './row';


class TableRowSpan extends Component {
  constructor(props, context) {
    super(props, context);
    var myProps=this.getDataModelled();
    var propsToPass=this.getDataWithSpanCount(myProps);
    this.state={
      tableNewData:propsToPass
    }
  }

getDataModelled(){
    let data=this.props.tData;
    let newRowData=[];
    for(var i=0;i<data.length;i++){
      let obj=data[i];
      let newColData=[];
        for (let key in obj){
          newColData.push(new Object({
            key:key,
            value:obj[key],
            rowSpan:1,
            print:true
          }));
        };
         newRowData.push(newColData);
    };
    return newRowData;
  }
  getDataWithSpanCount(myProps){
    for(let i=1;i<myProps.length;i++)
    {
      for(let j=0;j<myProps[i].length;j++)
      {
        for(let k=i-1;k>=0&&myProps[i][j].value==myProps[k][j].value;k--){
          myProps[k][j].rowSpan=myProps[k][j].rowSpan+1;
          myProps[k+1][j].print=false;
        }
    }
  }
  return myProps;
}
  render() {
    return (
      <table className='table table-bordered'>
          <thead>
          <tr>{this.props.tColumns.map((tColumn, key) =>
          <th key={key}>{tColumn.header}</th>
          )}
          </tr>
          </thead>
          <tbody>
          {this.state.tableNewData.map((rData, index) =>
            <Row key={index} rData={rData}/>
          )}
          </tbody>
        </table>
    );
  }
}

export default TableRowSpan;