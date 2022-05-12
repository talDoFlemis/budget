import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import ProjectCard from "../project/ProjectCard";
import LinkButton from "../layout/LinkButton";
import Loading from "../layout/Loading";
import Message from "../layout/Message";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { AiFillProject } from "react-icons/ai";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function Projects() {
    const location = useLocation();
    const [projects, setProjects] = useState([]);
    const [globalValues, setGlobalValues] = useState([]);

    let message = "";

    useEffect(() => {
        fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(data);
                getGlobalValues(data);
            })
            .catch((err) => console.log(err));
    }, []);

    if (location.state) {
        message = location.state.message;
    }

    function getGlobalValues(projects) {
        setGlobalValues(
            projects.reduce(
                function (accumulator, currentValue) {
                    accumulator["budget"] += parseFloat(currentValue.budget);
                    accumulator["cost"] += parseFloat(currentValue.cost);
                    accumulator["projectsQuantity"] = projects.length;
                    accumulator["services"] += currentValue.services.length;

                    return accumulator;
                },
                { budget: 0, cost: 0, projectsQuantity: 0, services: 0 }
            )
        );
    }

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(projects.filter((project) => project.id !== id));
            });
    }

    return (
        <div className="container pt-2 mx-auto">
            {message && (
                <Message
                    message={location.state.message}
                    type={location.state.type}
                />
            )}
            <div className="flex justify-between my-8 items-center">
                <h1 className="text-3xl font-bold">Meus Projetos</h1>
                <LinkButton
                    to="/newproject"
                    text="Novo Projeto"
                    className="text-xl shadow-lg btn-outline"
                />
            </div>
            {globalValues.projectsQuantity > 0 && (
                <div className="stats w-full mb-8 grid-cols-3 bg-white">
                    <div className="stat col-span-2 row-span-2">
                        <div className="stat-title">Custo/Orçamento</div>
                        <div className="stat-value text-sm">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={projects}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="budget" fill="#82ca9d" />
                                    <Bar dataKey="cost" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Quantidade de projetos</div>
                        <div className="stat-figure text-red-500">
                            <AiFillProject size={30} />
                        </div>
                        <div className="stat-value text-red-500">
                            {projects.length}
                        </div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Quantidade de serviços</div>
                        <div className="stat-figure text-orange-500">
                            <MdOutlineHomeRepairService size={30} />
                        </div>
                        <div className="stat-value text-orange-500">
                            {globalValues.services}
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-wrap items-center justify-around gap-6">
                {globalValues.projectsQuantity > 0 ? (
                    projects.map((project) => (
                        <ProjectCard
                            name={project.name}
                            id={project.id}
                            key={project.id}
                            budget={project.budget}
                            category={project.category}
                            cost={project.cost}
                            tags={project.tags}
                            handleRemove={removeProject}
                        />
                    ))
                ) : globalValues.projectsQuantity === 0 ? (
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-bold">
                            Não há projetos cadastrados 😭
                        </h1>
                        <h1 className="text-2xl mt-4">
                            Por favor, crie um novo projeto
                        </h1>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
}

export default Projects;
