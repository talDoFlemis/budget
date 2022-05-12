import { useState, useEffect } from "react";

import Input from "../forms/Input";
import Select from "../forms/Select";
import Submit from "../forms/Submit";

//TODO: MUDAR PRO REACT HOOK FORM COM FORM VALIDATION

function ProjectForm({ handleSubmit, projectData, btnText }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }, []);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    };

    function handleChangeName(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    function handleChangeNumber(e) {
        setProject({ ...project, budget: parseFloat(e.target.value) });
    }

    function handleSelect(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                category_name: e.target.options[e.target.selectedIndex].text,
            },
        });
    }

    return (
        <form
            onSubmit={submit}
            className="flex flex-col justify-center w-full mx-auto md:w-1/2 lg:w-1/3"
        >
            <Input
                type="text"
                text="Nome do Projeto"
                placeholder="Insira o nome do projeto"
                name="name"
                handleOnChange={handleChangeName}
            />
            <Input
                type="number"
                text="Orçamento do Projeto"
                placeholder="Insira o orçamento do projeto"
                name="budget"
                min="0"
                handleOnChange={handleChangeNumber}
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleSelect}
                value={project.category ? project.category.id : ""}
            />
            <Submit text={btnText} />
        </form>
    );
}

export default ProjectForm;
