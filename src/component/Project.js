import React, {useEffect,useState} from 'react';
import "../style/BaseStyle.css"
import "../style/Project.css";
import "../style/Align.css";

import {TaskLists} from './sub-compo/ProjectSubCompos.js';
import Notice from '../module/Notice.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import projectBundle from '../module/global/DataBundle';
import TopNavigator from './TopNavigator';
import StateConst from '../module/global/StateConst';
import { Alert, Prompt, toastRef } from './Notices.js';

function FunctionBtns({prjName,pageUpdate,start,project}){
	const navigate=useNavigate()
	let btns=[
		<input key={1} className='function_btn' type="button" value="뒤로" onClick={()=>{
			window.history.back()
		}}></input>,
		start?<input key={2} className="when_start function_btn" type="button" value="포기" onClick={async()=>{
			navigate(`/Project?name=${prjName}&giveup=true`)
			// let str=await Notice.Prompt('프로젝트 포기를 원하신다면<br/>"포기하겠습니다"<br/>를 적고 확인을 눌러주십시오.<br/>한번 포기한 프로젝트는 복구가 불가능합니다.');
			// if(str=="포기하겠습니다"){
			// 	projectBundle.Quit(prjName)
			// 	Notice.Alert("프로젝트를 포기하셨습니다. 수고하셨습니다.");
			// 	window.history.back()
			// }
		}}></input>:"",
		start?"":<input key={3} className="when_ready function_btn" type="button" value="수정" onClick={()=>{
			navigate(`/Create?name=${prjName}`)
		}}></input>,
		start?"":<input key={4} className="when_ready function_btn" type="button" value="시작" onClick={()=>{
			if(project.Start()){
				projectBundle.Save()
				// Notice.Alert(prjName+"프로젝트가 시작됐습니다.")
				toastRef.SetMessage("프로젝트가 시작됐습니다.")
				pageUpdate([])
			}
			else{
				// Notice.Alert("프로젝트 재설정 부탁드립니다.")
				toastRef.SetMessage("프로젝트 재설정 부탁드립니다.")
			}
		}}></input>
	]
	return (
		<div className="function_btns">
			{btns}
		</div>
	)
}
function Project(props){
	const navigate=useNavigate()
	const [param,setParam]=useSearchParams()
	const prjName=param.get('name')
	const [refresh,pageUpdate]=useState([]);
	const project=projectBundle.GetProject(prjName)

	// useEffect(()=>{
	// 	if(project){
	// 		// for(var i=0,ele=document.querySelectorAll(".when_start");i<ele.length;i++){
	// 		// 	ele[i].disabled=!project.start;
	// 		// }
	// 		// for(var i=0,ele=document.querySelectorAll(".when_ready");i<ele.length;i++){
	// 		// 	ele[i].disabled=project.start;
	// 		// }
	// 		if(project.state===StateConst.ProjectDone){
	// 			// let stat=((project.stat.checkedTaskCount/project.stat.taskCount)*100).toFixed(1)+"%";
	// 			// Notice.Alert(stat+"의 성공률로 프로젝트가 끝났습니다! 이제 프로젝트 설정을 변경하거나 프로젝트를 제거 할 수 있습니다.\n 수고하셨습니다!");
	// 			project.state=StateConst.WaitToModify
	// 			projectBundle.Save()
	// 			pageUpdate([])
	// 			navigate(`/Project?name=${prjName}&alert=done`)
	// 		}
	// 	}
	// },[refresh])
	useEffect(()=>{
		// console.log("param effect",param.get('giveup'))
		if(project){
			if(project.state===StateConst.ProjectDone){
				project.state=StateConst.WaitToModify
				projectBundle.Save()
				pageUpdate([])
				navigate(`/Project?name=${prjName}&alert=done`)
			}
		}
	},[param])

	if(!project){
		window.history.back()
		return
	}
	let started=(project.state===StateConst.ProjectStart)
	let value=(project.stat.checkedTaskCount/project.stat.taskCount)*100
	let stat=(started?((value).toFixed(1)+"%"):"-%")
	return(
		<div className="borad">
			<TopNavigator title={prjName} sub={["프로젝트 끝","수정 대기중...","시작 대기중...",`성공률 ${stat}`][project.state]}></TopNavigator>
			<div className={"main_platform project_board "+(started?"":"not_start_in_prjcomp")}>
				<div>
					<div style={{height:"100%",alignItems:"center",width:"100%"}}>
						{/* <h1 className="project_day base_style">{"D"+project.D+project.GetDay()}</h1> */}
						<div style={{flex:1,display:"flex",justifyContent:"center",alignItems:"flex-end",width:"100%"}}>
							<h1 className="project_day base_style">{project.state===StateConst.WaitToModify?"D-END":project.GetDay()}</h1>
						</div>
						<div style={{flex:(project.description?0.7:0.5),display:"flex",justifyContent:"center",alignItems:"flex-start",width:"100%"}}>
							{/* <textarea style={{height:"90%",width:"100%"}} className='project_content' value={project.description} disabled readOnly></textarea> */}
							<div style={{color:"white",whiteSpace:"pre-wrap",textAlign:"center",height:"90%",overflowY:"scroll",fontSize:"large"}}>
								{project.description}
							</div>
						</div>
						{/* <h4 className="project_content base_style">{project.description}</h4> */}
					</div>
				</div>
				<ul>
					<TaskLists project={project} pageUpdate={pageUpdate}></TaskLists>
				</ul>
			</div>
			<FunctionBtns prjName={prjName} project={project} start={started} pageUpdate={pageUpdate}></FunctionBtns>
			{
				param.get("giveup")?(
					<Prompt ResultCallback={(result)=>{
						if(result){
							if(document.getElementById("prompt_text_input").value==="포기하겠습니다"){
								projectBundle.Quit(prjName)
								// pageUpdate([])
								toastRef.SetMessage("프로젝트를 종료했습니다.")
								navigate(-2)
							}
						}
						else{
							window.history.back()
						}
					}}>
						프로젝트 포기를 원하신다면<br/>
						"포기하겠습니다"<br/>
						를 적어주십시오
					</Prompt>
				):""
			}
			{
				param.get("alert")?(
					<Alert>{`${(value).toFixed(1)}% 의 성공률로 프로젝트가 끝났습니다! 이제 프로젝트 설정을 변경하거나 프로젝트를 제거 할 수 있습니다.\n 수고하셨습니다!`}</Alert>
				):""
			}
			{/* <div className="function_btns">
				<input className='function_btn' type="button" value="뒤로" onClick={()=>{
					window.history.back()
				}}></input>
				<input className="when_start function_btn" type="button" value="포기" onClick={async()=>{
					let str=await Notice.Prompt('프로젝트 포기를 원하신다면<br/>"포기하겠습니다"<br/>를 적고 확인을 눌러주십시오.<br/>한번 포기한 프로젝트는 복구가 불가능합니다.');
					if(str=="포기하겠습니다"){
						projectBundle.Quit(prjName)
						Notice.Alert("프로젝트를 포기하셨습니다. 수고하셨습니다.");
						window.history.back()
					}
				}}></input>
				<input className="when_ready function_btn" type="button" value="수정" onClick={()=>{
					navigate(`/Create?name=${prjName}`)
				}}></input>
				<input className="when_ready function_btn" type="button" value="시작" onClick={()=>{
					if(project.Start()){
						projectBundle.Save()
						Notice.Alert(prjName+"프로젝트가 시작됐습니다.")
						pageUpdate({...refresh})
					}
					else{
						Notice.Alert("프로젝트 재설정 부탁드립니다.")
					}
				}}></input>
			</div> */}
		</div>
	)
}
export default Project;