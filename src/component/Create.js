import React, { useEffect, useRef, useState } from 'react';
import "../style/BaseStyle.css";
import "../style/CreateStyle.css";
import "../style/Align.css";

// import {DeleteBtn,InputTaskPart,TypeChoicePart,CreateBtn} from "./sub-compo/CreateSubCompos.js";
import { useNavigate, useSearchParams } from 'react-router-dom';
import projectBundle, { Project } from '../module/data/DataBundle';
import { Confrim, toastRef } from './Notices.js';
import { GetElement, GetTaskFromInput } from '../module/CreateCompModule.js';
import { CreateDataObj } from '../module/DataModule.js';
import TextInput from './global/TextInput.js';
import Calendar from './global/Calendar.js';
import { GetDateDiff } from '../module/TimeModule.js';
import TaskCard from './global/TaskCard.js';
import Task from '../module/data/Task.js';
import userInfo from '../module/global/User.js';
import { share } from '../module/global/ShareMethod.js';
import ProjectModule from '../modules/Project/Interface.js';


function InspectSaveData(originData){
	let projectName=GetElement("prj_name").value;
	let description=GetElement("prj_cntnt").value;
	let D=GetElement("prj_type").value
	let Day=(D==="+")?0:parseInt(GetElement("prj_day").value);
	let tasks=GetTaskFromInput("task_input");
	let lastTasks=(D==="+")?null:GetTaskFromInput("last_task_input"); //if lastTasks not exist, value is null
	let taskInputValue=GetElement("input_for_task").value
	let lasttaskInputValue=(GetElement("input_for_lasttask")?.value)??""
	// console.log(`${projectName},${description},${D},${Day},${tasks},${lastTasks}`)

	let data=CreateDataObj(description,tasks,D,Day,lastTasks)
	let prj=new Project(projectName,data)
	// console.log(JSON.stringify(prj))
	if(JSON.stringify(originData)!==JSON.stringify(prj)||taskInputValue!==""||lasttaskInputValue!==""){
		return true
	}

	return false
}

/**
 * 프로젝트 생성이라면 파라미터를 받지 않고 프로젝트 수정이라면 프로젝트 이름을 파라미터로 받는다.
 * 이를 바탕으로 프로젝트 객체를 만든다.
 * 프로젝트의 정보를 보여준다.
 * 프로젝트에 정보를 입력한다.
 * 저장 혹은 삭제한다.
 * 
 * @param {*} param0 
 * @returns 
 */
// function CreateV2({}){
// 	const today=new Date()
// 	today.setHours(0,0,0,0)

// 	const projectData=useRef({
// 		getTaskDataRef:{}
// 	})

	
// 	const [param,setParam]=useSearchParams()
// 	const [selectMode,setSelectMode]=useState("end")

// 	const [content,setContent]=useState("")
// 	const [type,setType]=useState(0) //0: +, 1: -
// 	const [taskGroupCount,setTaskGroupConut]=useState([1,1])
// 	const [dtData,setDtData]=useState({
// 		start:new Date(today)
// 	})

	
// 	let {start,end}=dtData
// 	console.log("start",start)
// 	// const [prjData,setData]=useState(projectBundle.GetProject(param.get("name"))??new Project("",CreateDataObj("",null,0,0,null)))
// 	const navigate=useNavigate()

// 	useEffect(()=>{
// 		let end=new Date(today)
// 		end.setDate(end.getDate()+1)
// 		dtData.end=end
// 	},[])

// 	const CreateTaskGroup=()=>{
// 		let cards=[]
// 		for(let i=0;i<taskGroupCount[type];i++){
// 			cards.push(<TaskCard getDataRef={projectData.current.getTaskDataRef} groupId={i} key={type+i} title={`할 일 그룹 ${i+1}`}></TaskCard>)
// 		}
// 		return (cards)
// 	}

