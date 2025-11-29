import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import "../styles/memberPortfolio.css";

export default function MemberPage() {
    const { id } = useParams();
    const [member, setMember] = useState(null);
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    const TECH_IMG = {
        "JavaScript": "/img/javascript.png",
        "Node.js": "/img/node.png",
        "Kotlin": "/img/kotlin.png",
        "HTML": "/img/html.png",
        "CSS": "/img/css.png",
        "PHP": "/img/php.png",
        "MySQL": "/img/mysql.png",
        "Java": "/img/java.png",
        "Bootstrap": "/img/Bootstrap.png",
        "Firebase": "/img/Firebase.png",
        "Unity": "/img/unity.png",
        "Godot": "/img/godot.png",
        "Svelte": "/img/Svelte.png",
        "React": "/img/React.png",
        "Spring": "/img/Spring.png",
        "OpenWeather": "/img/openWeather.png",
        "Vue": "/img/vue.png",
        "Figma": "/img/figma.png",
        "Docker": "/img/docker.png",
        "Lanustats": "/img/lanusStats.png",
        "Python": "/img/python.png",
        "NestJS": "/img/nestjs.png",
        "PostgreSQL": "/img/postgresql.png",
        "Angular": "/img/angular.png",
        "TypeScript": "/img/typescript.png",
        "Android Studio": "/img/androidStudio.png",
        "Supabase": "/img/supabase.png",
        "Tailwind": "/img/tailwind.png",
        "Open-Meteo": "/img/openMeteo.png",
        "SQL": "/img/sql.png",
    };

    const getTechImage = (name = "") => {
        // Normaliza el nombre (quita espacios y pasa a minúsculas)
        const cleanName = name.trim().toLowerCase();

        // Busca coincidencia ignorando mayúsculas
        const foundKey = Object.keys(TECH_IMG).find(
            (key) => key.toLowerCase() === cleanName
        );

        // Devuelve la imagen correspondiente o un fallback
        return foundKey ? TECH_IMG[foundKey] : "/img/coronel.webp";
    };


    useEffect(() => {
        async function fetchMember() {
            try {
                const res = await api.get(`/member/${id}`);
                const data = res.data.member || res.data;
                const proy = res.data.projects || [];

                // Normalizar tecnologías del miembro (por si viene como string)
                if (data.tecnologias && typeof data.tecnologias === "string") {
                    data.tecnologias = data.tecnologias.split(",").map((t) => ({
                        name: t.trim(),
                        image: null,
                    }));
                }

                // Normalizar tecnologías de cada proyecto
                proy.forEach((p) => {
                    if (p.tecnologias && typeof p.tecnologias === "string") {
                        p.tecnologias = p.tecnologias.split(",").map((t) => ({
                            name: t.trim(),
                            image: null,
                        }));
                    }
                });

                setMember(data);
                setProjects(proy);
            } catch (err) {
                console.error("❌ Error al obtener el miembro:", err);
                setError("No se pudo cargar el miembro.");
            }
        }

        fetchMember();
    }, [id]);

    if (error) return <p className="error">{error}</p>;
    if (!member) return <p className="loading">Cargando...</p>;

    return (
        <main>
            {/* ================= HERO ================= */}
            <div className="hero">
                <div className="hero_introduction">
                    <h2>Hola, soy</h2>
                    <h1 className="hero_name">
                        {member.nombre} {member.apellido}
                    </h1>
                </div>
                <p className="hero_titulation">{member.titulacion}</p>
            </div>

            {/* ================= SOBRE MÍ ================= */}
            <div className="aboutMeCont">
                <div className="aboutMeCont__img">
                    <img
                        src={member.foto}
                        alt={`Foto de ${member.nombre} ${member.apellido}`}
                    />
                </div>
                <div className="aboutMeCont__textCont">
                    <h3>Sobre Mí</h3>
                    <p>{member.presentacion}</p>
                </div>
            </div>

            {/* ================= MIS TRABAJOS ================= */}
            <div className="teamProjectsSection">
                <h2 className="teamProjectsSection__title">MIS TRABAJOS</h2>
                <hr />
                <p className="teamProjectsSection__subtitle">
                    Aquí encontrarás una selección de proyectos que he desarrollado por mi
                    cuenta, donde he podido aplicar y expandir mis conocimientos.
                </p>

                <div className="projectListCont">
                    {projects.length > 0 ? (
                        projects.map((p) => (
                            <div className="projectCard" key={p.id}>
                                <div className="projectCardTitleCont">
                                    <h3>{p.titulo}</h3>
                                    <hr />
                                    <p>{p.descripcion}</p>
                                </div>

                                {p.tecnologias && (
                                    <div className="projectCardTecnologyCont">
                                        <h4>Tecnologías</h4>
                                        <div className="projectTecnologyList">
                                            {(Array.isArray(p.tecnologias)
                                                ? p.tecnologias
                                                : p.tecnologias.split(",").map((t) => ({
                                                    name: t.trim(),
                                                }))
                                            ).map((t, i) => (
                                                <div className="projectTecnologyCard" key={i}>
                                                    <img
                                                        src={getTechImage(t.name)}
                                                        alt={t.name}
                                                        className="technologyImage"
                                                    />
                                                    <p>{t.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <p className="visitURL">
                                    Visítala en:{" "}
                                    <a href={p.url} target="_blank" rel="noreferrer">
                                        {p.url}
                                    </a>
                                </p>
                                <p className="company">
                                    Empresa: <span>{p.empresa}</span>
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No hay proyectos individuales registrados.</p>
                    )}
                </div>

            </div>

            {/* ================= TECNOLOGÍAS ================= */}
            <div className="tecnologiesSection">
                <h2 className="tecnologiesSection__title">TECNOLOGÍAS</h2>
                <hr />
                <div className="tecnologiesSectionList">
                    {member.tecnologias && member.tecnologias.length > 0 ? (
                        member.tecnologias.map((t, i) => (
                            <div className="tecnologiesSectionCard" key={i}>
                                <img
                                    src={getTechImage(t.name)}
                                    alt={t.name}
                                    className="technologyImage"
                                />
                                <p>{t.name}</p>
                            </div>
                        ))
                    ) : (
                        <p>Sin tecnologías registradas.</p>
                    )}
                </div>
            </div>


            {/* ================= ESTUDIOS ================= */}
            <div className="studiesSection">
                <h2 className="studiesSection__title">ESTUDIOS</h2>
                <hr />
                <p>{member.estudios || "No se ha indicado formación académica."}</p>
            </div>

            {/* ================= IDIOMAS ================= */}
            <div className="idiomSection">
                <h2 className="idiomSection_title">IDIOMAS</h2>
                <hr />
                <div className="idiomSection__list">
                    <p>{member.idiomas || "No se han indicado idiomas."}</p>
                </div>
            </div>
        </main>
    );
}
