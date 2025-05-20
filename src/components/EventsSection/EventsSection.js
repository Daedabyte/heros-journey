import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "./EventsSection.css";

const EventsSection = () => {
  // Get current date and year/month for creating events
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Regular weekly events (displayed as text, not on calendar)
  const regularEvents = [
    {
      day: "Wednesday",
      title: "Commander Night",
      time: "6:00 PM - 10:00 PM",
      description:
        "Bring your Commander deck and join us for a night of multiplayer Magic.",
      color: "#326308",
    },
    {
      day: "Thursday",
      title: "D&D Night",
      time: "5:00 PM - 10:00 PM",
      description:
        "Weekly Dungeons & Dragons sessions for adventurers of all levels.",
      color: "#326308",
    },
    {
      day: "Friday",
      title: "Friday Night Magic",
      time: "6:00 PM - 10:00 PM",
      description:
        "Competitive and casual play for Magic: The Gathering enthusiasts.",
      color: "#326308",
    },
    {
      day: "Friday",
      title: "Trading Night",
      time: "5:00 PM - 9:00 PM",
      description:
        "Bring your cards to trade with other players in our community.",
      color: "#ccbb47",
    },
    {
      day: "Saturday",
      title: "Community Event",
      time: "12:00 PM - 5:00 PM",
      description:
        "Join us for our weekly community event! Details TBD - check our Discord for more information.",
      color: "#ccbb47",
    },
    {
      day: "Sunday",
      title: "Pokémon League",
      time: "1:00 PM - 4:00 PM",
      description:
        "Weekly meetup for Pokémon players of all ages and skill levels.",
      color: "#ccbb47",
    },
  ];

  // Special events for calendar
  const [specialEvents, setSpecialEvents] = useState([
    {
      id: "1",
      title: "MTG Pre-Release Weekend",
      start: `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-17T10:00:00`,
      end: `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-19T19:00:00`,
      description: "Be the first to play with cards from the newest set!",
      allDay: true,
      color: "#326308",
      textColor: "#ffffff",
    },
    {
      id: "2",
      title: "Lorcana Tournament",
      start: `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-21T16:00:00`,
      end: `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-21T20:00:00`,
      description: "Tournament for the hot new Disney Lorcana card game.",
      color: "#ccbb47",
      textColor: "#326308",
    },
    {
      id: "3",
      title: "Board Game Night - Special Edition",
      start: `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-25T17:00:00`,
      end: `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-25T22:00:00`,
      description: "Extended board game night with prizes and special guests!",
      color: "#326308",
      textColor: "#ffffff",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [calendarView, setCalendarView] = useState("dayGridMonth");

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const toggleFullCalendar = (e) => {
    e.preventDefault();
    setShowFullCalendar(!showFullCalendar);
  };

  const closeFullCalendar = () => {
    setShowFullCalendar(false);
  };

  const handleViewChange = (viewType) => {
    setCalendarView(viewType);
  };

  // Group regular events by day for display
  const groupedRegularEvents = regularEvents.reduce((acc, event) => {
    if (!acc[event.day]) {
      acc[event.day] = [];
    }
    acc[event.day].push(event);
    return acc;
  }, {});

  // Sort days in order: Sunday, Monday, Tuesday, etc.
  const daysOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const sortedDays = Object.keys(groupedRegularEvents).sort(
    (a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
  );

  // Get upcoming special events for card display
  const upcomingSpecialEvents = specialEvents
    .filter((event) => new Date(event.start) >= new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 3);

  return (
    <section id="events" className="events-section">
      <div className="section-container">
        <h2 className="section-title">Events</h2>

        {/* Regular Weekly Events Display */}
        <div className="regular-events-container">
          <h3>Regular Weekly Events</h3>
          <div className="weekly-events-grid">
            {sortedDays.map((day) => (
              <div key={day} className="day-events-card">
                <h4 className="day-title">{day}</h4>
                <div className="day-events">
                  {groupedRegularEvents[day].map((event, index) => (
                    <div
                      key={`${day}-${index}`}
                      className="regular-event-item"
                      style={{ borderLeftColor: event.color }}
                    >
                      <h5>{event.title}</h5>
                      <p className="event-time">{event.time}</p>
                      <p className="event-description">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="events-divider"></div>

        <h3>Special Events</h3>

        {/* Special Events Cards View */}
        {upcomingSpecialEvents.length > 0 ? (
          <div className="events-grid">
            {upcomingSpecialEvents.map((event) => {
              const eventDate = new Date(event.start);
              const day = eventDate
                .toLocaleDateString("en-US", { weekday: "short" })
                .toUpperCase();
              const time = eventDate.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              });

              return (
                <div key={event.id} className="event-card">
                  <div
                    className="event-date"
                    style={{
                      backgroundColor: event.color,
                      color: event.textColor,
                    }}
                  >
                    <span className="day">{day}</span>
                    <span className="time">
                      {event.allDay ? "ALL DAY" : time}
                    </span>
                  </div>
                  <div className="event-details">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-events-message">
            No special events scheduled at this time. Check back soon!
          </p>
        )}

        {/* Calendar View (Special Events Only) */}
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
            events={specialEvents}
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
                <i className="fas fa-calendar-alt"></i>{" "}
                {new Date(selectedEvent.start).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="event-time">
                <i className="fas fa-clock"></i>{" "}
                {selectedEvent.allDay
                  ? "All Day"
                  : `${new Date(selectedEvent.start).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                      }
                    )} - 
                  ${new Date(selectedEvent.end).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}`}
              </p>
              <p className="event-description">
                {selectedEvent.extendedProps?.description ||
                  selectedEvent._def.extendedProps.description}
              </p>
            </div>
          </div>
        )}

        {/* Full Calendar Modal */}
        {showFullCalendar && (
          <div className="full-calendar-overlay">
            <div className="full-calendar-modal">
              <div className="full-calendar-header">
                <h2>Special Events Calendar</h2>
                <div className="view-buttons">
                  <button
                    className={calendarView === "dayGridMonth" ? "active" : ""}
                    onClick={() => handleViewChange("dayGridMonth")}
                  >
                    Month
                  </button>
                  <button
                    className={calendarView === "timeGridWeek" ? "active" : ""}
                    onClick={() => handleViewChange("timeGridWeek")}
                  >
                    Week
                  </button>
                  <button
                    className={calendarView === "listMonth" ? "active" : ""}
                    onClick={() => handleViewChange("listMonth")}
                  >
                    List
                  </button>
                </div>
                <button className="close-modal" onClick={closeFullCalendar}>
                  ×
                </button>
              </div>
              <div className="full-calendar-container">
                <FullCalendar
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    listPlugin,
                    interactionPlugin,
                  ]}
                  initialView={calendarView}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "",
                  }}
                  events={specialEvents}
                  eventClick={handleEventClick}
                  height="auto"
                  aspectRatio={1.5}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
