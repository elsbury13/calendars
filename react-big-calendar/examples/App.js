import React from 'react'
import Api from './Api'
import cn from 'classnames'
import { render } from 'react-dom'

import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'

localizer(globalize)

import 'react-big-calendar/lib/less/styles.less'
import './styles.less'
import './prism.less'
import Dnd from './demos/dnd'

class Example extends React.Component {
  state = { selected: 'dnd' }

  render() {
    let selected = this.state.selected
    let Current = {
      dnd: Dnd,
    }[selected]

    return (
      <div className="app">
        <div className="jumbotron">
          <div className="container"></div>
        </div>
        <div className="examples">
          <header className="contain"></header>
          <div className="example">
            <Current className="demo" />
          </div>
        </div>
      </div>
    )
  }

  select = (selected, e) => {
    e.preventDefault()
    this.setState({ selected })
  }
}

render(<Example />, document.getElementById('root'))
