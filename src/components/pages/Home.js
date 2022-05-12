import styles from "./Home.module.css";
import { GiAce } from "react-icons/gi";
import LinkButton from "../layout/LinkButton";

function Home() {
    return (
        <div className="grid grid-cols-3 place-items-center mt-32 justify-items-center">
            <section>
                <h1 className="text-4xl mb-2">
                    Bem-vindo ao <span className="text-primary font-bold">Costs</span>
                </h1>
                <h1 className="text-2xl mb-4">
                    Esse programinha tem a capacidade de criar e gerar projetos
                    com base em um{" "}
                    <span className="text-primary font-bold">api</span>
                </h1>
                <LinkButton
                    to="/newproject"
                    text="Criar novo projeto"
                    className="default_button btn-lg text-xl mb-8"
                />

            </section>
            <div className="col-span-2 "><GiAce className={styles.logo} /></div>
        </div>
    );
}

export default Home;
