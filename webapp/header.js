import React from 'react'
import * as R from 'ramda'
import axios from 'axios'
import {Link} from './router'

const tabs = {
  tab1: {label: 'View 1', location: '/view1'},
  tab2: {label: 'View 2', location: '/view2'}
}

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    axios.get('/api/user/')
      .then(resp => this.setState({user: resp.data.user}))
      .catch(err => this.setState({error: err}))
  }
  render () {
    return <header className="navbar">
      <section className="navbar-section">
        {
          R.map(
            ([tab, {label, location}]) =>
              <Link
                key={tab}
                className="btn btn-link"
                href={location}>
                {
                  tab === this.props.selectedTab
                    ? <strong>{label}</strong>
                    : label
                }
              </Link>,
            R.toPairs(tabs)
          )
        }
      </section>
      <section className="navbar-section">
        { this.state.error
          ? <span className="label label-error">{this.state.error.toString()}</span>
          : null
        }
        <span className="text-gray mr-2">{R.path(['user', 'name'], this.state)}</span>
        <a
          className="btn btn-sm mr-2"
          href="/logout">
          Log out
        </a>
      </section>
    </header>
  }
}
