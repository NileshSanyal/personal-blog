import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Scroll from '../components/scroll'
import { navigate } from "gatsby"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Scroll showBelow={250} />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const tags = post.frontmatter.tags

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <div style={{
                  display: 'flex',
                  flexFlow: 'row wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: '2%',
                  fontSize: 12,
                  color: '#FF3385',
                  marginTop: '-6%'
                }}>
                  {tags.map((tag) => {
                    return [
                      <div
                        key={tag}
                        variant="outlined"
                        onClick={event => { navigate(`javascript:void(0)`) }}
                        style={{
                          marginRight: '2.5%',
                          marginLeft: '2.5%',
                          cursor: 'auto',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <p>
                          {tag}
                        </p>
                      </div>
                    ]
                  })}
                </div>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          tags
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
