import React, { useEffect, useRef } from 'react';
import "../style/BaseStyle.css";
// import "../style/Create.css";
import "../style/Align.css";

// import {DeleteBtn,InputTaskPart,TypeChoicePart} from "./sub-compo/CreateSubCompos.js";
import { useNavigate, useSearchParams } from 'react-router-dom';
import projectBundle from '../module/global/DataBundle';
import TopNavigator from './TopNavigator';
import todoList from '../module/global/ToDo';
import { GetElement, GetTaskFromInput } from '../module/CreateCompModule';
import Notice from '../module/Notice';
import { Confrim, toastRef } from './Notices.js';

function InspectSaveData(originData){
	let tasks=GetTaskFromInput("task_input")??{};
	let taskInputValue=GetElement("input_for_task").value
	// console.log(`${projectName},${description},${D},${Day},${tasks},${lastTasks}`)

	// let data=CreateDataObj(description,tasks,D,Day,lastTasks)
	// let prj=new Project(projectName,data)
	// console.log(JSON.stringify(prj))
	if(JSON.stringify(originData)!==JSON.stringify(tasks)||taskInputValue!==""){
		return true
	}

	return false
}
function CreateBtn({resultAction}){
	return(
		<input className="function_btn" type="button" defaultValue="저장" onClick={()=>{
			
			let tasks=GetTaskFromInput("task_input");
			let taskInputValue=GetElement("input_for_task").value

			if(taskInputValue!==""){
				toastRef.SetMessage("할 일의 입력칸을 비워주세요.")
				return
			}
			if(!tasks){
				// Notice.Alert("도전과제가 비어있습니다.");
				toastRef.SetMessage("할 일이 비어있습니다.")
				return;
			}
			// console.log("tasks",tasks)
			todoList.SetData(tasks)
			// window.history.back()
			resultAction()
		}}></input>
	)
}

export default ({})=>{
	const [param,setParam]=useSearchParams()
	const notiCompo=useRef("")
	const action=useRef({
		data:false,
		from:"save"
	})
	const navigate=useNavigate()
	let isCreate=todoList.stat.taskCount===0
	useEffect(()=>{
		console.log("todomodi useeffect")
		// eslint-disable-next-line no-restricted-globals
		if(!history.state.hello){
			// eslint-disable-next-line no-restricted-globals
			history.pushState({hello:1}, '', location.href)
		}
		window.onpopstate=(e)=>{
			// eslint-disable-next-line no-restricted-globals
			console.log("onpopstate",action.current)
	
			switch(action.current.from){
				case "":{
					return
				}
				default:{
					if(action.current.data){
						console.log("state pushed")
						// eslint-disable-next-line no-restricted-globals
						history.pushState({hello:1}, '', location.href)
						action.current.data=false
						return
					}
					try{
						// eslint-disable-next-line no-restricted-globals
						history.replaceState({hello:1},'',location.href)
						// eslint-disable-next-line no-restricted-globals
						// console.log("onpopstate",history.state)
						if(InspectSaveData(todoList.data)){
							navigate(`/ToDoModify?confirm=save`)
						}
						else{
							navigate(-1)
						}
					}catch(e){
						console.log(e)
					}
				}
			}
		}
	},[])
	switch(param.get("confirm")){
		case "save":{
			notiCompo.current=<Confrim ResultCallback={(result)=>{
				if(result){ //확인
					window.onpopstate=()=>{}
					// action.current.data=true
					// action.current.from="save"
					navigate(-2)
				}
				else{ //취소
					action.current.data=true
					action.current.from="save"
					navigate(-1)
				}
			}}>{`오늘 할 일 ${isCreate?"생성":"수정"}을`}<br/>취소하겠습니까?</Confrim>
			break
		}
		default:{
			notiCompo.current=""
			break
		}	
	}
	return(
		<div className="borad">
			<TopNavigator title="오늘 할 일"></TopNavigator>
			<div className="main_platform">
				{/* <InputTaskPart prj={{tasks:todoList.data}}></InputTaskPart> */}
			</div>
			<div className="function_btns">
				<input className="function_btn" type="button" value="뒤로" onClick={()=>{
					action.current.from="save"
					action.current.data=false
					navigate(-1)
				}}></input>
				<CreateBtn resultAction={()=>{
					action.current.from=""
					navigate(-2)
				}}></CreateBtn>
			</div>
			{notiCompo.current}
		</div>
	)
}