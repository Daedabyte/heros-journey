import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "./EventsSection.css";

const EventsSection = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Friday Night Magic",
      start: "2025-05-16T18:00:00",
      end: "2025-05-16T22:00:00",
      description:
        "Competitive and casual play for Magic: The Gathering enthusiasts.",
      color: "#326308",
      textColor: "#ffffff",
    },
    {
      id: "2",
      title: "Pokemon League",
      start: "2025-05-18T13:00:00",
      end: "2025-05-18T16:00:00",
      description:
        "Weekly meetup for Pokemon players of all ages and skill levels.",
      color: "#ccbb47",
      textColor: "#326308",
    },
    {
      id: "3",
      title: "MTG Pre-Release Weekend",
      start: "2025-05-17T10:00:00",
      end: "2025-05-19T19:00:00",
      description: "Be the first to play with cards from the newest set!",
      allDay: true,
      color: "#326308",
      textColor: "#ffffff",
    },
    {
      id: "4",
      title: "Board Game Night",
      start: "2025-05-16T17:00:00",
      end: "2025-05-16T21:00:00",
      description: "Come try out our extensive library of board games!",
      color: "#ccbb47",
      textColor: "#326308",
    },
    // Adding more events for the current month
    {
      id: "5",
      title: "D&D Campaign",
      start: "2025-05-19T18:00:00",
      end: "2025-05-19T22:00:00",
      description: "Weekly campaign for our regular D&D players.",
      color: "#326308",
      textColor: "#ffffff",
    },
    {
      id: "6",
      title: "Lorcana Tournament",
      start: "2025-05-21T16:00:00",
      end: "2025-05-21T20:00:00",
      description: "Tournament for the hot new Disney Lorcana card game.",
      color: "#ccbb47",
      textColor: "#326308",
    },
    {
      id: "7",
      title: "Friday Night Magic",
      start: "2025-05-23T18:00:00",
      end: "2025-05-23T22:00:00",
      description:
        "Competitive and casual play for Magic: The Gathering enthusiasts.",
      color: "#326308",
      textColor: "#ffffff",
    },
    {
      id: "8",
      title: "Pokemon League",
      start: "2025-05-25T13:00:00",
      end: "2025-05-25T16:00:00",
      description:
        "Weekly meetup for Pokemon players of all ages and skill levels.",
      color: "#ccbb47",
      textColor: "#326308",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  // Display the upcoming events in a list view
  const upcomingEvents = events
    .filter((event) => new Date(event.start) >= new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 4);

  return (
    <section id="events" className="events-section">
      <div className="section-container">
        <h2 className="section-title">Upcoming Events</h2>

        {/* Mobile/List View for Small Screens */}
        <div className="events-grid">
          {upcomingEvents.map((event) => {
            const eventDate = new Date(event.start);
            const day = eventDate
              .toLocaleDateString("en-US", { weekday: "short" })
              .toUpperCase();
            const time = eventDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            });

            return (
              <div
                key={event.id}
                className="event-card"
                onClick={() => setSelectedEvent(event)}
              >
                <div
                  className="event-date"
                  style={{
                    backgroundColor: event.color,
                    color: event.textColor,
                  }}
                >
                  <span className="day">{day}</span>
                  <span className="time">{time}</span>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FullCalendar for Larger Screens */}
        <div className="calendar-container">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,listWeek",
            }}
            events={events}
            eventClick={handleEventClick}
            height="auto"
            aspectRatio={1.35}
          />
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="event-modal-overlay" onClick={closeModal}>
            <div className="event-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={closeModal}>
                ×
              </button>
              <h2>{selectedEvent.title}</h2>
              <p className="event-time">
                <i className="fas fa-calendar-alt"></i>
                {new Date(selectedEvent.start).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="event-time">
                <i className="fas fa-clock"></i>
                {new Date(selectedEvent.start).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(selectedEvent.end).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
              <p className="event-description">
                {selectedEvent.extendedProps?.description ||
                  selectedEvent._def.extendedProps.description}
              </p>
              <button className="register-btn">Register for Event</button>
            </div>
          </div>
        )}

        <a href="#" className="view-all-btn">
          View Full Calendar
        </a>
      </div>
    </section>
  );
};

export default EventsSection;
