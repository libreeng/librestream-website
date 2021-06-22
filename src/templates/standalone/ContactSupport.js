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
            src: `https://www.recaptcha.net/recaptcha/api.js?onload=onloadCallback&render=explicit`,
            async: true,
            defer: true
          },
          {
            type: `text/javascript`,
            innerHTML: `
            var recaptchaInitialized = false;     
            var onloadCallback = function() {          
              grecaptcha.ready(function() {             
                grecaptcha.render('g-recaptcha-response', {
                  'sitekey' : '${process.env.GATSBY_RECAPTCHA_SITE_KEY}',
                  'theme' : 'light',
                  'callback' : verifyCallback,
                });
              });         
 
              var form = document.getElementById('recaptcha-form');
              if(!form) return;
              form.onsubmit = function(e) {
                removeRecaptchaError();
                var res = grecaptcha.getResponse();
                if (res == "" || res == undefined || res.length == 0){
                  var el = document.createElement("span");
                  el.innerHTML = "Please check the box to prove you are not a robot";
                  el.id = "recaptcha-error";
                  el.style = "color:red;font-size: 0.8em;";
                  var div = document.getElementById("g-recaptcha-response");
                  div.parentNode.insertBefore(el, div);
                  return false;
                }
                return true;
              }                   
              var verifyCallback = function(response) {
                console.log("Verifing Recaptcha")
                removeRecaptchaError();
              };
              var removeRecaptchaError = function() {
                var errorDiv = document.getElementById("recaptcha-error");
                if(errorDiv !== null) errorDiv.parentNode.removeChild(errorDiv);
              }
              var timestamp = function() {
                var res = grecaptcha.getResponse();
                if (res == null || typeof res === 'undefined' || (res.value && res.value.trim() == "")) {
                  var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);
                  elems["ts"] = JSON.stringify(new Date().getTime());
                  document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems); 
                }                
              } 
              if(document.getElementsByName("captcha_settings").length > 0){
                console.log("captcha settings exist")
                setInterval(timestamp, 500);
              }
            }
            `
          }
        ]}
      />
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
                {acf.showForm && !!page.content ? 
                  <>{parse(page.content)}</>
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