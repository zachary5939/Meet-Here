const router = require("express").Router();
const { Op } = require("sequelize");
const {
  Group,
  Membership,
  GroupImage,
  User,
  Venue,
  EventImage,
  Event,
  Attendance,
} = require("../../db/models");

const { requireAuth } = require("../../utils/auth.js");
const {
  handleValidationErrors,
  getVenue,
} = require("../../utils/validation.js");

//get all groups
router.get("/", async (req, res) => {
  let groups = await Group.findAll();

  // getting the image
  for (const group of groups) {
    let members = await Membership.count({ where: { groupId: group.id } });
    group.dataValues.numMembers = members;

    let groupImage = await group.getGroupImages({
      where: { preview: true },
      attributes: ["url"],
    });

    if (groupImage[0]) {
      group.dataValues.previewImage = groupImage[0].dataValues.url;
    } else {
      group.dataValues.previewImage = null;
    }
  }

  return res.status(200).json({
    Groups: groups,
  });
});

module.exports = router;
