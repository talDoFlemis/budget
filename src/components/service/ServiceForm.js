import { useState } from "react";
import Input from "../forms/Input";
import Submit from "../forms/Submit";

//TODO: MUDAR PRO REACT HOOK FORM COM FORM VALIDATION

function ServiceForm({ handleSubmit, btnText, projectData }) {
    const [service, setService] = useState({});

    const submit = (e) => {
        e.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    };

    function handleChangeName(e) {
        setService({ ...service, [e.target.name]: e.target.value });
    }

    function handleChangeNumber(e) {
        setService({ ...service, cost: parseFloat(e.target.value) });
    }

    return (
        <form onSubmit={submit} className="flex flex-col justify-center mx-auto lg:w-1/2">
            <Input
                type="text"
                text="Nome do serviço"
                name="service_name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChangeName}
            />
            <Input
                type="number"
                text="Custo do serviço"
                name="cost"
                min="0"
                placeholder="Insira o valor total"
                handleOnChange={handleChangeNumber}
            />
            <Input
                type="text"
                text="Descrição do projeto"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChangeName}
            />
            <Submit text={btnText} />
        </form>
    );
}

export default ServiceForm;
