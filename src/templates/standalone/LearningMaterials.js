// TODO: Track down template usage
import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import Hero from "../../common/ui/Hero"
import FooterCTAs from '../../common/ui/FooterCTAs'

const LearningMaterialsTemplate = ({ data: { page } }) => {
  const hero = {
    heroHeading: page.title
  }
  const { cta } = page.acfFooterCTAs

  return (
    <>
      <Hero hero={hero} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p className="float-right mr-5">{page.date}</p>

            {!!page.content && (
              <article className="py-5">{parse(page.content)}</article>
            )}
          </div>
        </div>
      </div>
      <FooterCTAs featured={cta} />
    </>
  )
}

export const pageQuery = graphql`
  query LearningMaterialsTemplateQuery($id: String!) {
    # selecting the current page by id
    page: wpPage(id: { eq: $id }) {
      ...PageDetails
      ...FooterCTAs
    }
  }
`

export default LearningMaterialsTemplate