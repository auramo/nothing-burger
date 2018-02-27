import React from 'react'
import * as R from 'ramda'

const currentLocation = () => window.location.pathname + window.location.search
let navigateToListener = null

export const navigateTo = (location, title) => {
  history.pushState({}, title || '', location)
  if (navigateToListener) navigateToListener(location)
}

export class Router extends React.Component {
  constructor (props) {
    super(props)
    this.state = {location: currentLocation()}
  }
  componentDidMount() {
    window.onpopstate = () => {
      this.setState({location: currentLocation()})
    }
    navigateToListener = (location) => this.setState({location})
  }
  render() {
    const route = R.find(route => route.route.match(this.state.location))(this.props.routes)
    if (route) {
      return React.createElement(route.component, route.route.match(this.state.location))
    }
    return <div>Client route not found</div>
  }
}