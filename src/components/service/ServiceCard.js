import { useState } from "react";
import cl from "clsx";

import { MdAttachMoney } from "react-icons/md";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import EditServiceModal from "./EditServiceModal";

//TODO: Fazer o handle edit do service e tbm estilizar o service modal

function ServiceCard({
    service_name,
    cost,
    description,
    id,
    handleRemove,
    handleEditService,
}) {
    const [showEditModal, setShowEditModal] = useState(false);

    function toggleEditModal() {
        setShowEditModal(!showEditModal);
    }

    const remove = (e) => {
        e.preventDefault();
        handleRemove(id, cost);
    };

    return (
        <div
            className="card bg-base-100 shadow-lg hover:scale-105 transition duration-300"
            key={id}
        >
            {showEditModal && (
                <EditServiceModal
                    id={id}
                    serviceName={service_name}
                    cost={cost}
                    description={description}
                    toggleModalVisibility={toggleEditModal}
                    handleEditService={handleEditService}
                />
            )}
            <div className="card-body">
                <div className="card-title text-2xl font-bold text-center">
                    {service_name}
                </div>
                <div className="stats">
                    <div className="stat">
                        <div className="stat-title">Custo do serviço</div>
                        <div className="stat-figure text-primary">
                            <MdAttachMoney size={30} />
                        </div>
                        <div className="stat-value text-primary">{cost}</div>
                        <div className="stat-desc mt-2">{description}</div>
                    </div>
                </div>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-sm bg-neutral"
                        onClick={toggleEditModal}
                    >
                        <FaPencilAlt className="text-lg mr-2" />
                        editar
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={remove}>
                        <FaTrash className="text-lg mr-2" />
                        remover
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ServiceCard;
