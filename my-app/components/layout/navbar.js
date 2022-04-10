import Link from "next/link";

import classes from './navbar.module.css';

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <Link href='/'>Inicio</Link>
            <Link href='/audit'>Check-list</Link>
        </nav>
    )
}

export default Navbar;