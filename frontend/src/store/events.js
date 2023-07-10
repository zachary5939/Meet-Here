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

const createEvent = (event) => ({
  type: CREATE_EVENT,
  event,
});

const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  eventId,
});

// Thunks
export const thunkCreateEvent = (event, groupId, imageURL) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(event)
  })
  if (res.ok){
    const data = await res.json()
    const res2 = await csrfFetch(`/api/events/${data.id}/images`, {
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"url":imageURL.toString(), "preview": true})
    })
    if (res2.ok) {
      const data2 = await res2.json()
      dispatch(createEvent(data2))
      return window.location.href = `/events/${data.id}`
    } else {
      dispatch(createEvent(data))
    }
  } alert("Cant find group!")
}

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
  const res = await csrfFetch(`/api/events/${eventId}`);
  if (res.ok) {
      const data = await res.json();
      dispatch(getEventDetail(data));
      return data;
  }
}

export const thunkGetEventsByGroup = (groupId) => async(dispatch) => {
  const res = await fetch(`/api/groups/${groupId}/events`)
  if (res.ok) {
      const data = await res.json()
      dispatch(getEventDetail(data))
      return data
  }
}

export const thunkDeleteEvent = (eventId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/events/${eventId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(deleteEvent(eventId));
    } else {
      throw new Error("Failed to delete event");
    }
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};

const initialState = { allEvents: {}, singleEvents: {} };

// Reducer
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_ALL_EVENTS: {
          const newState = {...state};
          action.events.Events.forEach(event => {
            newState.allEvents[event.id] = event
          });
          return newState;
      }
      case GET_EVENT_DETAIL: {
          const newState = { ...state }
          newState.singleEvents = { [action.event.event.id]: action.event };
          return newState;
      }
        case CREATE_EVENT: {
      const allEvents = {
        ...state.allEvents,
        [action.event.id]: action.event,
      };
      const singleEvent = {
        ...action.event,
        EventImages: [],
      };
      return { ...state, allEvents, singleEvent };
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
