import React from 'react';
import {useAtom} from "jotai";
import {menuStateAtom} from "../App";

const FirstMenuPage = () => {
    const [menuState,setMenuState] = useAtom(menuStateAtom)
    return (
        <ul className={" text-center gap-4 flex flex-col "}>
            <button onClick={()=>{setMenuState("createGame")}}>
                <li>Create game</li>
            </button>
            <button onClick={()=>{setMenuState("joinGame")}}>
                <li>Join game</li>
            </button>
            <button>
                <li>Settings</li>
            </button>
        </ul>
    );
};

export default FirstMenuPage;
