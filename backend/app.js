const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const Member = require("./models/Member");
const Project = require("./models/Project");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

sequelize.authenticate()
  .then(() => console.log("✅ Conexión a la base de datos establecida"))
  .catch(err => console.error("❌ Error al conectar:", err));

sequelize.sync({ force: false })
  .then(() => console.log("📦 Tablas sincronizadas"))
  .catch(err => console.error("❌ Error al sincronizar:", err));

// 🔧 Diccionario de imágenes (igual que en Handlebars)
const techImages = {
  JavaScript: "/img/Javascript.webp",
  "Node.js": "/img/node.png",
  Kotlin: "/img/kotlin.png",
  Python: "/img/coronel.webp",
  HTML: "/img/html.png",
  CSS: "/img/css.png",
  PHP: "/img/php.png",
  MySQL: "/img/mysql.png",
  Java: "/img/java.png",
  Bootstrap: "/img/Bootstrap.png",
  Firebase: "/img/Firebase.png",
  Unity: "/img/unity.png",
  Godot: "/img/godot.png",
  Svelte: "/img/Svelte.png",
  React: "/img/React.png",
  Spring: "/img/Spring.png",
};

// ========= Miembros =========
app.get("/api/members", async (req, res) => {
  try {
    const members = await Member.findAll();
    res.json(members.map(m => m.get({ plain: true })));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener miembros" });
  }
});

// ========= Proyectos de GRUPO (como en Home) =========
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { tipo: "grupo" },
      include: { model: Member, through: { attributes: [] } }
    });

    const data = projects.map(p => {
      const plain = p.get({ plain: true });
      if (plain.tecnologias) {
        plain.tecnologias = plain.tecnologias.split(",").map(t => ({
          name: t.trim(),
          image: techImages[t.trim()] || null,
        }));
      }
      return plain;
    });

    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener proyectos" });
  }
});

// ========= Portafolio de un miembro (proyectos INDIVIDUALES + datos del miembro) =========
app.get("/api/member/:id", async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await Member.findByPk(memberId);
    if (!member) return res.status(404).json({ error: "Miembro no encontrado" });

    // Proyectos individuales en los que participa este miembro
    const projects = await Project.findAll({
      where: { tipo: "individual" },
      include: {
        model: Member,
        where: { id: memberId },
        through: { attributes: [] },
      },
    });

    const memberData = member.get({ plain: true });
    if (memberData.tecnologias) {
      memberData.tecnologias = memberData.tecnologias.split(",").map(t => ({
        name: t.trim(),
        image: techImages[t.trim()] || "/img/coronel.webp",
      }));
    }

    const projectsData = projects.map(p => {
      const plain = p.get({ plain: true });
      if (plain.tecnologias) {
        plain.tecnologias = plain.tecnologias.split(",").map(t => ({
          name: t.trim(),
          image: techImages[t.trim()] || null,
        }));
      }
      return plain;
    });

    res.json({ member: memberData, projects: projectsData });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener el portafolio del miembro" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor API en http://localhost:${PORT}`));
