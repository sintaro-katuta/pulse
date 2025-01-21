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

app.get("/api/projects/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const projects = await prisma.project.findUnique({
    where: { id },
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
app.get("/api/tickets/:projectId", async (req, res) => {
  const projectId = parseInt(req.params.projectId, 10)
  const tickets = await prisma.ticket.findMany({
    where: { projectId },
    select: {
      id: true,
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

// ticket length
app.get("/api/tickets/count/:projectId", async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId, 10);

    // Ticket の数をカウント
    const count = await prisma.ticket.count({
      where: { projectId },
    });

    res.json(count);
  } catch (error) {
    console.error("Error counting tickets:", error);
    res.status(500).json({ error: "Failed to count tickets" });
  }
});

// Create a new ticket
app.post("/api/tickets", async (req, res) => {
  const { name, title, description, status, priority, projectId } = req.body;
  const ticket = await prisma.ticket.create({
    data: {
      name,
      title,
      description,
      status,
      priority,
      projectId,
    },
  });
  res.status(201).json(ticket);
});

// delete ticket
app.delete("/api/tickets/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Prisma を使用してチケットを削除
    const deletedTicket = await prisma.ticket.delete({
      where: {
        id: parseInt(id, 10), // `id` を整数に変換
      },
    });

    // 削除したチケットをレスポンスとして返す
    res.status(200).json({
      message: "Ticket deleted successfully",
      ticket: deletedTicket,
    });
  } catch (error) {
    console.error("Error deleting ticket:", error);

    // エラーハンドリング
    if (error.code === "P2025") {
      // Prisma の "Record to delete does not exist" エラー
      res.status(404).json({
        error: "Ticket not found",
      });
    } else {
      res.status(500).json({
        error: "An error occurred while deleting the ticket",
      });
    }
  }
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
