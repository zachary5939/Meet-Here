import { csrfFetch } from "./csrf";


//variables for GETs
const GET_ALL_GROUPS = "groups/GET_ALL_GROUPS";
const GET_ONE_GROUP = "groups/GET_ONE_GROUP";
const CREATE_GROUP = "groups/CREATE_GROUP";
const ADD_GROUP_IMG = "groups/ADD_GROUP_IMG";
const DELETE_GROUP = "groups/DELETE_GROUP";
const GET_GROUP_DETAILS = 'groups/groupDetails';

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

const createGroup = (group) => {
  return {
    type: CREATE_GROUP,
    group,
  }
}

const deleteGroup = (groupId) => {
  return {
    type: DELETE_GROUP,
    groupId,
  };
};

const addGroupImg = (groupImage) => {
  return {
    type: ADD_GROUP_IMG,
    groupImage,
  };
};

const updateGroup = (updatedGroup) => {
  return {
    type: "UPDATE_GROUP",
    group: updateGroup,
  }
}

const actionGetGroupDetails = (data) => {
  return {
      type: GET_GROUP_DETAILS,
      payload: data
  }
}

export const thunkGetAllGroups = () => async (dispatch) => {
  const response = await fetch("/api/groups");
  const resBody = await response.json();

  const groups = {};
  resBody["Groups"].forEach((group) => (groups[group.id] = group));

  if (response.ok) dispatch(getAllGroups(groups));
  return resBody;
};

export const thunkGetOneGroup = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}`);
  const resBody = await response.json();
  if (response.ok) dispatch(getOneGroup(resBody));
  return resBody;
};

export const thunkCreateGroup = (group, img) => async(dispatch) => {
  const res = await csrfFetch('/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(group)
  });

  console.log('Create Group Response:', res);

  if (res.ok) {
      const data = await res.json();

      console.log('Create Group Data:', data);

      const imgRes = await csrfFetch(`/api/groups/${data.id}/images`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({
              url: img,
              preview: true
          })
      });

      console.log('Add Group Image Response:', imgRes);

      const newImg = await imgRes.json();
      data.GroupImages = [newImg];
      dispatch(createGroup([data]));
      return data;
  } else {
      const errorData = await res.json();
      return errorData;
  }
};


export const thunkUpdateGroup = (groupId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const resBody = await response.json();
  if (response.ok) {
    dispatch(updateGroup(resBody));
  }
  return resBody;
};

export const thunkDeleteGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE",
  });
  const resBody = await response.json();
  if (response.ok) dispatch(deleteGroup(groupId));
  return resBody;
};

export const thunkAddGroupImage = (groupImage, groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/images`, {
    method: "POST",
    body: JSON.stringify(groupImage),
  });
  const resBody = await response.json();
  if (response.ok) dispatch(addGroupImg(groupImage));
  return resBody;
};

export const thunkUpdateGroupImage =
  (groupImage, groupId) => async (dispatch) => {
    await csrfFetch(`/api/group-images/${groupImage.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupImage),
    });

    const response = await csrfFetch(`/api/groups/${groupId}/images`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupImage),
    });
    const resBody = await response.json();
    if (response.ok) dispatch(addGroupImg(groupImage));
    return resBody;
  };

  export const thunkGetGroupDetails = (groupId) => async(dispatch) => {
    const res = await fetch(`/api/groups/${groupId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetGroupDetails(data))
        return data
    } else {
        const errorData = await res.json()
        return errorData
    }
}


  //init state
const initialState = { allGroups: {}, singleGroup: {} };
//reducer

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GROUPS: {
      return { ...state, allGroups: action.groups };
    }
    case GET_ONE_GROUP: {
      return { ...state, singleGroup: action.group };
    }
    case CREATE_GROUP: {
      const allGroups = {
        ...state.allGroups,
        [action.group.id]: action.group,
      };
      const singleGroup = {
        ...action.group,
        Organizer: { id: action.group.organizerId },
        GroupImages: [],
      };
      return { ...state, allGroups, singleGroup };
    }
    case DELETE_GROUP: {
      const allGroups = { ...state.allGroups };
      delete allGroups[action.groupId];
      return { allGroups, singleGroup: {} };
    }
    case ADD_GROUP_IMG: {
      const singleGroup = {
        ...state.singleGroup,
        GroupImages: [action.groupImage],
      };
      return { ...state, singleGroup };
    }
    default:
      return state;
  }
};

export default groupsReducer;
