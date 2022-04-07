import React from "react";
import exp from "constants";

interface NavItem {
    onHandleClick: any,
    isActive: boolean,
}

const NavItem: React.FC<NavItem> = ({onHandleClick, isActive, children}) => {

    const handleClick = () => {
        onHandleClick(children);
    }

    return (
        <li>
            <a onClick={handleClick} className={`block px-20 py-2 rounded-md ${isActive ? 'bg-sky-500 text-white' : 'bg-slate-50'} cursor-pointer`} >
                {children}
            </a>
        </li>
    )
}

export default NavItem;
