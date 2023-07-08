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
  } alert("Cannot find group!")
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
  try {
    const response = await csrfFetch(`/api/events/${eventId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch event details");
    }
    const data = await response.json();
    dispatch(getEventDetail(data));
  } catch (error) {
    console.log(error);
    // Handle error state if needed
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

const initialState = { allEvents: {}, singleEvents: {} };

// Reducer
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_ALL_EVENTS: {
          const newState = {...state};
          action.events.Events.forEach(event => {
              newState[event.id] = event;
          });
          return newState;
      }
      case GET_EVENT_DETAIL: {
          const newState = { ...state, [action.event.id]: action.event };
          return newState;
      }
      case CREATE_EVENT: {
          return {...state, allEvents: {...state.allEvents}, [action.payload.id]: action.payload }
      }
      default:
          return state;
  }
};

export default eventsReducer;
