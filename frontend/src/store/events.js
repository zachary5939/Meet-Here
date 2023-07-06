import { csrfFetch } from "./csrf";

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

// Thunks
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
  const response = await fetch(`/api/events/${eventId}`);
  const resBody = await response.json();
  if (response.ok) dispatch(getEventDetail(resBody));
  return resBody;
};

const initialState = {};

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
      default:
          return state;
  }
};


export default eventsReducer;
