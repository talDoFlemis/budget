import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { GiAce } from "react-icons/gi";

function Footer() {
    return (
        <footer className="footer absolute bottom-0 bg-gray py-4 px-40 items-center text-white mt-8">
            <div className="flex items-center">
                <GiAce className="text-5xl"/>
                <p className="text-xl">Flemis Teste</p>
            </div>

            <ul className="flex justify-center text-xl ml-auto">
                <li className="m-2 hover:cursor-pointer hover:text-accent">
                    <FaFacebook className="text-2xl"/>
                </li>
                <li className="m-2 hover:cursor-pointer hover:text-accent">
                    <FaInstagram className="text-2xl"/>
                </li>
                <li className="m-2 hover:cursor-pointer hover:text-accent">
                    <FaYoutube className="text-2xl"/>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;
