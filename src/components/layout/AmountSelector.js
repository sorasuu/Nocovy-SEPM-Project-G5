import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 4,
    borderRadius: 40,
    border: '1px solid',
    borderColor: palette.grey[300],
  },
  iconBtn: {
    padding: 8,
    '& svg': {
      fontSize: 16,
    },
  },
  value: {
    padding: '0px 8px',
    width:50,
    textAlign: "center",
    align: "center",
    '& input': {
        textAlign: "center",
    },
  },
}));

const AmountSelector = (props) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <IconButton onClick={props.minusOne} className={styles.iconBtn}>
        <Remove />
      </IconButton>
      <InputBase onChange={props.onChange} className={styles.value} value={props.value}></InputBase>
      <IconButton onClick={props.plusOne} className={styles.iconBtn}>
        <Add />
      </IconButton>
    </div>
  );
};

export default AmountSelector;