require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();



// Middleware
app.use(cors());
app.use(bodyParser.json());

// === Projects ===
// Get all projects
app.get("/api/projects", async (req, res) => {
  const projects = await prisma.project.findMany({
    include: { tickets: true },
  });
  res.json(projects);
});

// Create a new project
app.post("/api/projects", async (req, res) => {
  const { name, description, readme } = req.body;
  const project = await prisma.project.create({
    data: { name, description, readme },
  });
  res.status(201).json(project);
});

// === Tickets ===
// Get all tickets
app.get("/api/tickets/:id", async (req, res) => {
  const projectId = parseInt(req.params.id, 10)
  const tickets = await prisma.ticket.findMany({
    where: { projectId },
    select: {
      name: true,
      title: true,
      status: true,
      priority: true,
      assignee: true,
      createdAt: true,
    },
  });
  res.json(tickets);
});

// Create a new ticket
app.post("/api/tickets", async (req, res) => {
  const { title, description, status, priority, projectId } = req.body;
  const ticket = await prisma.ticket.create({
    data: {
      title,
      description,
      status,
      priority,
      projectId,
    },
  });
  res.status(201).json(ticket);
});

// === Tags ===
// Get all tags
app.get("/api/tags", async (req, res) => {
  const tags = await prisma.tag.findMany();
  res.json(tags);
});

// Create a new tag
app.post("/api/tags", async (req, res) => {
  const { name, ticketId } = req.body;
  const tag = await prisma.tag.create({
    data: { name, ticketId },
  });
  res.status(201).json(tag);
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
