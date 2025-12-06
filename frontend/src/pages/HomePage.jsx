import { useEffect, useState } from "react";
import { api } from "../api";
import "../styles/home.css";
import { TECH_IMG } from '../constants/techImages';

export default function HomePage() {
    const [members, setMembers] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get("/members").then(res => setMembers(res.data));
        api.get("/projects").then(res => setProjects(res.data));
    }, []);

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

    return (
        <main>
            <div className="hero_main">
                <span className="hero_glow_bottom"></span>
                <h1 className="hero_group">DevHub</h1>
            </div>

            <div className="aboutUs">
                <div className="aboutUs_textCont">
                    <h2 className="text-center">¿Qué Ofrecemos?</h2>
                    <p className="text-center">
                        Somos un grupo de estudiantes apasionados por la tecnología y el desarrollo de proyectos innovadores. Nuestro objetivo principal es aprender, experimentar y construir soluciones que reflejen nuestra creatividad y habilidades técnicas.
                        Cada uno de nosotros aporta un conjunto único de conocimientos y experiencias que nos permiten trabajar en equipo de manera efectiva.
                    </p>
                </div>
                <img src="/img/grupo.png" alt="Foto grupo Kokoriko" />
            </div>

            <div className="teamSection">
                <h2 className="teamSection_title">CONOCE A NUESTRO EQUIPO</h2>
                <hr />
                <p className="teamSection__subtitle">
                    Somos un grupo de estudiantes unidos por nuestra pasión por la tecnología y la innovación. Trabajamos juntos para aprender, crecer y crear proyectos que reflejen nuestro entusiasmo y compromiso.
                </p>
                <div className="memberListCont">
                    {members.map((m) => (
                        <a
                            key={m.id}
                            href={`/member/${m.id}`}
                            className="memberCardLink"
                            target="_blank"
                        >
                            <div className="memberCard">
                                <div className="memberCard__photoCont">
                                    <img src={m.foto} alt={`${m.nombre} ${m.apellido}`} />
                                </div>
                                <div className="memberCard__infoCont">
                                    <h3>{m.nombre} {m.apellido}</h3>
                                    <p className="memberCard__infoCont--title">{m.titulacion}</p>
                                    <p className="memberCard__infoCont--presentation">{m.presentacion}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="teamProjectsSection">
                <h2 className="teamProjectsSection__title">NUESTROS TRABAJOS</h2>
                <hr />
                <p className="teamProjectsSection__subtitle">
                    En esta sección encontrarás los proyectos que hemos desarrollado, cada uno reflejando nuestro esfuerzo, aprendizaje y pasión por la tecnología.
                </p>

                <div className="projectListCont">
                    {projects
                        .filter((p) => p.tipo === "grupo") // ✅ solo proyectos grupales
                        .map((p) => (
                            <div key={p.id} className="projectCard">
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
                                                : p.tecnologias.split(",")
                                            ).map((t, i) => {
                                                if (typeof t === "object") {
                                                    return (
                                                        <div className="projectTecnologyCard" key={i}>
                                                            <img src={getTechImage(t.name)} alt={t.name} className="technologyImage" />
                                                            <p>{t.name}</p>
                                                        </div>
                                                    );
                                                }
                                                return (
                                                    <div className="projectTecnologyCard" key={i}>
                                                        <p>{t.trim()}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}


                                {p.Members && (
                                    <div className="projectCardMembersCont">
                                        <h4>Integrantes</h4>
                                        <div className="projectMemberList">
                                            {p.Members.map((m) => (
                                                <div className="projectMemberCard" key={m.id}>
                                                    <img src={m.foto} alt={m.nombre} />
                                                    <p>{m.nombre} {m.apellido}</p>
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
                        ))}
                </div>
            </div>

        </main>
    );
}
