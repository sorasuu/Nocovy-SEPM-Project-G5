import React, { Component } from 'react';
import {Grid} from '@material-ui/core'
import TableRowSpan from '../layout/table';
import authors from '../layout/authors'


class CompanyProduct extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tData: authors
    }
  }
  render() {
    const {data} = this.props
    let columns =
      [
        {
          header: 'Id',
          sort: 'true'
        },
        {
          header: 'Product',
          sort: 'true'
        },
        {
          header: 'Retailer',
          sort: 'true'
        }
      ]

    return (
      <Grid container spacing={2} item xs={6} md={6} lg={6} >
        <Grid item xs={4} md={4} lg={4} >
          {data ? data.map(detail => {
            return (
              <img src={detail.logo} />
            )
          }) : null}

        </Grid>
        <Grid item xs={8} md={8} lg={8}>
          <div className="container">
            <h4>Product List</h4>
            <div style={{ marginLeft: '10px', marginTop: '10px' }}>
              <TableRowSpan
                tData={Object.assign([], this.state.tData)}
                tColumns={columns}
              />
            </div>
          </div>)
        </Grid>
      </Grid>
    )
  }
}

export default CompanyProduct;
