import React, {useState} from 'react';
import {useAtom} from "jotai";
import {isHostAtom, menuStateAtom, sharedCodeAtom} from "../App";
import {socket} from "../socket";

const JoinGameMenu = () => {
    const [menuState,setMenuState] = useAtom(menuStateAtom)
    const [inputCode,setInputCode]=useState("")
    const [message,setMessage]=useState("")
    const [code, setCode] = useAtom(sharedCodeAtom);
    const [isHost,setIsHost]=useAtom(isHostAtom)
    const handleSubmit=()=>{
        socket.emit("join_guest", inputCode)
        socket.on('invalid_code',()=>{
           setMessage("invalid code")
        })
        socket.on('game_started',()=>{
            setMenuState("gameJoin")
            setCode(inputCode)
            setIsHost(false)
        })
    }
    return (
        <div>
            <div>
                Enter game's code:
            </div>
            <input value={inputCode} onChange={e=>setInputCode(e.target.value)} className={"px-3 py-2 rounded-8 w-full bg-brown-40 mt-2"}>

            </input>
            {
                message&&
                    <div className={"mt-2 text-red-secondary"}>
                        {message}
                    </div>
            }


            <div className={"mt-4 flex gap-2 items-center"}>
                <button onClick={()=>setMenuState("")} className={"btn normal w-full"}>
                    cansel
                </button>
                <button disabled={!inputCode} onClick={handleSubmit} className={"btn grey-50 w-full"}>
                    connect
                </button>
            </div>
        </div>
    );
};

export default JoinGameMenu;