// 	return(
// 		<div className="borad">
// 			<form className='main_platform'>
// 				<div className='type_pick'>
// 					<input style={{display:"none"}} id='type_plus' type='radio' name="type" value="+" onClick={()=>{
// 						if(start>today){
// 							setDtData({...dtData,start:today})
// 						}
// 						setType(0)
// 					}}></input>
// 					<input style={{display:"none"}} id='type_min' type='radio' name="type" value="-" onClick={()=>{setType(1)}}></input>

// 					<div style={{display:"flex"}}>
// 						<label className={type?"":"checked"} htmlFor='type_plus'>
// 							D+1
// 						</label>
// 						<label className={type?"checked":""} htmlFor='type_min'>
// 							D-Day
// 						</label>
// 					</div>
// 					<div style={{backgroundColor:"white"}}>
// 						{
// 							type===0?(
// 								<>
// 									<div>
// 										D+{GetDateDiff(today,start)+1}
// 									</div>
// 									<div>
// 										<input style={{display:"none"}} id="start_date" type="button"></input>
// 										<label htmlFor='start_date'>
// 											시작 날짜: {`${start.getFullYear()}-${(start.getMonth()+1)<10?"0"+(start.getMonth()+1):(start.getMonth()+1)}-${start.getDate()<10?"0"+start.getDate():start.getDate()}`}
// 										</label>
// 									</div>
// 									<div className='day_pick'>
// 										<div>
// 											<Calendar start={start} onChange={(date)=>{
// 												if(date>today){
// 													toastRef.SetMessage("오늘보다 이후의 날짜는 선택할 수 없습니다.")
// 													return
// 												}
// 												setDtData({...dtData,start:date})
// 											}}>
// 												<DayCell></DayCell>
// 											</Calendar>
// 										</div>
// 									</div>
// 								</>
// 							):(
// 								<>
// 									<div>
// 										<label htmlFor='prj_day'>
// 											D-<span >{GetDateDiff(end,start)}</span>
// 										</label>
// 										<input onFocus={(event)=>{
// 											event.target.select()
// 											document.querySelector("label[for=prj_day] span").classList="text_selected"
// 										}} onBlur={()=>{
// 											document.querySelector("label[for=prj_day] span").classList.remove("text_selected")
// 										}} className='base_style' type="number" id="prj_day" defaultValue={GetDateDiff(end,start)} onChange={(event)=>{
// 											let diff=Number(event.target.value)
// 											if(diff===0){
// 												diff=1
// 												event.target.select()
// 												document.querySelector("label[for=prj_day] span").classList.add("text_selected")
// 											}
// 											else{
// 												document.querySelector("label[for=prj_day] span").classList.remove("text_selected")
// 											}
											
