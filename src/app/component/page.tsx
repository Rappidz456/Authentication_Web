import Link from "next/link";
import React from "react";
import "../component/styles.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="ul">
        <li>
          <Link href={"/navHome"} className="link">
            Home
          </Link>
        </li>
        <li>
          <Link href={"/navAbout"} className="link">
            About
          </Link>
        </li>
        <li>
          <Link href={"/navContact"} className="link">
            Contact
          </Link>
        </li>
        <li>
          <Link href={"/navHire"} className="link">
            Hire
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
