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

  router.get("/:groupId", async (req, res) => {
    try {
      const groupId = req.params.groupId;

      const group = await Group.findByPk(groupId, {
        include: [
          { model: GroupImage },
          { model: Venue },
          { model: Membership },
          {
            model: User,
            as: "Organizer",
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      });

      if (group) {
        const numMembers = group.Memberships.length;

        const successBody = {
          id: group.id,
          organizerId: group.organizerId,
          name: group.name,
          about: group.about,
          type: group.type,
          private: group.private,
          city: group.city,
          state: group.state,
          createdAt: group.createdAt,
          updatedAt: group.updatedAt,
          numMembers: numMembers,
          GroupImages: group.GroupImages.map((image) => ({
            id: image.id,
            url: image.url,
            preview: image.preview,
          })),
          Organizer: {
            id: group.Organizer.id,
            firstName: group.Organizer.firstName,
            lastName: group.Organizer.lastName,
          },
          Venues: group.Venues.map((venue) => ({
            id: venue.id,
            groupId: venue.groupId,
            address: venue.address,
            city: venue.city,
            state: venue.state,
            lat: venue.lat,
            lng: venue.lng,
          })),
        };

        successBody.Venues.forEach((venue) => {
          delete venue.createdAt;
          delete venue.updatedAt;
        });

        res.status(200).json(successBody);
      } else {
        res.status(404).json({ message: "Group couldn't be found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


module.exports = router;
