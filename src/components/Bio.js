import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import logo from './osdc.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={logo}
          alt={`Open Source Developers Community`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            height: rhythm(2),
          }}
        />
        <p>
          Written by the folks at the{' '}
          <strong>Open Source Developers Community</strong> who live in and
          around JIIT, Noida, India.
        </p>
      </div>
    )
  }
}
export default Bio
