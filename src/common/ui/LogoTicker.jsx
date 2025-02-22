/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import Slider from "react-slick"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const LogoTicker = ({ items }) => {
  const settings = {
    speed: 9000,
    autoplay: true,
    autoplaySpeed: 0,
    centerMode: true,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: true,
    initialSlide: 0,
    arrows: false,
    buttons: false
  }
  return (
    <Slider {...settings} className="bg-gradient-blue">
      {items && items.map((item, index) => (
        <div key={`${item.id}_${index}`} className="logo-wrapper px-3  mx-5">
          <GatsbyImage            
            image={getImage(item.logo.localFile)} 
            className="img-fluid" 
            alt={item.logo.altText}             
          />
        </div>
      ))}
    </Slider>
  )
}

LogoTicker.propTypes = {
  items: PropTypes.instanceOf(Array)
}

export default LogoTicker
