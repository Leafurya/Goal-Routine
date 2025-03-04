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
// import Project from './component/Project.js';
// import {InitDate} from './module/TimeModule'
// import {InitAttendance} from './module/AttendanceModule.js'
// import projectBundle from './module/global/DataBundle';
// import todoList from './module/global/ToDo';
// import ToDoToday from './component/ToDoToday';
// import ToDoModify from './component/ToDoModify';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
// import { Authentication } from './module/global/Auth.js';
//import { share } from './module/global/ShareMethod.js'; //??
// import { ProjectBundle } from './module/data/DataBundle.js';

function App() {
	const [re,refresh]=useState([])
	useEffect(()=>{
		ProjectModule.LoadProjects().then(()=>{
			console.log(ProjectModule.GetAllProjectData());
			refresh([]);
		})
	},[])
	
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