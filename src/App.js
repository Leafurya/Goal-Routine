import "./fonts/pretendard.css"
import './App.css';

import React, {useEffect,useState} from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Lobby from './component/Lobby.js';
import Create, { Modify } from './component/Create.js';
import InstallCompo from './component/sub-compo/InstallCompo.js';
import { Delete } from './component/Delete.js';
import { Toast } from './component/Notices.js';

import ProjectModule from './modules/Project/Interface.js'

function App() {
	const [re,refresh]=useState([])
	useEffect(()=>{
		try{
			ProjectModule.LoadProjects().then(()=>{
				// console.log("ProjectModule.GetAllProjectData()",ProjectModule.GetAllProjectData());
				refresh([]);
			})
		}catch(e){
			refresh(e)
		}
	},[])

	if(typeof(re)==="string"){
		return re
	}
	
	if(process.env.NODE_ENV!=="development"){
		if(!window.matchMedia("(display-mode: standalone)").matches){
			return <InstallCompo></InstallCompo>
		}
	}

	return (
			
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Lobby/>}></Route>
					<Route path="/Create" element={<Create/>}></Route>
					<Route path="/Modify" element={<Modify/>}></Route>
					<Route path="/Delete" element={<Delete/>}></Route>
				</Routes>
			</BrowserRouter>
			<Toast></Toast>
		</div>
	)
}

export default App;