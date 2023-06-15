const express = require("express");
const { GroupImage, Group, Membership } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const image = await findGroupImageById(imageId);

    if (!image) {
      return sendErrorResponse(res, 404, "Group Image couldn't be found");
    }

    const group = await findGroupById(image.groupId);

    if (!group) {
      return sendErrorResponse(res, 404, "Group couldn't be found");
    }

    const membership = await findMembership(image.groupId, req.user.id, 'co-host');

    if (group.organizerId !== req.user.id && !membership) {
      return sendErrorResponse(res, 403, "Forbidden");
    }

    await image.destroy();
    res.json({
      message: "Successfully deleted",
    });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
});

async function findGroupImageById(id) {
  return GroupImage.findByPk(id);
}

async function findGroupById(id) {
  return Group.findOne({
    where: {
      id: id,
    },
  });
}

async function findMembership(groupId, userId, status) {
  return Membership.findOne({
    where: {
      groupId,
      userId,
      status,
    },
  });
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ message });
}

module.exports = router;
