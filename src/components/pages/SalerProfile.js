import React, { Component } from 'react';
import {Grid} from '@material-ui/core'
import TableRowSpan from '../layout/table';


const useStyles = theme => ({
  root: {
      // flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      height: '100%',
      width:'90%',
      justifyContent:'center',
      alignItems:'center',
      marginLeft:'5%'
      
  },
  tabs: {
      borderRight: `1px solid ${theme.palette.divider}`
  },
  imageCard: {
      width: 'auto',
      maxWidth: '500px',
      height: 'auto',
      marginTop: '5px',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
  },
  
});


export default class SalerProfile extends Component {
  constructor(props, context) {
    super(props, context);
  
  }
  render() {
    const { classes ,data , id} = this.props;
    const profileDetail = data.filter(detail =>
      {
        return detail.id == id
      }
    )
    
    console.log("profile Detail", profileDetail)
    console.log(typeof(profileDetail[0].products))
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
      <Grid container spacing={2}>
        <Grid item xs={4} md={4} lg={4} >
          <h4>Logo</h4>
          <img src ={profileDetail[0].logo}/>
          <h4>
            Business Certification
          </h4>
        </Grid>
        <Grid item xs={8} md={8} lg={8}>
          
            <h4>Product List</h4>
            <div style={{ padding:'1% 1% 1% 1%'}}>
              <TableRowSpan
                tData={Object.assign([], profileDetail[0].products)}
                tColumns={columns}
              />
            </div>
         
        </Grid>
      </Grid>
    )
  }
}

