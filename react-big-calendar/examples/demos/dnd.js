import React from 'react'
import axios from 'axios'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'

const DragAndDropCalendar = withDragAndDrop(BigCalendar)

class Dnd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }

    this.moveEvent = this.moveEvent.bind(this)
    this.handleSelectSlot = this.handleSelectSlot.bind(this)
    this.resizeEvent = this.resizeEvent.bind(this)
    this.selectEvent = this.selectEvent.bind(this)
  }

  componentDidMount() {
    axios.get('http://9f4bef82.ngrok.io/calendar/events.php?getAll=1')
    .then(res => {
      const events = []
      res.data.forEach(function(entry) {
        entry.start = new Date(entry.start)
        entry.end = new Date(entry.end)
      })
      this.setState({ events: res.data })
    })
  }

  selectEvent({ title, start, end, url, description }) {
    console.log(title)
    var data =
      title + '\r\nDescription ' + description +
      '\r\nStart Time ' + start + '\r\End Time ' +
      end + '\r\URL ' + url

      alert(data)
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state
    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end }
    const nextEvents = [...events]

    nextEvents.splice(idx, 1, updatedEvent)

    var params = new URLSearchParams()
    params.append('update', '1')
    params.append('title', event.title)
    params.append('start', start)
    params.append('end', end)
    params.append('id', event.id)

    // Performing a POST request
    axios.post('http://9f4bef82.ngrok.io/calendar/events.php', params)
    .then(function(response){
      console.log('saved successfully')
    })

    this.setState({
      events: nextEvents,
    })
  }

  handleSelectSlot({start, end}) {
    var title = prompt('Title:')
    var description = prompt('Description:')
    var url = prompt('URL:')
    if (title) {
      var params = new URLSearchParams()
      params.append('add', '1')
      params.append('description', description)
      params.append('title', title)
      params.append('start', start)
      params.append('end', end)
      params.append('url', url)

      axios.post('http://9f4bef82.ngrok.io/calendar/events.php', params)
       .then(function(response){
         console.log('saved successfully')
       })

      this.state.events.push({start: start, end: end, title: "Test"})
      this.setState({})
    }
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state

    var params = new URLSearchParams()
    params.append('update', '1')
    params.append('title', event.title)
    params.append('start', start)
    params.append('end', end)
    params.append('id', event.id)

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    axios.post('http://9f4bef82.ngrok.io/calendar/events.php', params)
    .then(function(response){
      console.log('saved successfully')
    })

    this.setState({
      events: nextEvents,
    })
  }

  render() {
    return (
      <DragAndDropCalendar
        selectable
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable
        onSelectEvent={this.selectEvent}
        onSelectSlot={this.handleSelectSlot}
        onEventResize={this.resizeEvent}
        defaultView="month"
        defaultDate={new Date()}
      />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
