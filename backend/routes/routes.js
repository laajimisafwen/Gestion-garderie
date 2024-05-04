const express = require("express");
const router = express.Router();
const User = require("../models/Parent");
const Enfant = require("../models/Enfant");
const Responsable = require("../models/Responsable");
const Parent = require("../models/Parent");
const Evenement = require("../models/Evenement");
const bcrypt = require("bcrypt");

// afficher liste des enfants
router.get("/enfants", async (req, res) => {
    try {
      const enfants = await Enfant.find().populate('parent');
  
      if (enfants.length === 0) {
        return res.status(404).json("No child found !");
      }
  
      res.status(200).json(enfants);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error while retrieving children");
    }
  });

// liste des enfants inscrits
router.get("/enfants/abonne", async (req, res) => {
  try {
    const enfant = await Enfant.where('subscription',true).populate('parent');
    if (!enfant) {
      return res.status(404).json("No child found !");
    }   
    res.status(200).json(enfant);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while retrieving children");
  }
});

// liste des non abonnés
router.get("/enfants/non-abonne", async (req, res) => {
  try {
    const enfant = await Enfant.where('subscription',false).populate('parent');
    if (!enfant) {
      return res.status(404).json("No child found !");
    }

    res.status(200).json(enfant);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while retrieving children");
  }
});

// liste des enfants de chaque parent
router.get("/:userId/enfants", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("enfants");
    if (!user) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(user.enfants);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while retrieving children");
  }
});

// le parent peut ajouter un nouveau enfant
router.post("/:userId/add-enfant", async (req, res) => {
  try {
    const { userId } = req.params;
    const enfantData = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }

    // passer au groupe suivant pour inscrire l'enfant
    async function getNextAvailableGroupForEnfant() {
      const groups = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ]; // liste des groupes
      for (let group of groups) {
        const count = await Enfant.countDocuments({ groupe: group });
        if (count < 10) {
          return group;
        }
      }
      return null; // or handle overflow
    }

    const group = await getNextAvailableGroupForEnfant();
    if (!group) {
      return res.status(400).json("All groups are full");
    }

    const newEnfant = new Enfant({
      ...enfantData,
      parent: userId,
      groupe: group,
    });
    const enfant = await newEnfant.save();

    user.enfants.push(enfant._id);
    await user.save();

    res
      .status(201)
      .json({
        user,
        enfant,
        message: "Child information added successfully to the user",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while adding Child information");
  }
});

// effacer un enfants
router.delete("/enfants/:enfantId", async (req, res) => {
  try {
    const { enfantId } = req.params;

    const enfant = await Enfant.findOneAndDelete({ _id: enfantId });
    if (!enfant) {
      return res.status(404).json("Child not found or already deleted");
    }

    const user = await User.findById(enfant.parent);
    if (!user) {
      return res.status(404).json("User not found");
    }

    user.enfants.pull(enfantId);
    await user.save();

    res.status(200).json({ message: "Child deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while updating child");
  }
});

// modifier les information de l'enfant
router.put("/enfants/:enfantId", async (req, res) => {
  try {
    const { enfantId } = req.params;
    const updates = req.body;

    const enfant = await Enfant.findOneAndUpdate({ _id: enfantId }, updates);
    if (!enfant) {
      return res
        .status(404)
        .json(
          "Child not found or you do not have permission to update this child"
        );
    }

    res.status(200).json({ enfant, message: "Child updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while updating child");
  }
});

// ---------------------------------------------------------------------------------------------------------------

// donner l'accé aux parent
router.put("/parents/access/:parentId", async (req, res) => {
  try {
    const { parentId } = req.params;

    const parent = await Parent.findOneAndUpdate(
      { _id: parentId },
      { access: true }
    );
    if (!parent) {
      return res
        .status(404)
        .json(
          "parent not found or you do not have permission to update this child"
        );
    }

    res.status(200).json({ parent, message: "parent updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while updating parent");
  }
});

// modifier les informations de parent
router.put("/parents/:parentId", async (req, res) => {
  try {
    const { parentId } = req.params;
    const updates = req.body;

    const parent = await Parent.findOneAndUpdate({ _id: parentId }, updates);
    if (!parent) {
      return res
        .status(404)
        .json(
          "parent not found or you do not have permission to update this child"
        );
    }

    res.status(200).json({ parent, message: "parent updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while updating parent");
  }
});

// admin ou responsable peuvent efacer un parent
router.delete("/parents/:parentId", async (req, res) => {
  try {
    const { parentId } = req.params;

    await Enfant.deleteMany({ parent: parentId });

    const parent = await Parent.findOneAndDelete({ _id: parentId });
    if (!parent) {
      return res.status(404).json("parent not found or already deleted");
    }

    res.status(200).json({ message: "parent deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while updating parent");
  }
});

// afficher liste de tous les parents
router.get("/parents", async (req, res) => {
  try {
    const parent = await Parent.find().populate('enfants');
    if (!parent) {
      return res.status(404).json("No parent found !");
    }

    res.status(200).json(parent);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while retrieving parents");
  }
});

// ---------------------------------------------------------------------------------------------------------------

// l'admin peut ajouter un responsable
router.post("/add-responsable", async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Function to get the next available group for the responsable
  async function getNextAvailableGroupForResponsable() {
    const groups = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ]; // liste des groupes ;
    for (let group of groups) {
      const count = await Responsable.countDocuments({ groupe: group });
      if (count < 2) {
        return group;
      }
    }
    return null; // or handle overflow
  }

  const group = await getNextAvailableGroupForResponsable();
  if (!group) {
    return res.status(400).json("Les groupes sont saturés!");
  }

  const responsable = new Responsable({
    username,
    email,
    password: hashedPassword,
    groupe: group,
  });

  try {
    await responsable.save();
    res.status(201).json("responsable added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error adding the responsable");
  }
});

// responsable yaamel login baad mayzidou ladmin
router.post("/responsable-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const responsable = await Responsable.findOne({ email });
    if (!responsable) {
      return res.status(400).json("responsable not found");
    }
    const isMatch = await bcrypt.compare(password, responsable.password);
    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }
    res.json("responsable logged in successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error logging in");
  }
});

