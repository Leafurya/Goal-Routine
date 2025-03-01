import './App.css';
import Lobby from './component/Lobby.js';
import Project from './component/Project.js';
import Create from './component/Create.js';
import React, {useCallback, useEffect,useRef,useState} from "react";
import ProjectModule from './modules/Project/Interface.js'

import {InitDate} from './module/TimeModule'
// import {InitAttendance} from './module/AttendanceModule.js'
// import projectBundle from './module/global/DataBundle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import todoList from './module/global/ToDo';
import ToDoToday from './component/ToDoToday';
import ToDoModify from './component/ToDoModify';
import InstallCompo from './component/sub-compo/InstallCompo.js';
import { Toast } from './component/Notices.js';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
// import { Authentication } from './module/global/Auth.js';
import { share } from './module/global/ShareMethod.js';
// import { ProjectBundle } from './module/data/DataBundle.js';

function App() {
	const install=useRef()
	const [re,refresh]=useState([])
	const projectBundle=useRef(undefined)
	share.app={
		refresh,
		setProjectBundle:useCallback((bundle)=>{
			projectBundle.current=bundle
			share.projectLists.setRe([])
		}),
		appendProject:useCallback((project)=>{
			projectBundle.current.Append(project)
			share.projectLists.setRe([])
		}),
		getProjectBundle:useCallback(()=>{
			return projectBundle.current
		})
	}
	useEffect(()=>{
		// InitAttendance()
		// InitDate()
		ProjectModule.LoadProjects().then(()=>{
			console.log(ProjectModule.GetAllProjectData());
			refresh([]);
		})
		// todoList.Init()
		// projectBundle.Init()
		/**
		 * 로그인 시 projectlists에 state로 저장된 프로젝트 번들을 새 것으로 교체하자.
		 * 이때 문제점: 수정할 때 수정할 프로젝트의 데이터는 어떻게 받아오지?
		 * 서버로부터 받아올 수 있겠지만 그건 별로일 것 같고. state를 받아오는 방법으로 해보자.
		 */
		
		// Authentication((data)=>{
		// 	// let test=new ProjectBundle(data)
		// 	// console.log(test)
		// 	share.app.setProjectBundle(new ProjectBundle(data))
		// 	setRe([])
		// })
		//프로젝트 받아오기
		//access code 저장?
		//
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
					<Route path="/Project" element={<Project/>}></Route>
					<Route path="/ToDoToday" element={<ToDoToday/>}></Route>
					<Route path="/ToDoModify" element={<ToDoModify/>}></Route>
				</Routes>
			</BrowserRouter>
			<Toast></Toast>
		</div>
	)
	// if(Object.keys(projectBundle).length){
	// }
	// else{
	// 	return "loading"
	// }
}

export default App;