import { csrfFetch } from "./csrf";

const CREATE_EVENT = "events/CREATE_EVENT"; // Updated action type
const DELETE_EVENT = "events/DELETE_EVENT";
const GET_ALL_EVENTS = "events/GET_ALL_EVENTS";
const GET_EVENT_DETAIL = "events/GET_EVENT_DETAIL";

const getAllEvents = (events) => ({
  type: GET_ALL_EVENTS,
  events,
});

const getEventDetail = (event) => ({
  type: GET_EVENT_DETAIL,
  event,
});

const createEvent = (event) => ({ // Updated action creator name
  type: CREATE_EVENT,
  event,
});

const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  eventId,
});

// Thunks
export const thunkCreateEvent = (event, groupId, img) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  });

  if (res.ok) {
    const data = await res.json();
    const imgRes = await csrfFetch(`/api/events/${data.id}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: img,
        preview: true,
      }),
    });

    if (imgRes.ok) {
      const newImg = await imgRes.json();
      data.EventImages = [newImg];
      dispatch(createEvent(data)); // Dispatch the createEvent action
      return data;
    } else {
      console.error('Error creating event image:', imgRes);
      // Handle the error appropriately (display an error message, etc.)
    }
  } else {
    const errorData = await res.json();
    console.error('Error creating event:', errorData);
    // Handle the error appropriately (display an error message, etc.)
    return errorData;
  }
};

export const thunkGetAllEvents = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/events");

    if (res.ok) {
      const data = await res.json();
      dispatch(getAllEvents(data));
      return data;
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

export const thunkGetEventDetail = (eventId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/events/${eventId}`);

    if (response.ok) {
      const resBody = await response.json();
      dispatch(getEventDetail(resBody));
      return resBody;
    }
  } catch (error) {
    console.error("Error fetching event detail:", error);
  }
};

export const thunkDeleteEvent = (eventId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/events/${eventId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(deleteEvent(eventId));
      return data;
    }
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};

const initialState = {};

// Reducer
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EVENTS: {
      const newState = { ...state };
      action.events.Events.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    }
    case GET_EVENT_DETAIL: {
      const newState = { ...state, [action.event.id]: action.event };
      return newState;
    }
    case CREATE_EVENT: {
      const newState = { ...state, [action.event.id]: action.event };
      return newState;
    }
    case DELETE_EVENT: {
      const newState = { ...state };
      delete newState[action.eventId];
      return newState;
    }
    default:
      return state;
  }
};

export default eventsReducer;
