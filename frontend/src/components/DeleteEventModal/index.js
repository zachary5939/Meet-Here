import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal.js";
import { useHistory } from "react-router-dom";
import { thunkDeleteEvent } from '../../store/events.js'
import "./DeleteGroup.css";

export function DeleteEvent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const eventId = useSelector(state => state.events.singleEvent);
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteEvent(eventId));
    closeModal();
    history.push(`/events/`);
  };

  return (
    <div className="delete-group-modal">
        <h1 className="delete-group-modal-title">Confirm Delete</h1>
        <span className="message">Are you sure you want to remove this event?</span>
        <div className="delete-group-modal-buttons">
            <button className="yes" onClick={handleDelete}>Yes (Delete Event)</button>
            <button className="no" onClick={closeModal}>No (Keep Event)</button>
        </div>
    </div>
  );
}

export default DeleteEvent;
