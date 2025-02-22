import { graphql } from "gatsby"

export const RelatedPosts = graphql`fragment RelatedPosts on WpPost {
  categories {
    nodes {
      name
      posts {
        nodes {
          title
          uri
          id
          acfPostTypeNews {
            summaryImage {
              altText
              srcSet
              sourceUrl
              localFile {
                publicURL
                childImageSharp {
                  gatsbyImageData(width: 500, quality: 100, layout: CONSTRAINED, formats: [JPG])
                }
              }
            }
            mainImage {
              altText
              srcSet
              sourceUrl
              localFile {
                publicURL
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: FULL_WIDTH, formats: [JPG])
                }
              }
            }
          }
        }
      }
    }
  }
  tags {
    nodes {
      name
      posts {
        nodes {
          title
          uri
          id
          acfPostTypeNews {
            summaryImage {
              altText
              srcSet
              sourceUrl
              localFile {
                publicURL
                childImageSharp {
                  gatsbyImageData(width: 500, quality: 100, layout: CONSTRAINED, formats: [JPG])
                }
              }
            }
            mainImage {
              altText
              srcSet
              sourceUrl
              localFile {
                publicURL
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: FULL_WIDTH, formats: [JPG])
                }
              }
            }
          }
        }
      }
    }
  }
}
`