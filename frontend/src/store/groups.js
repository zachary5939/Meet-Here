import { csrfFetch } from "./csrf";

//variables for GETs
const GET_ALL_GROUPS = "groups/GET_ALL_GROUPS";
const GET_ONE_GROUP = "groups/GET_ONE_GROUP";

//actions
const getAllGroups = (groups) => {
    return {
        type: GET_ALL_GROUPS,
        groups,
    };
};

const getOneGroup = (group) => {
    return {
        type: GET_ONE_GROUP,
        group,
    };
};

//thunks

//get all groups
export const thunkGetAllGroups = () => async (dispatch) => {
    const response = await csrfFetch("/api/groups");
    const resBody = await response.json();

    const groups = {};
    resBody["Groups"].forEach((group) => (groups[group.id = group]));

    if (response.ok) dispatch(getAllGroups(groups));
    return resBody;
}

const initialState = {};

// reducer

const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_GROUPS: {
        return { ...state, getAllGroups: action.groups };
      }
      case GET_ONE_GROUP: {
        return { ...state, getOneGroup: action.group };
      }
      default:
        return state;
    }
  };


export default groupsReducer;
