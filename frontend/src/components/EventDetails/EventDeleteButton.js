import { useSelector } from "react-redux";


export const EventDeleteButton = ({ event }) => {
    const sessionUser = useSelector((state) => state.session.user);
    let user = false;

    if(!sessionUser) {
        return;
    } else if (event.Group.id === sessionUser.id) {
        user = true;
    }

    return (
        <>
        {user ? (
            <>
                <button>Delete</button>
                </>
      ) : (
        ""
      )}
    </>
  );
};
