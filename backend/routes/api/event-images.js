const express = require("express");
const router = express.Router();
const { Group, Membership, EventImage, Event } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");


router.delete('/:imageId', requireAuth, async (req, res) => {
  const { id: currUserId } = req.user;
  const imageId = parseInt(req.params.imageId);

  try {
    const imageToDelete = await findEventImageById(imageId);

    if (!imageToDelete) {
      return sendErrorResponse(res, 404, "Event Image not found");
    }

    const event = await findEventById(imageToDelete.eventId);

    if (!event || !event.Group) {
      return sendErrorResponse(res, 404, "Event or Group not found");
    }

    const group = event.Group;

    const membershipStatus = await findMembershipStatus(group.id, currUserId);

    const hasValidRole =
      group.organizerId === currUserId ||
      membershipStatus?.status === "co-host";

    if (!hasValidRole) {
      return sendErrorResponse(res, 403, "Unauthorized");
    }

    await imageToDelete.destroy();
    res.json({
      message: "Successfully deleted",
    });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Internal server error");
  }
});

async function findEventImageById(id) {
  return EventImage.findByPk(id);
}

async function findEventById(id) {
  return Event.findByPk(id, {
    include: [{ model: Group }],
  });
}

async function findMembershipStatus(groupId, userId) {
  return Membership.findOne({
    attributes: ["status"],
    where: {
      groupId,
      userId,
    },
  });
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

module.exports = router;
