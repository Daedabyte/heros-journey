import React from "react";
import "./EventModal.css";

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          ×
        </button>
        <h2>{event.title}</h2>
        <p className="event-time">
          <i className="fas fa-calendar-alt"></i>{" "}
          {new Date(event.start).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="event-time">
          <i className="fas fa-clock"></i>{" "}
          {event.allDay
            ? "All Day"
            : `${new Date(event.start).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })} - 
              ${new Date(event.end).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}`}
        </p>
        <p className="event-description">
          {event.extendedProps?.description ||
            event._def.extendedProps.description}
        </p>
      </div>
    </div>
  );
};

export default EventModal;
