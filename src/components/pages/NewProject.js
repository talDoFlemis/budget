import { useNavigate } from "react-router-dom";
import randomColor from "randomcolor";

import ProjectForm from "../project/ProjectForm";
import ProjectFormTeste from "../project/ProjectFormTeste";

function NewProject() {
    const navigate = useNavigate();

    function createPost(project) {
        project.cost = 0;
        project.tags = [];
        project.services = [];
        project.lastTimeModified = `${new Date()}`;
        project.createDate = "s";

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) =>
                navigate("/projects", {
                    state: {
                        message: `O projeto ${project.name} foi criado com sucesso!`,
                        type: "success",
                    },
                })
            )
            .catch((err) => console.log(err));
    }

    return (
        <div className="mx-auto mt-16 text-center text-black bg-white shadow-2xl card card-body align-center xl:w-3/4">
            <h1 className="mb-1 text-4xl card-title">Crie seu projeto</h1>
            <p className="mb-8">
                Crie seu projeto para adicionar posteriormente os serviços
            </p>
            <ProjectFormTeste
                handleSubmitProject={createPost}
                btnText="Criar"
            />
        </div>
    );
}

export default NewProject;
