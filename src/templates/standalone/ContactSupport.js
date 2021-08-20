/* eslint-disable no-unused-vars */
import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import SEO from "../../containers/SEO"
import { useSiteFooter } from '../../common/hooks/useSiteFooter'
import Hero from "../../common/ui/Hero"
import FooterCTAs from '../../common/ui/FooterCTAs'
import Layout from "../../containers/Layout"
import { Helmet } from "react-helmet"

const ContactSupportTemplate = ({ data: { page } }) => {
  const acf = page.acfTemplateContactSupport
  const { options } = useSiteFooter()
  const hero = {
    heroHeading: page.title
  }
  const { cta } = page.acfFooterCTAs

  return (
    <>
      <Helmet
        script={[        
          {
            type: `text/javascript`,
            src: `https://www.google.com/recaptcha/api.js`,
            async: true,
            defer: true
          },
          {
            type: `text/javascript`,
            innerHTML: `
              function recaptcha_callback(){
                document.getElementById("submitBtn").removeAttribute("disabled");
              }
              function timestamp() { var response = document.getElementById("g-recaptcha-response"); if (response == null || response.value.trim() == "") {var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);elems["ts"] = JSON.stringify(new Date().getTime());document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems); } } setInterval(timestamp, 500); 
            `
          }
        ]}
      />
      {/* <Helmet
        script={[        
          {
            type: `text/javascript`,
            src: `https://www.recaptcha.net/recaptcha/api.js?onload=onloadCallback&render=explicit`,
            async: true,
            defer: true
          },
          {
            type: `text/javascript`,
            innerHTML: ` 
            var onloadCallback = function() {          
              grecaptcha.ready(function() {             
                grecaptcha.render('g-recaptcha', {
                  'sitekey' : '${process.env.GATSBY_RECAPTCHA_SITE_KEY}',
                  'theme' : 'light',
                  'callback' : recaptcha_callback,
                });
              });
            }
            function recaptcha_callback(){
              document.getElementById("submitBtn").removeAttribute("disabled");
            }
            function timestamp() { var response = document.getElementById("g-recaptcha-response"); if (response == null || response.value.trim() == "") {var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);elems["ts"] = JSON.stringify(new Date().getTime());document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems); } } setInterval(timestamp, 500); 

            `
          }
        ]}
      /> */}
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
                <hr className="hr-styled" />
              </div>
            </div>
          </div>
        </section>
        <section className="pt-0">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-8">
                <form action="https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8" method="POST">
    
                  <input type="hidden" name='captcha_settings' value='{"keyname":"librestreamSupportForm","fallback":"true","orgId":"00DA0000000J3qY","ts":""}'/>
                  <input type="hidden" name="orgid" value="00DA0000000J3qY"/>
                  <input type="hidden" name="retURL" value="https://librestream.com/support-request-confirmation/"/>
                  
                  
                  <label for="name" className="required-field">Contact Name</label>
                  <input  id="name" maxlength="80" name="name" size="20" type="text" required /><br/>
                  
                  <label for="email" className="required-field">Email</label><input  id="email" maxlength="80" name="email" size="20" type="text" required /><br/>
                  
                  <label for="phone">Phone</label><input  id="phone" maxlength="40" name="phone" size="20" type="text" /><br/>
                  
                  <label for="subject" className="required-field">Subject</label><input  id="subject" maxlength="80" name="subject" size="20" type="text" required /><br/>
                  
                  <label for="description" className="required-field">Description</label><textarea name="description" required></textarea>
                  <br/>
                  
                  <input type="hidden"  id="external" name="external" value="1" /><br/>        

                  <div className="g-recaptcha" data-sitekey="6Lc_xAwcAAAAAJnAfAiwBIfoSpuSbHAK33N6SNZb" data-callback="recaptcha_callback"></div>
                  <br/>
                  <input type="submit" name="submit" id="submitBtn" disabled="true" className="button"/>
                  
                </form>
                  {/* {acf.showForm && !!page.content ? 
                    <>{parse(page.content)}</>
                  :
                    <>{parse(acf.emailLink)}</>
                  } */}
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