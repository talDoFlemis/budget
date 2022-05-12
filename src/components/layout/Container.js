import cl from 'clsx'
import styles from "./Container.module.css";

function Container(props, {className}) {
    return (
        <div className={cl(styles.container,styles[props.customClass], props.className)}>
            {props.children}
        </div>
    );
}

export default Container;
