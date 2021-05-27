import React, { useEffect, useState } from 'react';
import { CarouselStyle } from '../styles';

const Carousel = (props: { children: any; }) => {
    const {children} = props
 
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
 
    // Set the length to match current children from props
    useEffect(() => {
       setLength(children.length)
    }, [children])
 
    const next = () => {
       if (currentIndex < (length - 1)) {
           setCurrentIndex(prevState => prevState + 1)
       }
    }
   
    const prev = () => {
          if (currentIndex > 0) {
             setCurrentIndex(prevState => prevState - 1)
          }
    }
 
    return (
       <CarouselStyle>
          <div className="carousel-container">
             <div className="carousel-wrapper">
                {
                   currentIndex > 0 &&
                   <button onClick={prev} className="left-arrow" style={{backgroundColor:"lightblue"}}>
                      &lt;
                   </button>
                }
                <div className="carousel-content-wrapper">
                   <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` , width:"50%"}}>
                         {children}
                   </div>
                </div>
                {
                   currentIndex < (length - 1) &&
                   <button onClick={next} className="right-arrow" style={{backgroundColor:"lightblue"}}>
                      &gt;
                   </button>
                }
             </div>
          </div>
       </CarouselStyle>
    )
 }

export default Carousel;