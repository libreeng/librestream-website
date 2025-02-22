/* eslint-disable no-unused-vars */
import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import { Helmet } from "react-helmet"
import SEO from "../../containers/SEO"
import { useSiteFooter } from '../../common/hooks/useSiteFooter'
import Hero from "../../common/ui/Hero"
import FooterCTAs from '../../common/ui/FooterCTAs'
import Layout from "../../containers/Layout"


const ContactSupportTemplate = ({ data: { page } }) => {
  const acf = page.acfTemplateContactSupport
  const { options } = useSiteFooter()
  const hero = {
    heroHeading: page.title
  }
  const { cta } = page.acfFooterCTAs
  const scripts = [        
    {
      type: `text/javascript`,
      src: `/js/iframeResizer.min.js`
    }
  ]

  return (
    <>
      <Helmet script={scripts} />
      <Layout>
        <SEO pageSEO={page.seo} />
        <Hero hero={hero} />
        <section className="pb-0">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-8">
                {acf.accessSupportTitle && (
                  <div className="border-bracket text-center p-3">
                    <h2 className="h4 mb-0"><strong>{acf.accessSupportTitle}</strong></h2>
                  </div>
                )}
                {acf.accessSupportLink && (
                  <div className="text-center mt-2">
                    <a href={acf.accessSupportLink.url} className="btn btn-primary btn-lg text-white my-5" target={acf.accessSupportLink.target}>{acf.accessSupportLink.title}</a>
                  </div>
                )}
                {parse(page.content)}
                <hr className="hr-styled" />
              </div>
            </div>
          </div>
        </section>
        <section className="pt-0">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-8">
                {acf.showForm ? 
                  <div className="py-2 h-auto">
                      <iframe src='/support.html' title='Contact Support Form' scrolling="no" />
                      
                  </div>
                :
                  <>{parse(acf.emailLink)}</>
                }
              </div>
            </div>
          </div>
        </section>

        <section className="pt-0">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-8">
                <div className="row">
                  <div className="col-12">
                    <hr className="hr-styled" />
                    {acf.contactSalesTitle && (
                      <h3 className="text-center pt-3 mb-3">{acf.contactSalesTitle}</h3>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-7">
                    {acf.contactSalesDescription && (
                      parse(acf.contactSalesDescription)
                    )}
                    {acf.contactSalesLink && (
                      <a href={acf.contactSalesLink.url} target={acf.contactSalesLink.target} className="btn btn-primary mt-3">{acf.contactSalesLink.title}</a>
                    )}
                  </div>
                  <div className="col-12 col-lg-5">
                    <div className="border-bracket">
                      <h6 className="mb-0">{options.phoneTitle}</h6>
                      <p className="text-primary">{options.phoneNumber}</p>
                      <h6 className="mb-0">{options.tollFreeTitle}</h6>
                      <p className="text-primary">{options.tollFree}</p>
                      <h6 className="mb-0">{options.faxTitle}</h6>
                      <p className="text-primary">{options.faxNumber}</p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FooterCTAs featured={cta} />
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query ContactSupportTemplateQuery($id: String!) {
    # selecting the current page by id
    page: wpPage(id: { eq: $id }) {
      ...PageDetails
      ...FooterCTAs
      acfTemplateContactSupport {
        accessSupportLink {
          target
          title
          url
        }
        accessSupportTitle
        contactSalesDescription
        showForm
        emailLink
        contactSalesLink {
          target
          title
          url
        }
        contactSalesTitle
        phoneNumbers {
          phoneNumber
          phoneNumberLabel
        }
      }
    }
  }
`

export default ContactSupportTemplate