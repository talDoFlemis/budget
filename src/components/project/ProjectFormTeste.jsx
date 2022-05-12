import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cl from "clsx";

import Select from "../forms/Select";

//FIXME: Ve pq tem que dar submit duas vezes pro categories ir e achar uma maneira do react hook pra criar um json diferente

function ProjectFormTeste({ handleSubmitProject, projectData, btnText }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    const schema = yup
        .object({
            budget: yup
                .number()
                .typeError("Deve ser um número positivo")
                .positive("Deve ser um número positivo")
                .required("O campo 'Custo do Serviço' é necessário"),
            name: yup
                .string()
                .required("O campo 'Nome do Serviço' é necessário"),
            // categories: yup
            //     .string()
            //     .oneOf(categories.map(({ category_name }) => category_name))
            //     .required("O campo 'categoria' é necessário"),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

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

    function handleSelect(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                category_name: e.target.options[e.target.selectedIndex].text,
            },
        });
    }

    const submitProject = (data) => {
        console.log(data);
        console.log(project);
        setProject(data);
        console.log(data);
        console.log(project);
        // handleSubmitProject(project);
    };

    return (
        <form
            onSubmit={handleSubmit(submitProject)}
            className="w-1/2 mx-auto card-body form-control"
        >
            <label htmlFor="name" className="label label-text">
                Nome do Serviço
            </label>
            <input
                {...register("name")}
                className={cl(
                    "input input-bordered",
                    errors.name && "input-error"
                )}
            />
            <label className="text-red-500 label label-text-alt">
                {errors.name?.message}
            </label>
            <label htmlFor="budget" className="label label-text">
                Custo do Serviço
            </label>
            <input
                type="number"
                min="0"
                {...register("budget")}
                className={cl(
                    "input input-bordered",
                    errors.budget && "input-error"
                )}
            />
            <label className="text-red-500 label label-text-alt">
                {errors.budget?.message}
            </label>
            <label htmlFor="categories" className="label label-text">
                Categoria do Serviço
            </label>
            <select
                onChange={handleSelect}
                value={project.category ? project.category.id : ""}
                className="w-full select select-bordered"
            >
                <option>Selecione uma opção</option>
                {categories.map(({ category_name, id }) => (
                    <option value={id} key={id}>
                        {category_name}
                    </option>
                ))}
            </select>
            <button className="btn btn-primary">Teste</button>
        </form>
    );
}

export default ProjectFormTeste;
