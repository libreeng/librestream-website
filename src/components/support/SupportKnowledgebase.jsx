import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from "gatsby-plugin-image";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import AddLineIcon from 'remixicon-react/AddLineIcon'
import { slugify } from '../../common/utils/helpers'
import SupportKnowledgebaseLink from '../../components/support/SupportKnowledgebaseLink'


const SupportKnowledgeBase = ({ title, post }) => {
  const {acfKnowledgebase:{section}} = post
  const featuredImageData = post.acfKnowledgebase?.kbImage?.localFile?.childImageSharp?.gatsbyImageData
  const featuredImageAlt= post.acfKnowledgebase?.kbImage?.altText || ``

  return (
    <div className="list-group-item border-0 px-0" id={post.id}>
      <div className="row no-gutters align-items-start">
        <div className="col-lg-8">
          <h4>{title}</h4>
          <Accordion>
            {section && section.map(section => {
              const { sectionTitle, sectionType, links, faq } = section
              const slug = slugify(sectionTitle)

              return (
                <Card key={slug}>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={slug}>
                      <div>
                        <AddLineIcon size="20" />
                        {sectionTitle}
                      </div>
                    </Accordion.Toggle>
                  </Card.Header>
                  {sectionType && (
                    <Accordion.Collapse eventKey={slug}>
                      <Card.Body>
                        {sectionType && sectionType === 'Links' && (
                          links.map((link, i) => {
                            // console.log(link)
                            return <div key={`link_${i}`}>
                              <SupportKnowledgebaseLink link={link} />
                            </div>
                          })
                        )}
                      </Card.Body>
                    </Accordion.Collapse>
                  )}
                </Card>
              )
            })}
          </Accordion>
        </div>
        <div className="col-lg-3 ml-lg-auto">
          {featuredImageData && (
            <GatsbyImage
              image={featuredImageData}
              alt={featuredImageAlt}
              style={{ marginBottom: 50 }} />
          )}
        </div>

      </div>
    </div>
  );
}

SupportKnowledgeBase.propTypes = {
  post: PropTypes.instanceOf(Object),
  title: PropTypes.string
}

export default SupportKnowledgeBase
