import React from 'react'
import Header from './header'
import {navigateTo} from './router'

export default (params) => <div>
  <Header selectedTab="tab2"/>
  <div className="view-content">
    <button className="btn btn-primary" onClick={(evt) => navigateTo('/view1/parameterValue')}>
      Link to View 1 with a parameter
    </button>
  </div>
</div>
