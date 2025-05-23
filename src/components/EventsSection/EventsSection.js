import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "./EventsSection.css";
import { config } from "../../config";
import Airtable from "airtable";
import EventModal from "../EventModal/EventModal";

// Configure Airtable
Airtable.configure({
  endpointUrl: config.airtable.endpointUrl,
  apiKey: config.airtable.apiKey,
});

const base = Airtable.base(config.airtable.baseId);
const table = base(config.airtable.calendarTableId);

const EventsSection = () => {
  const [specialEvents, setSpecialEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [calendarView, setCalendarView] = useState("dayGridMonth");

  const fetchSpecialEvents = async () => {
    try {
      const records = await table.select().all();

      const transformedEvents = records
        .map((record) => {
          const fields = record.fields;
          return {
            id: record.id,
            title: fields.title || "Unnamed Event",
            start: fields.startDate,
            end: fields.endDate,
            description: fields.description || "",
            allDay: false,
            color: "#326308",
            textColor: "#ffffff",
            active: Boolean(fields.active ?? false), // Default to true if not specified
          };
        })
        // Filter out inactive events
        .filter((event) => event.active);

      setSpecialEvents(transformedEvents);
    } catch (err) {
      console.error("Error fetching special events:", err);
      setSpecialEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialEvents();
  }, []);

  const handleEventClick = (info) => {
    document.body.classList.add("modal-open");
    setSelectedEvent(info.event);
  };

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    setSelectedEvent(null);
  };

  const closeFullCalendar = () => {
    setShowFullCalendar(false);
  };

  const handleViewChange = (viewType) => {
    setCalendarView(viewType);
  };

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
    <>
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

          {loading ? (
            <p>Loading special events...</p>
          ) : upcomingSpecialEvents.length > 0 ? (
            <div className="events-grid">
              {upcomingSpecialEvents.map((event) => {
                const eventDate = new Date(event.start);
                const endDate = new Date(event.end);
                const day = eventDate
                  .toLocaleDateString("en-US", { weekday: "short" })
                  .toUpperCase();
                const date = eventDate.toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                });
                const startTime = eventDate.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                });
                const endTime = endDate.toLocaleTimeString("en-US", {
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
                      <span className="date">{date}</span>
                      <span className="day">{day}</span>
                      <span className="time">
                        {event.allDay ? (
                          "ALL DAY"
                        ) : (
                          <>
                            {startTime}
                            <p className="center">to</p>
                            {endTime}
                          </>
                        )}
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
          {specialEvents.length > 0 && (
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
          )}

          {/* Full Calendar Modal */}
          {specialEvents.length > 0 && showFullCalendar && (
            <div className="full-calendar-overlay">
              <div className="full-calendar-modal">
                <div className="full-calendar-header">
                  <h2>Special Events Calendar</h2>
                  <div className="view-buttons">
                    <button
                      className={
                        calendarView === "dayGridMonth" ? "active" : ""
                      }
                      onClick={() => handleViewChange("dayGridMonth")}
                    >
                      Month
                    </button>
                    <button
                      className={
                        calendarView === "timeGridWeek" ? "active" : ""
                      }
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

      {/* Render modal outside the section */}
      <EventModal event={selectedEvent} onClose={closeModal} />
    </>
  );
};

export default EventsSection;
