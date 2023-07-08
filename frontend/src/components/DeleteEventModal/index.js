import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal.js";
import { thunkDeleteEvent } from '../../store/events.js'

function DeleteEvent({ eventId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const event = useSelector((state) => state.events.singleEvent);
  const group = useSelector((state) => state.groups.singleGroup);
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteEvent(eventId));
    closeModal();
    history.push(`/events/${group.id}`);
  };

  return (
    <div className="delete-modal">
        <h1 className="delete-modal-title">Confirm Delete</h1>
        <span className="delete-modal-message">Are you sure you want to remove this event?</span>
        <div className="delete-modal-buttons">
            <button className="delete-modal-button" onClick={handleDelete}>Yes (Delete Event)</button>
            <button className="delete-modal-button" onClick={closeModal}>No (Keep Event)</button>
        </div>
    </div>
  );
}

export default DeleteEvent;
