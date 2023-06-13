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

router.get("/", async (req, res) => {
    const groups = await Group.findAll({
      include: {
        model: GroupImage,
        where: {
          preview: true,
        },
        attributes: ["url"],
        required: false,
      },
    });

    const newGroups = await Promise.all(
      groups.map(async (group) => {
        const groupJson = group.toJSON();
        const numMembers = await Membership.count({
          where: {
            groupId: groupJson.id,
            status: {
              [Op.in]: ["co-host", "member"],
            },
          },
        });

        const { url } = groupJson.GroupImages[0]
          ? groupJson.GroupImages[0]
          : { url: null };

        return {
          ...groupJson,
          numMembers,
          previewImage: url,
          GroupImages: undefined,
        };
      })
    );

    res.json({ Groups: newGroups });
  });

  router.get("/current", requireAuth, async (req, res) => {
    const userId = req.user.id;

    const groups = await Group.findAll({
      where: {
        [Op.or]: [
          { organizerId: userId },
          { "$Organizer.id$": userId },
          { "$Users.id$": userId },
        ],
      },
      include: [
        {
          model: User,
          as: "Organizer",
          attributes: [],
        },
        {
          model: User,
          through: {
            attributes: [],
          },
          as: "Users",
          attributes: [],
        },
        {
          model: GroupImage,
          where: {
            preview: true,
          },
          attributes: ["url"],
          required: false,
        },
      ],
    });

    const newGroups = await Promise.all(
      groups.map(async (group) => {
        const groupJson = group.toJSON();
        const numMembers = await Membership.count({
          where: {
            groupId: groupJson.id,
            status: {
              [Op.in]: ["co-host", "member"],
            },
          },
        });

        const { url } =
          groupJson.GroupImages && groupJson.GroupImages[0]
            ? groupJson.GroupImages[0]
            : { url: null };

        return {
          ...groupJson,
          numMembers,
          previewImage: url,
          GroupImages: undefined,
        };
      })
    );

    res.json({ Groups: newGroups });
  });

module.exports = router;
