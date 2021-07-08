import React from "react"
import Header from '../Header';

const Layout = ({ location, children }) => (
  <div id="page-container">
    <Header location={location}/>
      <div className='wrapper'>
        {children}
      </div>
  </div>
)

export default Layout
