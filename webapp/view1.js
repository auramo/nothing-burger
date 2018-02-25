import React from 'react'
import Header from './header'

export default (params) => <div>
   <Header selectedTab="tab1"/>
    <div className="view-content">
      <div>View 1 contents</div>
      {
        params.p1
          ? <div>Param value: {params.p1}</div>
          : null
      }
    </div>
  </div>
