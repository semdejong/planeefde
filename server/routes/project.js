const express = require("express");

const { User } = require("../models/user");
const Project = require("../models/project");

const { authenticate } = require("./middleware/authenticate");
const { authorize } = require("./middleware/authorize");
const { paginatedResults } = require("./middleware/paginate");

const router = express.Router();

router.post(
  "/getProjects",
  authenticate,
  paginatedResults(Project),
  async (req, res) => {
    const projects = res.paginatedResults.results;

    res.status(200).json({
      amount: res.paginatedResults.amount,
      nextPage: res.paginatedResults.next,
      previousPage: res.paginatedResults.previous,
      projects: projects,
    });
  }
);

router.get(
  "/getProject/:id",
  authenticate,
  authorize("admin", "leadgen.permissions.GetProject"),
  async (req, res) => {
    try {
      if (!req.authorized)
        return res.status(403).json({ error: "Unauthorized" });

      console.log(req.params.id);
      const project = await Project.findOne({ _id: req.params.id });

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json({ project });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.post(
  "/",
  authenticate,
  authorize("admin", "leadgen.permissions.AddProjects"),
  async (req, res) => {
    try {
      //Check if authorized
      if (!req.authorized)
        return res.status(401).json({ message: "You are not authorized" });

      console.log(req.body.name);
      //Checking if project name is supplied
      if (!checkIfNotNull(req.body.name)) {
        return res.status(400).send({
          message: "Project name is required",
        });
      }

      //Checking if project name already exists
      const project = await Project.findOne({ name: req.body.name });
      if (project) {
        return res.status(400).send({
          message: "Project name already exists",
        });
      }

      //Uploading project
      const newProject = new Project({
        name: req.body.name,
        description: req.body.description,
        recommended: req.body.recommended,
        createdBy: req.user._id,
      });

      await newProject.save();

      res.status(200).json(newProject);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin", "leadgen.permissions.DeleteProject"),
  async (req, res) => {
    const project = await Project.findOne({ _id: req.params.id });
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!req.authorized)
      return res.status(401).json({ message: "You are not authorized" });

    await project.remove();

    res.status(200).json({ message: "Project deleted" });
  }
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin", "appname.permissions.ChangeProject"),
  async (req, res) => {
    try {
      const project = await Project.findOne({ _id: req.params.id });
      if (req.authorized) {
        if (!project)
          return res.status(400).json({ message: "Project not found" });
        if (req.body.name) project.name = req.body.name;
        if (req.body.description) project.description = req.body.description;
        await project.save();
        return res.status(200).json(project);
      } else {
        return res.status(403).json({
          message: "You do not have permission to change this project",
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

router.get("/style/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    if (!project) return res.status(400).json({ message: "Project not found" });
    return res.status(200).json(project.customStyle);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/content/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    if (!project) return res.status(400).json({ message: "Project not found" });
    return res.status(200).json(project.customContent);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/form/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    if (!project) return res.status(400).json({ message: "Project not found" });
    return res
      .status(200)
      .json({ pages: project.pages, customFields: project.customFields });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.patch(
  "/style/:id",
  authenticate,
  authorize("admin", "appname.permissions.UpdateStyle"),
  async (req, res) => {
    try {
      const project = await Project.findOne({ _id: req.params.id });
      if (req.authorized) {
        if (!project)
          return res.status(400).json({ message: "Project not found" });
        if (req.body.customStyle) {
          project.customStyle = req.body.customStyle;
          await project.save();
          return res.status(200).json(project);
        } else {
          return res.status(400).json({ message: "No style properties found" });
        }
      } else {
        return res.status(403).json({
          message: "You do not have permission to change this project",
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

router.patch(
  "/content/:id",
  authenticate,
  authorize("admin", "appname.permissions.UpdateContent"),
  async (req, res) => {
    try {
      const project = await Project.findOne({ _id: req.params.id });
      if (req.authorized) {
        if (!project)
          return res.status(400).json({ message: "Project not found" });
        if (req.body.customContent) {
          project.customContent = req.body.customContent;
          await project.save();
          return res.status(200).json(project);
        } else {
          return res
            .status(400)
            .json({ message: "No content properties found" });
        }
      } else {
        return res.status(403).json({
          message: "You do not have permission to change this project",
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

router.patch(
  "/form/:id",
  authenticate,
  authorize("admin", "appname.permissions.UpdateForm"),
  async (req, res) => {
    try {
      const project = await Project.findOne({ _id: req.params.id });
      if (req.authorized) {
        if (!project)
          return res.status(400).json({ message: "Project not found" });
        if (
          req.body.customForm &&
          req.body.customForm.pages &&
          req.body.customForm.customFields
        ) {
          project.pages = req.body.customForm.pages;
          project.customFields = req.body.customForm.customFields;
          await project.save();
          return res.status(200).json(project);
        } else {
          return res
            .status(400)
            .json({ message: "No content properties found" });
        }
      } else {
        return res.status(403).json({
          message: "You do not have permission to change this project",
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

router.get("/randomRecommended", async (req, res) => {
  try {
    const projects = await Project.find({ recommended: true });
    const randomProject = projects[Math.floor(Math.random() * projects.length)];
    return res.status(200).json({ projectID: randomProject._id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

function checkIfNotNull(value) {
  if (value == null || value == undefined || value == "") {
    return false;
  }
  return true;
}

module.exports = router;
