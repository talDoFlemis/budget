import { useState, useEffect } from "react";
import cl from "clsx";

function Message({ message, type }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!message) {
            setIsVisible(false);
            return;
        }
        setIsVisible(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    }, [message]);

    return (
        <>
            {isVisible && (
                <div
                    className={cl(
                        "alert mb-6",
                        type === "success" && "alert-success",
                        type === "error" && "alert-error"
                    )}
                >
                    <div className="flex">
                        {(type === "success" && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 mx-2 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                ></path>
                            </svg>
                        )) ||
                            (type === "error" && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6 mx-2 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                    ></path>
                                </svg>
                            ))}
                        {message}
                    </div>
                </div>
            )}
        </>
    );
}

export default Message;
