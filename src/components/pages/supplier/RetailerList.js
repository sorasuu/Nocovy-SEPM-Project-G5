import React from 'react';
import { TabPanel } from './SupplierDetailCard'
import { NavLink } from 'react-router-dom'
import { Table, TableHead, TableCell, TableBody, 
        TableRow, Button, Grid
} from '@material-ui/core'

import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';


const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));

const ProfileCard = (props) => {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });
  return (
    <Card className={cx(styles.card, shadowStyles.root)}>
      <CardContent>
        <Avatar className={styles.avatar} src={props.user.logo?props.user.logo:''} />
  <h3 className={styles.heading}>{props.user.businessName}</h3>
  <span className={styles.subheader}>{props.user.displayName}</span>
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Email</p>
          <p className={styles.statValue} style={{fontSize:'12px'}}>{props.user.email}</p>
        </Box>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Phone Number</p>
  <p className={styles.statValue} style={{fontSize:'12px'}}>{props.user.phoneNumber}</p>
        </Box>
      </Box>
    </Card>
  );
};
function RetailerList(props){
    const { product, productkey, value } = props
    
    const data = props.data?  props.data[product.id]: null;
    const retailerList = data?data.retailerId:null 
    console.log("retailer list", retailerList)
    return(
        <div key={productkey}>
            <Grid container spacing={3}>
            {retailerList ? retailerList.map((item, key)=>
            
            <Grid item xs={6}>
                <NavLink to ={'/profile/'+item.uid}>
                <ProfileCard key={key} user ={item}/></NavLink>
                </Grid>
            )
                    
                :null}
                </Grid>
        </div>
    )
}

export default (RetailerList)