// admin peut modifier les informations de responsable
router.put("/responsables/:responsableId", async (req, res) => {
  try {
    const { responsableId } = req.params;
    const updates = req.body;

    const responsable = await Responsable.findOneAndUpdate(
      { _id: responsableId },
      updates
    );
    if (!responsable) {
      return res
        .status(404)
        .json(
          "responsable not found or you do not have permission to update this child"
        );
    }

    res
      .status(200)
      .json({ responsable, message: "responsable updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while updating responsable");
  }
});

// dmin peut effacer le responsable
router.delete("/responsables/:responsableId", async (req, res) => {
  try {
    const { responsableId } = req.params;

    const responsable = await Responsable.findOneAndDelete({
      _id: responsableId,
    });
    if (!responsable) {
      return res.status(404).json("responsable not found or already deleted");
    }

    res.status(200).json({ message: "responsable deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while updating responsable");
  }
});

// l'admin peut afficher liste de tous les responsables
router.get("/responsables", async (req, res) => {
  try {
    const responsable = await Responsable.find();
    if (!responsable) {
      return res.status(404).json("No responsable found !");
    }

    res.status(200).json(responsable);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while retrieving responsables");
  }
});

// admin et responsable peut consulter liste des parents qui non pas d'accée
router.get("/parents/new-parents", async (req, res) => {
  try {
    const newParent = await Parent.find({ access: false }).populate('enfants');
    if (!newParent) {
      return res.status(404).json("No responsable found !");
    }

    res.status(200).json(newParent);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while retrieving responsables");
  }
});

router.get("/parents/sub-parents", async (req, res) => {
  try {
    const newParent = await Parent.find({ access: true }).populate('enfants');
    if (!newParent) {
      return res.status(404).json("No responsable found !");
    }

    res.status(200).json(newParent);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while retrieving responsables");
  }
});

// ---------------------------------------------------------------------------------------------------------------

// affichage liste des evennements
router.get("/evenements", async (req, res) => {
  try {
    const evenement = await Evenement.find();
    if (!evenement) {
      return res.status(404).json("No evenement found !");
    }

    res.status(200).json(evenement);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while retrieving evenement");
  }
});

router.get("/evenements/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const evenement = await Evenement.findById(eventId);
    if (!evenement) {
      return res.status(404).json("No evenement found !");
    }

    res.status(200).json(evenement);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while retrieving evenement");
  }
});

// ajouter un nouvel evennement
router.post("/add-evenement", async (req, res) => {
  try {
    const evenementData = req.body;

    const newEvent = new Evenement(evenementData);
    const evenement = await newEvent.save();

    res
      .status(201)
      .json({ evenement, message: "event information added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while adding event information");
  }
});

// modifier les informations de l'evennement
router.put("/evenements/:evenementId", async (req, res) => {
  try {
    const { evenementId } = req.params;
    const updates = req.body;

    const evenement = await Evenement.findOneAndUpdate(
      { _id: evenementId },
      updates
    );
    if (!evenement) {
      return res
        .status(404)
        .json(
          "evenement not found or you do not have permission to update this child"
        );
    }

    res
      .status(200)
      .json({ evenement, message: "evenement updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while updating evenement");
  }
});

// supprimer un evennement
router.delete("/evenements/:evenementId", async (req, res) => {
  try {
    const { evenementId } = req.params;

    const evenement = await Evenement.findOneAndDelete({ _id: evenementId });
    if (!evenement) {
      return res.status(404).json("evenement not found or already deleted");
    }

    res.status(200).json({ message: "evenement deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while updating evenement");
  }
});

// incription d'enfant par (admin ou responsable ou bien le parent)
router.post(
  "/evenements/:evenementId/:enfantId/inscriptions",
  async (req, res) => {
    try {
      const { evenementId, enfantId } = req.params;

      const evenement = await Evenement.findById(evenementId);
      if (!evenement) {
        return res.status(404).json("User not found");
      }

      evenement.inscriptions.push(enfantId);
      await evenement.save();

      res
        .status(201)
        .json("evenement information added successfully to the user");
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error while adding evenement information");
    }
  }
);

router.post("/evenements/:evenementId/:enfantId/check", async (req, res) => {
  try {
    const { evenementId, enfantId } = req.params;

    const evenement = await Evenement.findById(evenementId);
    if (!evenement) {
      return res.status(404).json("User not found");
    }

    const exist = evenement.inscriptions.includes(enfantId);

    res.status(201).json(exist);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while adding evenement information");
  }
});

module.exports = router;
