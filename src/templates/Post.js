import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser"
import { embedUrl } from "../common/utils/helpers"
import Hero from '../common/ui/Hero'
import NewsletterSignup from "../components/NewsletterSignup"
import SocialShare from "../components/SocialShare"
import PostCard from '../common/ui/cards/PostCard'
import FooterCTAs from '../common/ui/FooterCTAs'
import Layout from "../containers/Layout"

const PostTemplate = ({ data: { previous, next, post } }) => {
  const acf = post.acfPostTypeNews
  const featuredImage = {
    fluid: acf?.mainImage?.localFile?.childImageSharp?.gatsbyImageData,
    alt: acf?.mainImage?.altText || ``
  }
  const postCategory = {
    categoryName: post.categories.nodes[0].name,
    categorySlug: post.categories.nodes[0].slug
  }
  const hero = {
    heroHeading: postCategory.categoryName
  }

  // console.log(acf.postVideo)

  const { cta } = post.acfFooterCTAs

  // Related Post Logic
  const nodes = post.tags.nodes.length > 0
    ? post.tags.nodes
    : post.categories.nodes

  const relatedPosts = nodes.map(node => {
    const { posts: { nodes } } = node
    const qualifiedPosts = nodes.filter(rp => rp.id !== post.id && rp.acfPostTypeNews.mainImage)
    return qualifiedPosts
  }).reduce((a, b) => [...a, ...b]).slice(0, 3)

  return (
    <Layout>
      <Hero hero={hero} />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <header>
                <h1>{parse(post.title)}</h1>
                <hr />
                <p className="text-mid">{post.date}</p>
              </header>
              {featuredImage?.fluid && (
                <GatsbyImage
                  image={featuredImage.gatsbyImageData}
                  alt={featuredImage.alt}
                  style={{ marginBottom: 50 }} />
              )}
              {!!post.content && (
                <div itemProp="articleBody">{parse(post.content)}</div>
              )}
              {acf.postVideo.videoEmbed && (
                <div className="responsive-iframe aspect-16x9 mt-5">
                  <iframe src={embedUrl(acf.postVideo.videoEmbed)} title={acf.postVideo.videoTitle ? acf.postVideo.videoTitle : post.title} />
                </div>
              )}
            </div>
            <div className="col-lg-3 ml-lg-auto">
              <hr />
              <h6>Related Posts</h6>
              <div className="row">
                {relatedPosts.length > 0 && relatedPosts.map(relatedPost => {
                  return (
                    <div key={relatedPost.id} className="col-12 col-sm-4 col-lg-12">
                      <Link to={relatedPost.uri}>
                        <PostCard post={relatedPost} className={`grayscale-hover`} />
                      </Link>
                    </div>
                  )
                })}
              </div>
              <div className="border-bracket mt-5 text-center">
                <p>Want more news? Sign up here for the latest industry news and events.</p>
              </div>
              <NewsletterSignup />

              <SocialShare />
            </div>
          </div>
        </div>
      </section>
      {cta && (
        <FooterCTAs featured={cta} />
      )}
    </Layout>
  );
}

export const postQuery = graphql`
  query PostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      ...PostDetails
      ...RelatedPosts
    }
    # previous and next be able to be migrated to PostFields fragment not sure?
    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`

export default PostTemplate