// 											let temp=new Date(start)
// 											temp.setDate(start.getDate()+diff)
// 											setDtData({...dtData,end:temp})
// 										}}></input>
// 									</div>
// 									<div>
// 										<input name={"start"} style={{display:"none"}} id="start_date" type="button" onClick={()=>{
// 											setSelectMode("start")
// 										}}></input>
// 										<label className={selectMode==="start"?"mode_selected":""} htmlFor='start_date'>
// 											시작 날짜: {`${start.getFullYear()}-${(start.getMonth()+1)<10?"0"+(start.getMonth()+1):(start.getMonth()+1)}-${start.getDate()<10?"0"+start.getDate():start.getDate()}`}
// 										</label>
// 									</div>
// 									<div>
// 										<input name={"end"} style={{display:"none"}} id="end_date" type="button" onClick={()=>{
// 											setSelectMode("end")
// 										}}></input>
// 										<label className={selectMode==="end"?"mode_selected":""} htmlFor='end_date'>
// 											종료 날짜: {`${end.getFullYear()}-${(end.getMonth()+1)<10?"0"+(end.getMonth()+1):(end.getMonth()+1)}-${end.getDate()<10?"0"+end.getDate():end.getDate()}`}
// 										</label>
// 									</div>
// 									<div className='day_pick'>
// 										<div>
// 											{
// 												selectMode==="start"?(
// 													<Calendar start={start} end={end} onChange={(date)=>{
// 														if(date>end){
// 															setDtData({start:date,end:date})
// 															return
// 														}
// 														if(date<today){
// 															toastRef.SetMessage("오늘보다 이전의 날짜는 선택할 수 없습니다.")
// 															return
// 														}
// 														setDtData({...dtData,start:date})
// 													}}>
// 														<DayCell></DayCell>
// 													</Calendar>
// 												):(
// 													<Calendar start={start} end={end} onChange={(date)=>{
// 														if(date>start){
// 															setDtData({...dtData,end:date})
// 															return
// 														}
// 														toastRef.SetMessage("시작 날짜의 다음 날짜부터 선택 가능합니다.")
// 													}}>
// 														<DayCell></DayCell>
// 													</Calendar>
// 												)
// 											}
// 										</div>
// 									</div>
// 								</>
// 							)
// 						}
// 					</div>
// 					<div className="title">
// 						<TextInput name={"title"} placeholder={'제목'} className={"input"} data={"task_input"} id="input_for_title" onChange={(event)=>{
// 							projectData.current.title=event.target.value
// 						}} style={{color:"black"}}></TextInput>
// 					</div>
// 					<div className="task_inputs">
// 						<ul style={{padding:0}}>
// 							{<TaskCard name={"item[]"} getDataRef={projectData.current.getTaskDataRef} groupId={i} key={type+i} title={`할 일 그룹 ${i+1}`}></TaskCard>}
// 							{
// 								type?(<TaskCard name={"lastitem[]"} getDataRef={projectData.current.getTaskDataRef} groupId={-1} title="마지막 날 할 일 그룹"></TaskCard>):""
// 							}
// 						</ul>
// 						<div>
// 							<input type="button" value="그룹 추가" onClick={()=>{
// 								taskGroupCount[type]++
// 								setTaskGroupConut({...taskGroupCount})
// 							}}></input>
// 						</div>
// 					</div>
// 				</div>
// 			</form>
// 			<div className='page_create function_btns'>
// 				<label>
// 					<div>뒤로가기</div>
// 					<input type="button" onClick={()=>{
// 						navigate(-1)
// 					}}></input>
// 				</label>
// 				<label>
// 					<div>저장</div>
// 					<input type="button" onClick={()=>{
// 						const form = document.querySelector("form.main_platform");
// 						const formData = new FormData(form);
// 						console.log(formData);
// 						//title 값 가져오기
// 						//type 값 가져오기
// 						//start 값 가져오기
// 						//end 값 가져오기
// 						//할 일 값 가져오기
// 						// console.log(projectData.current)
// 						// let tasks=[]
// 						// Object.values(projectData.current.getTaskDataRef).map((getData)=>{
// 						// 	tasks.push(getData())
// 						// })
// 						// console.log("tasks",tasks)
// 						// let msg={
// 						// 	title:projectData.current.title,
// 						// 	type,
// 						// 	start:(start.getTime()/1000),
// 						// 	end:(end?.getTime()/1000)
// 						// 	,tasks
// 						// }

// 						// console.log("msg",msg)
// 						// let newProject=new Project({
// 						// 	name:projectData.current.title,
// 						// 	type:(type?"-":"+"),
// 						// 	end:(end?new Date(end):undefined),
// 						// 	start:(start?new Date(start):undefined),
// 						// 	nowTaskGroup:0
// 						// })
// 						// console.log("newProject",newProject)
// 						// newProject.tasks=tasks

