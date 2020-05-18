
import {editDetails} from '../../store/actions/productAction'
import React, {  Component } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux'

class DetailTable extends Component {

    state={
             columns: [
            {
                title: 'Name', field: 'name',
                cellStyle: {
                    backgroundColor: `hsla(14, 100%, 53%, 0.6)`,
                    color: '#FFF'
                  },
                headerStyle: {
                  backgroundColor: `hsla(14, 100%, 53%, 0.6)`,
                  fontSize:15,
                  fontFamily:'Open Sans',
                  color:'white'
                  
                }
              },
            { title: 'Value', field: 'value',
            // headerStyle:{
            //     backgroundColor: `hsla(14, 100%, 53%, 0.6)`,
            //     fontSize:15,
            //     fontFamily:'Open Sans',
            //     color:'white'
            // } 
        },         
        ],
        details:[]
    }
    handleUpdateDetails=(data)=>{
        const detailsUpdate={id:this.props.id,details:data}
        this.props.editDetails(detailsUpdate)
    }
  componentDidUpdate(prevState,prevProps){
      if(prevState.details!==this.props.details&& prevProps!==this.props.details){
          this.setState({details:this.props.details})
      }

  }

render(){
    console.log('detail ne',this.props)
    return (
        <div>
        <h4>Detail</h4>
        {this.props.owner?
        <MaterialTable
            title={' '}
            columns={this.state.columns}
            data={this.state.details}
            options={{
                searchFieldAlignment: "left",
                paging:false,
                actionsColumnIndex:-1,
                rowStyle: rowData =>({
                    backgroundColor: (rowData.tableData.id % 2 ===0)? '#EEE': '#FFF',
                })
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            this.setState((prevState) => {
                                const data = [...prevState.details];
                                data.push(newData);
                                this.handleUpdateDetails(data)
                                return { details: data };
                            });
                        }, 600)
                 
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                this.setState((prevState) => {
                                    const data = [...prevState.details];
                                    data[data.indexOf(oldData)] = newData;
                                    this.handleUpdateDetails(data)
                                    return {details: data };
                                });
                            }
                        }, 600);
                  
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            this.setState((prevState) => {
                                const data = [...prevState.details];
                                data.splice(data.indexOf(oldData), 1);
                                this.handleUpdateDetails(data)
                                return { details: data };
                            });
                        }, 600);
                     
                    }),
            }}
        />:  <MaterialTable
        title={' '}
        columns={this.state.columns}
        data={this.state.details}
        options={{
            searchFieldAlignment: "left",
            paging:false,
            actionsColumnIndex:-1,
            rowStyle: rowData =>({
                backgroundColor: (rowData.tableData.id % 2 ===0)? '#EEE': '#FFF',
            })
        }}

    />}
        </div>
    );
}
}
const mapDispatchToProps = dispatch => {
    return {
        editDetails:(details)=> dispatch(editDetails(details)),
    }
  }
  
export default connect(null,mapDispatchToProps)( DetailTable)