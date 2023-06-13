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
      //destructuring assignment
      //extracts url from groupImages in array
      //if doesnt exist, return null to url variable
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

//get current member logged in
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
  //repeat from lines 34 thru 62 to get return
  const currentGroups = await Promise.all(
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

  res.json({ Groups: currentGroups });
});

//get by Id, association required
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

//creating groups DOUBLE CHECK BOOLEAN IF IT WORKS
router.post("/", requireAuth, handleValidationErrors, async (req, res) => {
  const userId = req.user.id;
  const groups = {
    organizerId: userId,
    name: req.body.name,
    about: req.body.about,
    type: req.body.type,
    private: Boolean(req.body.private),
    city: req.body.city,
    state: req.body.state,
  };

  const validationErrors = validateGroups(groups);

  if (Object.keys(validationErrors).length > 0) {
    res.status(400).json({
      message: "Bad Request",
      errors: validationErrors,
    });
    return;
  }

  try {
    const group = await Group.create(groups);
    res.status(201).json({
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
    });
  } catch (error) {
    handleCreateGroupError(error, res);
  }
});

function validateGroups(groups) {
  const validationErrors = {};

  if (!groups.name || groups.name.length > 60) {
    validationErrors.name = "Name must be 60 characters or less";
  }

  if (!groups.about || groups.about.length < 50) {
    validationErrors.about = "About must be 50 characters or more";
  }

  if (!groups.type || !["Online", "In person"].includes(groups.type)) {
    validationErrors.type = "Type must be 'Online' or 'In person'";
  }

  if (!groups.private || !Boolean(groups.private)) {
    validationErrors.private = "Private must be a boolean";
  }

  if (!groups.city) {
    validationErrors.city = "City is required";
  }

  if (!groups.state) {
    validationErrors.state = "State is required";
  }

  return validationErrors;
}

function handleCreateGroupError(error, res) {
  if (error.name === "SequelizeValidationError") {
    const errors = {};

    for (let field of Object.keys(error.errors)) {
      errors[field] = error.errors[field].message;
    }

    res.status(400).json({
      message: "Validation error",
      errors,
    });
  } else {
    res.status(400).json({ message: "Bad Request" });
  }
}

//add image to group ID, auth required successful
router.post("/:groupId/images", requireAuth, async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { id: userId } = req.user;
      const { url, preview } = req.body;

      const group = await Group.findByPk(groupId);
      if (!group) {
        const error = new Error("Group couldn't be found");
        error.status = 404;
        throw error;
      }

      const isNotAuthorized = group.organizerId !== userId;
      if (isNotAuthorized) {
        const error = new Error("Forbidden");
        error.status = 403;
        throw error;
      }

      const newGroupImage = await GroupImage.create({ groupId, url, preview });
      await group.addGroupImage(newGroupImage);

      const createdImage = await GroupImage.findByPk(newGroupImage.id, {
        attributes: ["id", "url", "preview"],
      });

      return res.json(createdImage);
    } catch (error) {
      console.error(error);
      const status = error.status || 500;
      const message = error.message || "Internal Server Error";
      return res.status(status).json({ message });
    }
  });



module.exports = router;
