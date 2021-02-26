import React from 'react'
import PropTypes from 'prop-types'
import Image from "gatsby-image"

const Hero = ({
  heroTitle,
  heroSubtitle,
  heroSubnav,
  heroFeaturedImage,
  heroDescription,
  heroBackgroundImage,
  heroCta
}) => {
  return (
    <div className="hero"
      style={heroBackgroundImage && { backgroundImage: `url(${heroBackgroundImage})`}}
    >
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-6">
            {heroTitle && <h1>{heroTitle}</h1>}
            {heroSubtitle && (<h2>{heroSubtitle}</h2>)}
            {heroDescription && (
              <>
                <hr className="hr-xs ml-0 border-green" />
                <p className="lead text-white">{heroDescription}</p>
              </>
            )}

            {heroSubnav && (
              <>
                <ul className="nav mt-4">
                  {heroSubnav.map(item => (
                    <li className="nav-item" key={item.subnavItemLink.url}>
                      <a href={item.subnavItemLink.url} className="nav-link">{item.subnavItemLink.title}</a>
                    </li>
                  )
                  )}
                </ul>
              </>
            )}
          </div>
          <div className="col-lg-2 ml-lg-auto"> 
            {heroFeaturedImage && (
              <Image
                fluid={heroFeaturedImage}
                alt={heroFeaturedImage.alt}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

Hero.propTypes = {
  heroTitle: PropTypes.string
}

export default Hero