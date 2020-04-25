import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import orderBy from "lodash/orderBy";
import TableInlineForm from "./TableInlineForm";
import { supplier } from '../pages/data';



class SupplierInfo extends Component {
  state = {
    data: supplier,
    editIdx: -1,
  };

  startEditing = (i) => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleSave = (i, x) => {
    this.setState(state => ({
      data: state.data.map((row, j) => (j === i ? x : row))
    }));
    this.stopEditing();
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="supplier-info">
          
          <TableInlineForm
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleSave={this.handleSave}
            data={orderBy(
                this.state.data,
            )}
            header={[
              {
                name: "Full Name",
                prop: "fullName"
              },
              {
                name: "Email",
                prop: "email"
              },
              {
                name: "Phone Number",
                prop: "phone"
              },
              {
                name: "Address",
                prop: "address"
              }
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SupplierInfo;
