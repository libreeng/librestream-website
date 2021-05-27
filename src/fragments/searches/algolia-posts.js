
`{
    pages: allWpPost {
      edges{ 
        node {
          id
          nodeType
          title
          link
          excerpt
          content
          seo {
            metaDesc
            metaKeywords
          }
          acfPostTypeNews {
            mainImage {
              localFile {
                publicURL
                childImageSharp {
                    gatsbyImageData(width: 400, quality: 100, layout: CONSTRAINED)
                }
              }
            }
          }
          tags {
            nodes {
              name
            }
          }
        }
      }
    }
}`
