import React from "react";

interface ListProps {

}

const List:React.FC <ListProps> = ({ children }) => {
    return (
        <ul className="divide-y divide-slate-100">
            {children}
        </ul>
    )
}

export default List;