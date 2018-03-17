import React from 'react'
import * as R from 'ramda'

const currentLocation = () => window.location.pathname + window.location.search

export const navigateTo = (location, title) => {
  history.pushState({}, title || '', location)
  const navigationEvent = document.createEvent('Event')
  navigationEvent.initEvent('routerNavigateTo', false, false)
  navigationEvent.location = location
  window.dispatchEvent(navigationEvent)
}

export const Link = props =>
  <a {...props}
     onClick={evt => { evt.preventDefault(); navigateTo(props.href) }}>
     {props.children}
  </a>

export class Router extends React.Component {
  constructor (props) {
    super(props)
    this.state = {location: currentLocation()}
  }
  componentDidMount() {
    window.onpopstate = () => {
      this.setState({location: currentLocation()})
    }
    this.navigateToListener = ({location}) => {
      this.setState({location})
    }
    window.addEventListener('routerNavigateTo', this.navigateToListener)
  }
  componentWillUnmount() {
    window.removeEventListener(this.navigateToListener)
  }
  render() {
    const route = R.find(route => route.route.match(this.state.location))(this.props.routes)
    if (route) {
      return React.createElement(route.component, route.route.match(this.state.location))
    }
    return <div>Client route not found</div>
  }
}
