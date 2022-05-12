import { NavLink } from "react-router-dom";
import cl from "clsx";

function LinkButton({ to, text, className }) {
    return (
        <>
            <NavLink to={to} className={cl("btn", className)}>
                {text}
            </NavLink>
        </>
    );
}

export default LinkButton;
