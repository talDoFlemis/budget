import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cl from "clsx";

//TODO: MUDAR PRO REACT HOOK FORM COM FORM VALIDATION

function AddServiceForm({ projectData, toggleModal, handleSubmitData }) {
    const schema = yup
        .object({
            cost: yup
                .number()
                .typeError(
                    cl(
                        "Deve ser um número positivo e não superior a ",
                        projectData.budget - projectData.cost
                    )
                )
                .positive(
                    "Deve ser um número positivo e não superior a ",
                    projectData.budget - projectData.cost
                )
                .max(
                    projectData.budget - projectData.cost,
                    cl(
                        "O custo do serviço não pode ser superior a ",
                        projectData.budget - projectData.cost
                    )
                )
                .required("O campo 'Custo do Serviço' é necessário"),
            service_name: yup
                .string()
                .required("O campo 'Nome do Serviço' é necessário"),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        projectData.services.push(data);
        handleSubmitData(projectData);
    };

    const [isOpen, setIsOpen] = useState(true);

    function closeModal(e) {
        e.preventDefault();
        setIsOpen(false);
        toggleModal();
    }

    return (
        <>
            {toggleModal && (
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={closeModal}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-black bg-opacity-50" />
                        </Transition.Child>
                        <div className="min-h-screen px-4 text-center">
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white card">
                                    <div className="p-0 card-body">
                                        <Dialog.Title className="card-title">
                                            Adicionando serviços
                                        </Dialog.Title>
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="flex flex-col"
                                        >
                                            <label
                                                htmlFor="service_name"
                                                className="label label-text"
                                            >
                                                Nome do Serviço
                                            </label>
                                            <input {...register("zzzzzz")} />
                                            <input
                                                {...register("service_name")}
                                                className={cl(
                                                    "input input-bordered",
                                                    errors.service_name &&
                                                        "input-error"
                                                )}
                                            />
                                            <label className="text-red-500 label label-text-alt">
                                                {errors.service_name?.message}
                                            </label>
                                            <label
                                                htmlFor="cost"
                                                className="label label-text"
                                            >
                                                Custo do Serviço
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max={
                                                    projectData.budget -
                                                    projectData.cost
                                                }
                                                {...register("cost")}
                                                className={cl(
                                                    "input input-bordered",
                                                    errors.cost && "input-error"
                                                )}
                                            />
                                            <label className="text-red-500 label label-text-alt">
                                                {errors.cost?.message}
                                            </label>
                                            <label
                                                htmlFor="description"
                                                className="label label-text"
                                            >
                                                Descrição do Serviço
                                            </label>
                                            <input
                                                {...register("description")}
                                                className="mb-2 input input-bordered"
                                            />
                                            <div className="justify-end card-actions">
                                                <button className="btn btn-primary">
                                                    Enviar
                                                </button>
                                                <button
                                                    className="btn btn-neutral"
                                                    onClick={closeModal}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </>
    );
}

export default AddServiceForm;
