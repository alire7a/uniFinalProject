import React, { useEffect, useState } from 'react';
import {useAtom} from "jotai";
import {menuStateAtom, sharedCodeAtom} from "../App";
import { socket } from '../socket';

const CreateGameMenuPage = () => {

    const [code, setCode] = useAtom(sharedCodeAtom);

    useEffect(() => {
       if(!code){
            socket.emit('create_host');
            console.log("hello world");
            socket.on('host_created', (code) => {
                setCode(code);
            });
       }
        socket.on('game_started',()=>{
            setMenuState("gameJoin")
        })
    }, [])

    const [menuState,setMenuState] = useAtom(menuStateAtom)
    return (
        <div>
           <div>
               your game's shared code is:
           </div>
            <div className={"px-3 py-2 rounded-8 w-full bg-brown-40 mt-2"}>
               { code }
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
