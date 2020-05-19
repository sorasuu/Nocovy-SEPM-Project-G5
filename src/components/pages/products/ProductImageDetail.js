import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ParallaxSlide from '@mui-treasury/components/slide/parallax';
import DotIndicator from '@mui-treasury/components/indicator/dot';
import { checkArray } from '../dashboard/Dashboard'

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  slide: {
    perspective: 1000, 
    overflow: 'hidden',
    position: 'relative',
  },
  imageContainer: {
    display: 'block',
    position: 'relative',
    zIndex: 2,
  },
  image: {
    
    marginTop: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    zIndex: 10,
    width: '100%',
    height: "fit-content",
    maxHeight:'600px',
    minHeight:'400px',
    objectFit: 'cover',  
    
  },
  arrow: {
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
        disabled={index === 0}
        onClick={() => onChangeIndex(index - 1)}
      >
        <KeyboardArrowLeft />
      </Button>
      <Button
        className={cx(classes.arrow, classes.arrowRight)}
        disabled={index === props.image.productImg.length - 1}
        onClick={() => onChangeIndex(index + 1)}
      >
        <KeyboardArrowRight />
      </Button>
      <div className={classes.indicatorContainer}>
        {checkArray(props.image.productImg).map((image, i) => (
          <DotIndicator
            key={i}
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
    </div>
  );
};

export default ProductImageDetail;