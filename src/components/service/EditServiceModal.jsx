import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import cl from "clsx";
import Input from "../forms/Input";
import Submit from "../forms/Submit";

//TODO: MUDAR PRO REACT HOOK FORM COM FORM VALIDATION

function EditServiceModal({
    id,
    serviceName,
    cost,
    description,
    toggleModalVisibility,
    handleEditService,
}) {
    const [isOpen, setIsOpen] = useState(true);
    const [service, setService] = useState({});

    function submit(e) {
        e.preventDefault();
        setIsOpen(false);
        handleEditService(service, id);
    }

    function handleChangeName(e) {
        setService({ ...service, [e.target.name]: e.target.value });
    }
    function handleChangeNumber(e) {
        setService({ ...service, cost: parseFloat(e.target.value) });
    }

    function closeModal() {
        setIsOpen(false);
        toggleModalVisibility();
    }

    return (
        <>
            {toggleModalVisibility && (
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
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
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
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden card align-middle text-left bg-white">
                                    <div className="card-body p-0">
                                        <Dialog.Title className="card-title">
                                            Editando o projeto {serviceName}
                                        </Dialog.Title>
                                        <form
                                            onSubmit={submit}
                                            className="flex flex-col"
                                        >
                                            <Input
                                                type="text"
                                                text="Nome do serviço"
                                                name="service_name"
                                                placeholder={serviceName}
                                                handleOnChange={
                                                    handleChangeName
                                                }
                                            />
                                            <Input
                                                type="number"
                                                text="Custo do serviço"
                                                name="cost"
                                                min="0"
                                                placeholder={cost}
                                                handleOnChange={
                                                    handleChangeNumber
                                                }
                                            />
                                            <Input
                                                type="text"
                                                text="Descrição do projeto"
                                                name="description"
                                                handleOnChange={
                                                    handleChangeName
                                                }
                                                placeholder={description}
                                            />
                                            <div className="card-actions justify-end">
                                                <button className="btn btn-primary">
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
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

export default EditServiceModal;
