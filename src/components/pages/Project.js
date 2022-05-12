import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Message from "../layout/Message";
import Loading from "../layout/Loading";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";
import ProjectForm from "../project/ProjectForm";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import AddServiceForm from "../service/AddServiceForm";

//TODO: passar o EditProject Pra outra pagina

function Project() {
    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [isEditProjectEnable, setIsEditProjectEnable] = useState(false);
    const [isAddServiceEnable, setIsAddServiceEnable] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setServices(data.services);
            })
            .catch((err) => console.log(err));
    }, [id]);

    function setEditProjectFormVisible() {
        setIsEditProjectEnable(!isEditProjectEnable);
    }
    function setAddServiceFormVisible() {
        setIsAddServiceEnable(!isAddServiceEnable);
    }

    function updateProject(project) {
        setMessage("");

        if (project.budget < parseFloat(project.cost)) {
            setMessage(
                `O custo do projeto superou o valor do orçamento, por favor revise os valores`
            );
            setType("error");
            return false;
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setIsEditProjectEnable(false);
                setMessage(`O projeto ${project.name} foi atualizado`);
                setType("success");
            })
            .catch((err) => console.log(err));
    }

    function createService(project) {
        setMessage("");

        const lastService = project.services[project.services.length - 1];
        const lastServiceCost = lastService.cost;
        lastService.id = uuidv4();

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if (newCost > parseFloat(project.budget)) {
            setMessage("O projeto ultrapassou o orçamento definido");
            setType("error");
            project.services.pop();
            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setServices(data.services);
                setIsAddServiceEnable(false);
                setMessage(
                    `O serviço ${lastService.service_name} foi criado com sucesso`
                );
                setType("success");
            })
            .catch((err) => console.log(err));
    }

    function updateService(service, id) {
        setMessage("");

        const serviceIndex = project.services.findIndex(
            (findService) => findService.id === id
        );

        project.services[serviceIndex] = service;
        project.services[serviceIndex].id = id;

        const projectUpdated = project;

        projectUpdated.cost = projectUpdated.services.reduce(function (
            acc,
            curr
        ) {
            return acc + parseFloat(curr.cost);
        },
        0);

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectUpdated),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(projectUpdated);
                setServices(projectUpdated.services);
                setMessage("Serviço atualizado com sucesso!");
                setType("success");
            });
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        );

        const projectUpdated = project;

        projectUpdated.services = servicesUpdated;
        projectUpdated.cost =
            parseFloat(projectUpdated.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectUpdated),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(projectUpdated);
                setServices(servicesUpdated);
                setMessage("Serviço removido com sucesso!");
                setType("success");
            });
    }

    return (
        <>
            {project.name ? (
                <div className="container mx-auto mt-8">
                    {message && <Message message={message} type={type} />}
                    {isEditProjectEnable && (
                        <>
                            Editar o projeto{" "}
                            <span className="text-primary">{project.name}</span>
                            <ProjectForm
                                btnText="Concluir Edição"
                                projectData={project}
                                handleSubmit={updateProject}
                            />
                        </>
                    )}
                    <div>
                        <h1 className="text-4xl">
                            Resumo sobre o projeto{" "}
                            <span className="font-bold text-orange-500">
                                {project.name}
                            </span>
                        </h1>
                    </div>
                    <div className="divider"></div>
                    <div>
                        <div className="flex justify-between mb-4">
                            <h1 className="text-2xl">Serviços</h1>
                            <button
                                className="btn btn-primary"
                                onClick={setAddServiceFormVisible}
                            >
                                Adicionar serviço
                            </button>
                        </div>
                        {isAddServiceEnable && (
                            <AddServiceForm
                                handleSubmitData={createService}
                                projectData={project}
                                toggleModal={setAddServiceFormVisible}
                            />
                        )}
                        <div className="flex flex-wrap justify-around gap-8">
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        key={service.id}
                                        service_name={service.service_name}
                                        cost={service.cost}
                                        description={service.description}
                                        handleRemove={removeService}
                                        handleEditService={updateService}
                                    />
                                ))
                            ) : (
                                <h1>Não há serviços cadastrados</h1>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Project;
