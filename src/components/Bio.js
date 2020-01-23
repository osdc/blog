/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import logo from "../../content/assets/osdc.png"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/osdc.png/" }) {
        childImageSharp {
          fixed(width: 30, height: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <img
        src={logo}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          height: rhythm(2),
        }}
      />
      <p>
        Written by the folks at the <strong>{author}</strong> who live in and
        around JIIT, Noida, India.
      </p>
    </div>
  )
}

export default Bio
