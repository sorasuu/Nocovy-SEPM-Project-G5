import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ParallaxSlide from '@mui-treasury/components/slide/parallax';
import DotIndicator from '@mui-treasury/components/indicator/dot';
// import { useArrowDarkButtonStyles } from '@mui-treasury/styles/button/arrowDark';
import { checkArray } from '../dashboard/Dashboard'

const useStyles = makeStyles(() => ({
  root: {
    // a must if you want to set arrows, indicator as absolute
    position: 'relative',
    width: '100%',
  },
  slide: {
    perspective: 1000, // create perspective
    overflow: 'hidden',
    // relative is a must if you want to create overlapping layers in children
    position: 'relative',
    // paddingTop: spacing(8),
  },
  imageContainer: {
    display: 'block',
    position: 'relative',
    zIndex: 2,
    // paddingBottom: '56.25%',
  },
  image: {
    maxWidth: '400px',
    marginTop: '5px',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    // position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: "500px",
    objectFit: 'cover',  
    
  },
  arrow: {
    // display: 'none',
    position: 'absolute',
    top:'98%',
    transform: 'translateY(-50%)',
  
  },
  arrowLeft: {
    left: 0,
    
  },
  arrowRight: {
    right: 0,
   
  },
  indicatorContainer: {
    textAlign: 'center',
  },
}));

const ProductImageDetail = (props) => {
  const classes = useStyles();
  const renderElements = ({ index, onChangeIndex }) => (
    <>
      <Button
        className={cx(classes.arrow, classes.arrowLeft)}
        // classes={arrowStyles}
        disabled={index === 0}
        onClick={() => onChangeIndex(index - 1)}
      >
        <KeyboardArrowLeft />
      </Button>
      <Button
        className={cx(classes.arrow, classes.arrowRight)}
        // classes={arrowStyles}
        disabled={index === props.image.productImg.length - 1}
        onClick={() => onChangeIndex(index + 1)}
      >
        <KeyboardArrowRight />
      </Button>
      <div className={classes.indicatorContainer}>
        {checkArray(props.image.productImg).map((image, i) => (
          <DotIndicator
            key={image}
            active={i === index}
            onClick={() => onChangeIndex(i)}
          />
        ))}
      </div>
    </>
  );
  const renderChildren = () =>
    checkArray(props.image.productImg).map((image, key) => (
      <div key={key} className={classes.slide}>
       
        <div className={classes.imageContainer}>
          <img className={classes.image} src={image} alt={'slide'} />
        </div>
      </div>
    ));
  return (
    <div className={classes.root}>
      <ParallaxSlide renderElements={renderElements}>
        {renderChildren}
      </ParallaxSlide>
      {/* <img className={ classes.image }src={props.image.cover}/> */}
    </div>
  );
};

export default ProductImageDetail;