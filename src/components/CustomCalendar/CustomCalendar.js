import React, { useState, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import './CustomCalendar.css';


const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export default function CustomCalendar({ initialEvents = [] }) {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

  const handleAddEvent = () => {
    setEvents(prev => [...prev, { ...newEvent, start: new Date(newEvent.start), end: new Date(newEvent.end) }]);
    setNewEvent({ title: '', start: '', end: '' });
  };

  const eventStyleGetter = (event) => {
    const isPast = event.end < new Date();
    const backgroundColor = isPast ? '#d3d3d3' : '#5d9cec';
    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '4px',
        padding: '2px 4px',
      }
    };
  };

  return (
    <div className="calendar-container" style={{ padding: '1rem', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
          className="input"
        />
        <input
          type="datetime-local"
          value={newEvent.start}
          onChange={e => setNewEvent({ ...newEvent, start: e.target.value })}
          className="input"
        />
        <input
          type="datetime-local"
          value={newEvent.end}
          onChange={e => setNewEvent({ ...newEvent, end: e.target.value })}
          className="input"
        />
        <button onClick={handleAddEvent} className="btn btn-primary">Add Event</button>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        popup
        selectable
        onSelectEvent={event => alert(`You clicked on: ${event.title}`)}
        onSelectSlot={slotInfo => {
          const title = window.prompt('New event title');
          if (title) {
            setEvents(prev => [...prev, { title, start: slotInfo.start, end: slotInfo.end }]);
          }
        }}
        components={{
          toolbar: props => (
            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
              <button onClick={() => props.onNavigate('PREV')} className="btn">&lt;</button>
              <span style={{ margin: '0 1rem', fontWeight: 'bold' }}>{props.label}</span>
              <button onClick={() => props.onNavigate('NEXT')} className="btn">&gt;</button>
              <button onClick={() => props.onView('month')} className="btn">Month</button>
              <button onClick={() => props.onView('week')} className="btn">Week</button>
              <button onClick={() => props.onView('day')} className="btn">Day</button>
            </div>
          )
        }}
      />
    </div>
  );
}
