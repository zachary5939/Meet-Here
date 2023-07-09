import { useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteGroupModal from "../DeleteGroupModal";

export const EventDetailButton = ({ event }) => {
  const sessionUser = useSelector((state) => state.session.user);
  let flag = false;

  if (!sessionUser) {
    return;
  } else if (event.Group.Organizer.id === sessionUser.id) {
    flag = true;
  }

  return (
    <>
      {flag ? (
        <>
          <button onClick={() => alert("Feature coming soon!")}>Update</button>
          <div></div>
          <button className="delete-modal-button-event">
            <OpenModalMenuItem
              itemText="Delete"
              modalComponent={<DeleteGroupModal type="event" event={event} />}
            />
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
};
