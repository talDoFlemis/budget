import cl from "clsx";
import { Link } from "react-router-dom";

import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { BsGraphUp, BsGraphDown } from "react-icons/bs";
// import Modal from "../layout/Modal";

function ProjectCard({ name, id, budget, category, cost, tags, handleRemove }) {
    function remove(id, name) {
        handleRemove(id, name);
    }
    return (
        <>
            <div
                className="mb-10 hover:scale-105 ease-out duration-300"
                key={id}
            >
                <div className="indicator">
                    <div
                        className={cl(
                            "indicator-item indicator-center badge border-none",
                            category.id === "1" && "bg-cyan-500",
                            category.id === "2" && "bg-purple-700",
                            category.id === "3" && "bg-amber-400",
                            category.id === "4" && "bg-rose-600"
                        )}
                    >
                        {category.category_name}
                    </div>
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h1 className="card-title text-primary text-2xl mb-2 text-center">
                                {name}
                            </h1>
                            <div className="stats">
                                <div className="stat mb-2">
                                    <div className="stat-figure text-accent text-2xl ml-2">
                                        <BsGraphDown />
                                    </div>
                                    <div className="stat-title">Custo</div>
                                    <div className="stat-value text-accent text-2xl">
                                        R$: {cost}
                                    </div>
                                </div>
                                <div className="stat mb-2">
                                    <div className="stat-figure text-secondary text-2xl ml-2">
                                        <BsGraphUp />
                                    </div>
                                    <div className="stat-title">Orçamento</div>
                                    <div className="stat-value text-secondary text-2xl">
                                        R$: {budget}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 my-4">
                                <progress
                                    className="progress progress-accent"
                                    value={cost}
                                    max={budget}
                                ></progress>
                            </div>
                            <div className="flex flex-wrap justify-end mb-2">
                                {tags.map(({ id, tag_name }) => (
                                    <div
                                        className="badge badge-accent mx-1"
                                        key={id}
                                    >
                                        {tag_name}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Link
                                    to={`/project/${id}`}
                                    className="btn btn-sm btn-neutral"
                                >
                                    <FaPencilAlt className="text-lg mr-2" />
                                    Editar
                                </Link>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={(e) => (
                                        e.preventDefault, remove(id)
                                    )}
                                >
                                    <FaTrash className="text-lg mr-2" />
                                    Remover
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectCard;
