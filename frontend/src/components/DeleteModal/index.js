import React from "react";
import { useModal } from "../../context/Modal";
import { thunkDeleteGroup } from "../../store/groups";
import "./DeleteGroup.css"
import { useDispatch, useSelector } from "react-redux";


function DeleteModal() {
    const { closeModal } = useModal()
    const dispatch = useDispatch();
    const groupStore = useSelector((state) => state.groups);

    function deleteButton() {
        dispatch(thunkDeleteGroup(Object.values(groupStore)[0].id))
        closeModal()
        window.location.href='groups'
    }

    return (
        <div className="delete-modal-container">
            <h2>Delete Confirmation</h2>
            <p>Are you sure you want to delete this?</p>
            <button className="delete-yes" onClick={() => deleteButton()}>Yes (Delete Group)</button>
            <button className="delete-no" onClick={closeModal}>No (Keep Group)</button>
        </div>
    )
}

export default DeleteModal
