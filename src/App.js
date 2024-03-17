import './App.scss';
import {useEffect, useRef, useState} from "react";
import {canvasFunc} from "./canvas";
import FirstMenuPage from "./Components/FirstMenuPage";
import CreateGameMenuPage from "./Components/CreateGameMenuPage";
import {atom, useAtom} from "jotai";
import JoinGameMenu from "./Components/JoinGameMenu";

export const menuStateAtom = atom("")
export const isMenuOpenAtom = atom(true)
function App() {

    const [menuState,setMenuState]=useAtom(menuStateAtom)
    const [isMenuOpen,setIsMenuOpen]=useAtom(isMenuOpenAtom)
    const [isGameStarted,setIsGameStarted]=useState(false)

    useEffect(()=>{
        if (isGameStarted){
            canvasFunc()
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
    <div className="h-screen bg-gray-90">
        {isGameStarted && <canvas/>}
        {isMenuOpen &&
            <div className={"menu rounded-12 min-w-[400px] p-8 fixed inset-0 m-auto w-fit h-fit bg-brown-80 text-gray-50"}>
                 <RenderMenu/>
             </div>
        }
      <h1 id="pointPreview">
        salam
      </h1>
        <div id={"countDown"} className={"fixed text-40 w-20 h-10 pointer-events-none  inset-1/2 m-auto"}>
        </div>


    </div>
  );
}

export default App;
