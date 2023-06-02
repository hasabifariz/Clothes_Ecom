import React, { useState } from 'react'
import { makeStyles } from "@mui/styles";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import image1 from "../1.png";
import image2 from "../2.png";
import image3 from "../3.png";
import image4 from "../4.png";


const useStyles = makeStyles(theme => ({
  slider: {
    position: 'relative',
    // height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '400px',
    objectFit: 'contain',
    bordeRadius: '10px',
  },
  rightArrow: {
    position: 'absolute',
    top: '50 %',
    right: 80,
    fontSize: '3rem',
    color: '#000',
    zIndex: 10,
    cursor: 'pointer',
    userSelect: 'none',
  },
  leftArrow: {
    position: 'absolute',
    top: '50 %',
    left: 30,
    fontSize: '3rem',
    color: '#000',
    zIndex: 10,
    cursor: 'pointer',
    userSelect: 'none',
  }
  ,
  slide: {
    opacity: 0,
    transitionDuration: '1s ease',
  },
  slideActive: {
    opacity: 1,
    transitionDuration: '1s',
    transform: 'scale(1.08)',
  }
}))

function ImageSlider() {
  const classes = useStyles()
  const [current, setCurrent] = useState(0);
  const slides = [image1, image2, image3, image4]
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  return (
    <section className={classes.slider}>
      <ChevronLeftIcon className={classes.leftArrow} onClick={prevSlide} />
      <ChevronRightIcon className={classes.rightArrow} onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? classes.slideActive : classes.slide}
            key={index}
          >
            {index === current && (
              <img src={slide} alt='travel image' className={classes.image} />
            )}
          </div>
        );
      })}
    </section>
  );
}

export default ImageSlider;