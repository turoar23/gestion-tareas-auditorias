import Link from "next/link";

import classes from './navbar.module.css';

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <Link href='/'>Inicio</Link>
            <Link href='/checklist'>Check-list</Link>
            <Link href='/audit'>Auditorias</Link>
        </nav>
    )
}

export default Navbar;