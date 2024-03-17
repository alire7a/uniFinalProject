import React from 'react';
import {useAtom} from "jotai";
import {menuStateAtom} from "../App";

const CreateGameMenuPage = () => {
    const [menuState,setMenuState] = useAtom(menuStateAtom)
    return (
        <div>
           <div>
               your game's shared link is:
           </div>
            <div className={"px-3 py-2 rounded-8 w-full bg-brown-40 mt-2"}>
                https://game.com/dAWDcc
            </div>
            <div className={"mt-6"}>
                waiting for other players to join...
            </div>

            <div className={"mt-4"}>
                <button onClick={()=>setMenuState("")} className={"btn normal w-full"}>
                    cansel
                </button>
            </div>
        </div>
    );
};

export default CreateGameMenuPage;
