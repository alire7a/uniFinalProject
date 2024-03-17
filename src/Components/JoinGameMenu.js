import React, {useState} from 'react';
import {useAtom} from "jotai";
import {menuStateAtom} from "../App";

const JoinGameMenu = () => {
    const [menuState,setMenuState] = useAtom(menuStateAtom)
    const [code,setCode]=useState("")
    return (
        <div>
            <div>
                Enter game's code:
            </div>
            <input value={code} onChange={e=>setCode(e.target.value)} className={"px-3 py-2 rounded-8 w-full bg-brown-40 mt-2"}>

            </input>


            <div className={"mt-4 flex gap-2 items-center"}>
                <button onClick={()=>setMenuState("")} className={"btn normal w-full"}>
                    cansel
                </button>
                <button disabled={!code} onClick={()=>setMenuState("gameJoin")} className={"btn grey-50 w-full"}>
                    connect
                </button>
            </div>
        </div>
    );
};

export default JoinGameMenu;
