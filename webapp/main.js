import './app-styles/style.less'
import React from 'react'
import ReactDOM from 'react-dom'

import routes from './routes'
import {Router} from './router'

function renderApp () {
  ReactDOM.render(
    <Router routes={routes}/>
    ,
    document.getElementById('main')
  )
}

renderApp()
