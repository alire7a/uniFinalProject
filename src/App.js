import './App.scss';
import {useEffect, useRef, useState} from "react";
import {canvasFunc} from "./canvas";
import FirstMenuPage from "./Components/FirstMenuPage";
import CreateGameMenuPage from "./Components/CreateGameMenuPage";
import {atom, useAtom} from "jotai";
import JoinGameMenu from "./Components/JoinGameMenu";

export const menuStateAtom = atom("")
export const isMenuOpenAtom = atom(true)
export const sharedCodeAtom = atom("")
export const isHostAtom = atom(true)



function App() {

    const [isHost,setIsHost]=useAtom(isHostAtom)
    const [sharedCode,setSharedCode] = useAtom(sharedCodeAtom)
    const [menuState,setMenuState]=useAtom(menuStateAtom)
    const [isMenuOpen,setIsMenuOpen]=useAtom(isMenuOpenAtom)
    const [isGameStarted,setIsGameStarted]=useState(false)

    useEffect(()=>{
        if (isGameStarted){
            canvasFunc(sharedCode,isHost)
        }
    },[isGameStarted])

    useEffect(()=>{
        if (menuState == "gameJoin"){
            setIsGameStarted(true)
            setIsMenuOpen(false)
        }
    },[menuState])

    const RenderMenu =()=>{
        switch (menuState){
            case "":
                return <FirstMenuPage/>
                break;
            case "createGame":
                return <CreateGameMenuPage/>
                break;
            case "joinGame":
                return <JoinGameMenu/>
                break;
            case "gameJoin":
                return <></>
        }
    }
  return (
    <div className="h-screen relative bg-gray-90">
        {isGameStarted && <canvas/>}
        {isMenuOpen &&
            <div className={"menu rounded-12 min-w-[400px] p-8 fixed inset-0 m-auto w-fit h-fit bg-brown-80 text-gray-50"}>
                 <RenderMenu/>
             </div>
        }
      <h1 id="pointPreview" className={"bg-brown-50 rounded-12 text-gray-50"}>
        start the game
      </h1>
        <div id={"countDown"} className={"absolute text-[96px] inset-0 w-fit h-fit flex items-center justify-center m-auto bg-gray-90 leading-[85px] text-brown-40 rounded-8  pointer-events-none  "}>
        </div>
        <div id={"endgame"} className={"absolute text-[96px] inset-0 w-fit h-fit bg-[yellow] flex items-center justify-center m-auto text-brown-40 rounded-8  pointer-events-none  "}>

        </div>

    </div>
  );
}

export default App;