// 						// console.log(JSON.stringify(msg))
// 						// fetch(`${process.env.REACT_APP_API_HOST}/api/create_project`,{
// 						// 	method:"POST",
// 						// 	headers:{
// 						// 		"Content-Type":"application/json"
// 						// 	},
// 						// 	body:JSON.stringify(msg),
// 						// 	credentials:"include"
// 						// }).then((res)=>{
// 						// 	if(res.status===200){
// 						// 		return res.json()
// 						// 	}
// 						// 	console.log(res)
// 						// }).then((data)=>{
// 						// 	if(data){
// 						// 		toastRef.SetMessage("프로젝트를 생성했습니다.")
// 						// 		newProject.id=data.idProject
// 						// 		share.app.appendProject(newProject)
// 						// 		share.projectLists.setRe([])
// 						// 		navigate(-1)
// 						// 	}
// 						// })
// 					}}></input>
// 				</label>
				
// 			</div>
// 		</div>
// 	)
// }
function CreateV3({}){
	const today=new Date()
	const [param,setParam]=useSearchParams();
	let ID=param.get("id");
	// today.setHours(0,0,0,0)

	const projectDataRef=useRef(ProjectModule.GetProjectPropsById(ID)??{
		id:today.getTime(),
		title:null,
		type:"+",
		start:today.toLocaleDateString(),
		end:null,
		items:[]
	});
	const projectData=projectDataRef.current;
	let {id,title,type,start,end,items}=projectData;
	if(!end){
		let t=new Date();
		t.setDate(today.getDate()+1);
		end=t.toLocaleDateString();
	}

	
	
	// const [selectMode,setSelectMode]=useState(type==="+"?"start":"end");

	// const [content,setContent]=useState("")
	// // const [type,setType]=useState(0) //0: +, 1: -
	const [taskGroupCount,setTaskGroupConut]=useState({"+":1,"-":1})
	// const [dtData,setDtData]=useState({
	// 	start:new Date(today)
	// })

	
	// let {start,end}=dtData
	console.log("start",start)

	// start=today.toLocaleDateString();
	// end=

	const [re,refresh]=useState([])
	// const [prjData,setData]=useState(projectBundle.GetProject(param.get("name"))??new Project("",CreateDataObj("",null,0,0,null)))
	const navigate=useNavigate()

	useEffect(()=>{
		// let end=new Date(today)
		// end.setDate(end.getDate()+1)
		// dtData.end=end
	},[])

	const CreateTaskGroup=()=>{
		let cards=[]
		for(let i=0;i<taskGroupCount[type];i++){
			cards.push(<TaskCard className={"itemGroup"} tasks={items[i+1]} groupId={i+1} name={"items"} key={type+(i+1)} title={`할 일 그룹 ${i+1}`}></TaskCard>)
		}
		return (cards)
	}

	return(
		<div className="borad">
			<form className='main_platform'>
				<div className='type_pick'>
					<input style={{display:"none"}} id='type_plus' type='radio' name="type" value="+" defaultChecked={type==="+"} onClick={(event)=>{
						if(ProjectModule.GetDaysBetween(start,today)<0){
							projectData.start=today.toLocaleDateString();
						}
						projectData.type="+";
						refresh([]);
					}}></input>
					<input style={{display:"none"}} id='type_min' type='radio' name="type" value="-" defaultChecked={type==="-"} onClick={()=>{
						if(ProjectModule.GetDaysBetween(today.toDateString(),start)<0){
							projectData.start=today.toLocaleDateString();
						}
						projectData.type="-";
						refresh([]);
					}}></input>

					<div style={{display:"flex"}}>
						<label className={type==="+"?"checked":""} htmlFor='type_plus'>
							D+1
						</label>
						<label className={type==="-"?"checked":""} htmlFor='type_min'>
							D-Day
						</label>
					</div>
					<div style={{backgroundColor:"white"}}>
						{
							type==="+"?(
								<>
									<div>
										D+{ProjectModule.GetDaysBetween(start,today)+1/*GetDateDiff(today,start)+1*/}
									</div>
									<div>
										<input name={"start"} style={{display:"none"}} id="start_date" type="text" defaultValue={start}></input>
										<label htmlFor='start_date'>
											{/* 시작 날짜: {`${start.getFullYear()}-${(start.getMonth()+1)<10?"0"+(start.getMonth()+1):(start.getMonth()+1)}-${start.getDate()<10?"0"+start.getDate():start.getDate()}`} */}
											시작 날짜: {start}
										</label>
									</div>
									<div className='day_pick'>
										<div>
											<Calendar start={new Date(start)} onChange={(date)=>{
												let _today=new Date(today);
												if(date>_today){
													toastRef.SetMessage("오늘보다 이후의 날짜는 선택할 수 없습니다.")
													return
												}
												// document.querySelector("input[name=start]").value=date
												// setDtData({...dtData,start:date})
												projectData.start=date.toLocaleDateString();
												refresh([]);
											}}>
												<DayCell></DayCell>
											</Calendar>
										</div>
									</div>
								</>
							):(
								<>
									<div>
										<label htmlFor='prj_day'>
											D-<span >{ProjectModule.GetDaysBetween(start,end??start)}</span>
										</label>
										<input onFocus={(event)=>{
											event.target.select()
											document.querySelector("label[for=prj_day] span").classList="text_selected"
										}} onBlur={()=>{
											document.querySelector("label[for=prj_day] span").classList.remove("text_selected")
										}} className='base_style' type="number" id="prj_day" defaultValue={ProjectModule.GetDaysBetween(start,end??start)} onChange={(event)=>{
											console.log(event.target.value)
											let diff=Number(event.target.value)
											if(diff===0){
												diff=1
												event.target.select()
												document.querySelector("label[for=prj_day] span").classList.add("text_selected")
											}
											else{
												document.querySelector("label[for=prj_day] span").classList.remove("text_selected")
											}
											
											let temp=new Date(start)
											temp.setDate(temp.getDate()+diff)
											// // setDtData({...dtData,end:temp})
											projectData.end=temp.toLocaleDateString();
											refresh([]);
										}}></input>
									</div>
									<div>
										<input name={"start"} style={{display:"none"}} id="start_date" type="text" defaultValue={start} onClick={()=>{
											// setSelectMode("start")
										}}></input>
										<label  htmlFor='start_date'>
											{/* 시작 날짜: {`${start.getFullYear()}-${(start.getMonth()+1)<10?"0"+(start.getMonth()+1):(start.getMonth()+1)}-${start.getDate()<10?"0"+start.getDate():start.getDate()}`} */}
											시작 날짜: {start}
										</label>
									</div>
									<div>
										<input name={"end"} style={{display:"none"}} id="end_date" type="text" defaultValue={end??start} onClick={()=>{
											// setSelectMode("end")
										}}></input>
										<label  htmlFor='end_date'>
											{/* 종료 날짜: {`${end.getFullYear()}-${(end.getMonth()+1)<10?"0"+(end.getMonth()+1):(end.getMonth()+1)}-${end.getDate()<10?"0"+end.getDate():end.getDate()}`} */}
											{console.log(end)}
											종료 날짜: {end??""}
										</label>
									</div>
									<div className='day_pick'>
										<div>
											{
												<Calendar start={new Date(start)} end={new Date(end)} onChange={(date)=>{
													date=date.toLocaleDateString();
													// let t=new Date(start);
													if(ProjectModule.GetDaysBetween(date,start)<0){
														projectData.end=date;
														refresh([]);
														return
													}
													toastRef.SetMessage("시작 날짜의 다음 날짜부터 선택 가능합니다.")
												}}>
													<DayCell></DayCell>
												</Calendar>
											}
										</div>
									</div>
								</>
							)
						}
					</div>
					<div className="title">
						<TextInput name={"title"} placeholder={'제목'} className={"input"} data={"task_input"} value={title} id="input_for_title" onChange={(event)=>{
							// projectData.current.title=event.target.value
						}} style={{color:"black",width:"100%",boxSizing:"border-box",textAlign:"center"}}></TextInput>
					</div>
					<div className="task_inputs">
						<ul style={{padding:0}}>
							{CreateTaskGroup()}
							{
								type==="-"?(<TaskCard name={"lastitems"} tasks={items[0]} groupId={0} title="마지막 날 할 일 그룹"></TaskCard>):""
							}
						</ul>
						<div>
							<input type="button" value="그룹 추가" onClick={()=>{
								taskGroupCount[type]++
								setTaskGroupConut({...taskGroupCount})
							}}></input>
						</div>
					</div>
				</div>
			</form>
			<div className='page_create function_btns'>
				<label>
					<div>뒤로가기</div>
					<input type="button" onClick={()=>{
						navigate(-1)
					}}></input>
				</label>
				<label>
					<div>저장</div>
					<input type="button" onClick={()=>{
						const form = document.querySelector("form.main_platform");
						const formData = new FormData(form);
						const data = Object.fromEntries(formData.entries());

						data.end=end;
						data.start=start;
						console.log("data",data);
						
						let lastItems=document.querySelectorAll('textarea[name=lastitems]');
						data.items=[[]]
						for(let i=0;i<lastItems.length;i++){
							data.items[0].push({
								id:i,
								content:lastItems[i].value,
								check:false
							});
						}

						// data.items=[lastItems??[]];
						let itemGroups=document.querySelectorAll("div.itemGroup");
						console.log("group length ",itemGroups.length);
						for(let i=0;i<itemGroups.length;i++){
							data.items.push([])
							let items=itemGroups[i].querySelectorAll("textarea[name=items]");
							for(let j=0;j<items.length;j++){
								data.items[i+1].push({
									id:j,
									content:items[j].value,
									check:false
								});
							}
						}
						// itemGroups.

						if(data.type==="+"){
							data.end=null;
						}

						// data.items=items;
						// console.log(data.items);
						// if(id!==undefined && id!==null){

						// }
						// data.id=id;
						ProjectModule.CreateProject(data);

						toastRef.SetMessage("프로젝트를 생성했습니다.");
						navigate(-1);
						// console.log(ProjectModule.GetAllProjectData());
						//title 값 가져오기
						//type 값 가져오기
						//start 값 가져오기
						//end 값 가져오기
						//할 일 값 가져오기
						// console.log(projectData.current)
						// let tasks=[]
						// Object.values(projectData.current.getTaskDataRef).map((getData)=>{
						// 	tasks.push(getData())
						// })
						// console.log("tasks",tasks)
						// let msg={
						// 	title:projectData.current.title,
						// 	type,
						// 	start:(start.getTime()/1000),
						// 	end:(end?.getTime()/1000)
						// 	,tasks
						// }

						// console.log("msg",msg)
						// let newProject=new Project({
						// 	name:projectData.current.title,
						// 	type:(type?"-":"+"),
						// 	end:(end?new Date(end):undefined),
						// 	start:(start?new Date(start):undefined),
						// 	nowTaskGroup:0
						// })
						// console.log("newProject",newProject)
						// newProject.tasks=tasks

						// console.log(JSON.stringify(msg))
						// fetch(`${process.env.REACT_APP_API_HOST}/api/create_project`,{
						// 	method:"POST",
						// 	headers:{
						// 		"Content-Type":"application/json"
						// 	},
						// 	body:JSON.stringify(msg),
						// 	credentials:"include"
						// }).then((res)=>{
						// 	if(res.status===200){
						// 		return res.json()
						// 	}
						// 	console.log(res)
						// }).then((data)=>{
						// 	if(data){
						// 		toastRef.SetMessage("프로젝트를 생성했습니다.")
						// 		newProject.id=data.idProject
						// 		share.app.appendProject(newProject)
						// 		share.projectLists.setRe([])
						// 		navigate(-1)
						// 	}
						// })
					}}></input>
				</label>
				
			</div>
		</div>
	)
}
export function Modify(){
	const [param,setParam]=useSearchParams();
	const navigate=useNavigate();
	let ID=param.get("id");
	// today.setHours(0,0,0,0)
	if(ID===undefined || ID===null){
		toastRef.SetMessage("잘못된 접근. id is undefined");
		navigate(-1);
	}
	
	const projectDataRef=useRef(ProjectModule.GetProjectPropsById(ID));
	
	const projectData=projectDataRef.current;
	let {id,title,type,start,end,items,state}=projectData;
	const [taskGroupCount,setTaskGroupConut]=useState(items.length)

	if(type==="todo"){
		title="오늘 할 일";
	}

	const CreateTaskGroup=()=>{
		let cards=[];
		for(let i=1;i<taskGroupCount;i++){
			cards.push(<TaskCard className={"itemGroup"} tasks={items[i]} groupId={i} name={"items"} key={type+(i)} title={`할 일 그룹 ${i}`}></TaskCard>);
		}
		return (cards);
	}

	return(
		<div className="borad">
			<form className='main_platform'>
				<div className='type_pick'>
					<div className="title">
						<TextInput disabled={true} name={"title"} placeholder={'제목'} className={"input"} data={"task_input"} value={title} id="input_for_title" onChange={(event)=>{
							// projectData.current.title=event.target.value
						}} style={{color:"black",width:"100%",boxSizing:"border-box",textAlign:"center"}}></TextInput>
					</div>
					<div className="task_inputs">
						<ul style={{padding:0}}>
							{CreateTaskGroup()}
							{
								type==="-"?(<TaskCard name={"lastitems"} tasks={items[0]} groupId={0} title="마지막 날 할 일 그룹"></TaskCard>):""
							}
						</ul>
						<div>
							<input type="button" value="그룹 추가" onClick={()=>{
								let temp=taskGroupCount+1;
								setTaskGroupConut(temp);
							}}></input>
						</div>
					</div>
				</div>
			</form>
			<div className='page_create function_btns'>
				<label>
					<div>뒤로가기</div>
					<input type="button" onClick={()=>{
						navigate(-1)
					}}></input>
				</label>
				<label>
					<div>저장</div>
					<input type="button" onClick={()=>{
						const form = document.querySelector("form.main_platform");
						const formData = new FormData(form);
						const data = Object.fromEntries(formData.entries());
						
						let lastItems=document.querySelectorAll('textarea[name=lastitems]');
						data.items=[[]]
						for(let i=0;i<lastItems.length;i++){
							data.items[0].push({
								id:i,
								content:lastItems[i].value,
								check:false
							});
						}

						let itemGroups=document.querySelectorAll("div.itemGroup");
						// console.log("group length ",itemGroups.length);
						for(let i=0;i<itemGroups.length;i++){
							data.items.push([])
							let items=itemGroups[i].querySelectorAll("textarea[name=items]");
							for(let j=0;j<items.length;j++){
								data.items[i+1].push({
									id:j,
									content:items[j].value,
									check:false
								});
							}
						}
						data.id=id;
						data.type=type;
						data.start=start;
						data.end=end;

						ProjectModule.CreateProject(data);
						// toastRef.SetMessage("프로젝트를 수정했습니다.");
						navigate(-1);
						// console.log("data",data);

						// id,title,type,start,end,items
						// if(data.type==="+"){
						// 	data.end=null;
						// }

						// data.id=id;
						// ProjectModule.CreateProject(data);

						// if(id===undefined || id===null){
						// 	toastRef.SetMessage("프로젝트를 생성했습니다.");
						// }
						// else{
						// 	toastRef.SetMessage("프로젝트를 수정했습니다.");
						// }
						// navigate(-1);
					}}></input>
				</label>
				
			</div>
		</div>
	)
}

function DayCell({date}){
	return(
		<div style={{aspectRatio: 1,display:"flex",justifyContent:"center",alignItems:"center"}}>
			<div>
				{date}
			</div>
		</div>
	)
}

const Create=CreateV3
export default Create;