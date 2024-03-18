import React from 'react';
import {useAtom} from "jotai";
import {menuStateAtom} from "../App";

const FirstMenuPage = () => {
    const [menuState,setMenuState] = useAtom(menuStateAtom)
    return (
        <ul className={" text-center gap-4 flex flex-col "}>
            <button className="btn grey-50" onClick={()=>{setMenuState("createGame")}}>
                <li>Create game</li>
            </button>
            <button className="btn grey-50" onClick={()=>{setMenuState("joinGame")}}>
                <li>Join game</li>
            </button>
            <button className="btn grey-50">
                <li>Settings</li>
            </button>
        </ul>
    );
};

export default FirstMenuPage;
