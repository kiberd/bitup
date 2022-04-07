import React from "react";

interface NavProps{

}

const Nav: React.FC<NavProps> = ({ children }) => {
    return (
        <nav className="py-4 px-6 text-sm font-medium">
            <ul className="flex space-x-3">
                {children}
            </ul>
        </nav>
    )
};

export default Nav;