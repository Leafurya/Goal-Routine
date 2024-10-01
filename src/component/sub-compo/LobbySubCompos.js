import { useNavigate } from 'react-router-dom';
import { StyledLink } from '../../module/GlobalModule';
import projectBundle from '../../module/global/DataBundle';
import StateConst from '../../module/global/StateConst';
import todoList from '../../module/global/ToDo';

import "../../style/Template.css"
import "../../style/ProjectCardStyle.css"
import ProgressBar from '../ProgressBar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toastRef } from '../Notices';
import { share } from '../../module/global/ShareMethod';
import { ProjectBundle } from '../../module/data/DataBundle';
import { GetDateDiff } from '../../module/TimeModule';

// const prjDoneStamp=<span className="project_done"></span>;
// const taskDoneStamp=<span className="done_stamp"></span>;

function Progress({stat}){
	return(
		<div style={
			{
				position:"absolute",
				backgroundColor:"rgba(200,200,200,.5)",
				width:`${stat}%`,
				height:"100%",
				left:0
			}
		}></div>
	)
}
function GetProgressGraph(stat){
	if(stat===0){
		return{
			backgroundColor:"rgba(0,0,0,0)",
		}
	}
	return{
		background: `linear-gradient(to right,rgba(50,10,255,.3) ${stat}%,rgba(1,1,1,0) ${100-stat}%)`,
		// backgroundSize:`${stat}% 100%`,
		// backgroundRepeat:"no-repeat",
		// backgroundColor:"rgba(200,200,200,.5)",
	}
}
// function ProjectCard({project}){
// 	let {day,name,taskDone,D,state}=project
// 	let id=Date.now()+Math.random()
// 	let value=(project.stat.checkedTaskCount/project.stat.taskCount)*100
// 	let stat=(state===StateConst.ProjectStart?((value).toFixed(1)+"%"):"-%")
// 	let tasks=project.GetNowTasks()
// 	const navigate=useNavigate()
	
// 	return(
// 		<li className="project_list_li" key={id}>
// 			{/* <StyledLink to={`/Project?name=${name}`}> */}
// 				<input id={id} type="button" value={name} onClick={
// 					(event)=>{
// 						navigate(`/Project?name=${name}`)
// 					}
// 				}></input>
// 				{/* style={GetProgressGraph((tasks.CountChecked()/tasks.GetTaskCount())*100)}(taskDone?" task_done":"") */}

// 				<label className={"base_style project_list_label label_base "} htmlFor={id}>
// 					{/* <Progress stat={(tasks.CountChecked()/tasks.GetTaskCount())*100}></Progress> */}
// 					<div className='project_list_content'>
// 						<div style={{display:"flex",flexDirection:"column"}}>
// 							<div className="project_list_day ">{project.GetDay()}</div>
// 							{/* <div className="project_list_day ">{"D"+D+project.GetDay()}</div> */}
// 							<div className="task_stat ">
// 								<span>{["프로젝트 끝","수정 대기중...","시작 대기중...",`성공률 ${stat}`][state]}</span>
// 							</div>
// 						</div>
// 						<div className="project_list_name">
// 							<span>{name}</span>
// 						</div>
// 					</div>
// 					<ProgressBar state={state} progress={(tasks.CountChecked()/tasks.GetTaskCount())*100}></ProgressBar>
// 					{/* {taskDone?taskDoneStamp:""} */}
// 				</label>
// 			{/* </StyledLink> */}
// 		</li>
// 	)
// }
function Task({task,idTree}){
	// let task=project.GetNowTasks()
	let {checked,content}=task
	return(
		<li>
			<label className={`${checked?" checked":""} task`}>
				<input className='when_start' type="checkbox" defaultChecked={checked} value={content} onChange={(event)=>{
					task.checked=(event.target.checked?1:0)
					if(event.target.checked){
						event.target.parentNode.classList.add("checked")
					}
					else{
						event.target.parentNode.classList.remove("checked")
					}
					console.log(share.app.getProjectBundle())
					console.log("idTree",idTree)
					//서버로 로그 전송
					fetch(`${process.env.REACT_APP_API_HOST}/api/check`,{
						credentials:"include",
						method:"POST",
						headers:{
							"Content-Type":"application/json"
						},
						body:JSON.stringify(["CHECK_TASK",idTree,task.checked])
					}).then((res)=>{
						if(res.status===200){
							console.log("updated")
						}
						else{
							console.log("update failed")
						}
					})
				}}></input>
				<span className='check_box'></span>
				<span>&nbsp;{`${content}`}&nbsp;</span>
			</label>
		</li>
	)
}
function ProjectCard({project,day,title,tasks}){
	// let {day,name,taskDone,D,state}=project
	let id=project.id
	// let stat=(state===StateConst.ProjectStart?((value).toFixed(1)+"%"):"-%")
	// let tasks=project.GetNowTasks()
	const navigate=useNavigate()

	const [refresh,pageUpdate]=useState([]);
	// console.log(tasks)

	return(
		<li style={{marginTop:"7px"}} className="card " key={id}>
			<header style={{display:"flex",flexDirection:"column"}}>
				<div className="title" style={{display:"flex", justifyContent:"space-between",padding:"15px 15px 5px 15px"}}>
					<input id={`day${id}`} type="button" onClick={
						(event)=>{
							
						}
					}></input>
					<input id={`title${id}`} type="button" onClick={
						(event)=>{
							
						}
					}></input>


					<label htmlFor={`day${id}`}>
						<span className=" project_list_day ">{day}</span>
					</label>
					<label className=" title" htmlFor={`title${id}`}>
						{title}
					</label>
				</div>
			</header>
			<div>
				<ul className="task_list">
					{
						tasks?.map((task,index)=>{
							return <Task key={index} task={task} idTree={[id,project.nowTaskGroup,index]}></Task>
						})
					}
				</ul>
			</div>
			<div className="func_btns" style={{display:"flex",width:"100%",height:"20px"}}>
				<div>
					<input id={`modi${id}`} type="button" value={"수정"} onClick={
						(event)=>{
							/**
							 * 프로젝트 데이터 요청?
							 */
						}
					}></input>
					<label htmlFor={`modi${id}`}>
						<span className="base_style project_list_day ">수정</span>
					</label>
				</div>
			</div>
		</li>
	)
}
// function ToDoCard({}){
// 	let {done,stat,data,state}=todoList
// 	let id=Date.now()+Math.random()
// 	let progress=(data.CountChecked()/data.GetTaskCount())*100
// 	const navigate=useNavigate()

// 	console.log(todoList)

// 	return(
// 		<li className="project_list_li" key={id}>
// 			<div>
// 				<header style={{display:"flex",flexDirection:"column"}}>
// 					<div className='project_list_content title'>
// 						<div style={{display:"flex",flexDirection:"column"}}>
// 							<div style={{marginBottom:"5px"}} className=''>오늘 할 일</div>
// 						</div>
// 					</div>
					
// 				</header>
// 				<div>

// 				</div>
// 				<div className="func_btns" style={{display:"flex",width:"100%",height:"20px"}}>
// 					<div>
// 						<input id={`modi${id}`} type="button" value={"수정"} onClick={
// 							(event)=>{
// 								navigate(`/ToDoModify`)
// 							}
// 						}></input>
// 						<label htmlFor={`modi${id}`}>
// 							<span className="base_style project_list_day ">오늘 뭐하지?</span>
// 						</label>
// 					</div>
// 				</div>
// 			</div>
// 		</li>
// 	)
// }

function ProjectLists(){
	/**
	 * 투두리스트를 어떻게 저장할까?
	 * 1. 일반 프로젝트처럼 저장한다.
	 * 몇 가지 속성을 없는 값으로 취급해서 표현할 수 있다.
	 * db 검색이 상대적으로 쉽다.
	 * 다른 날짜의 투두 리스트를 어떻게 가져올 것인가?
	 * *서버의 역할: 데이터 동기화, 알림기능 지원
	 * 사용자는 로그인을 통해 데이터를 동기화 한다.
	 * 하나의 기기에서 데이터가 바뀌면 다른 기기에 이를 반영한다. firebase로 될까?
	 * 데이터 저장 없이 단순한 동기화 기능만 지원한다면 전체 데이터를 저장할 필요가 없기 때문에 알림기능의 지원이 힘들어진다?
	 * 전체 데이터 저장은 신규 기기의 연결이 있을 수 있고 클라이언트의 데이터가 지워지는 상황도 발생할 수 있기 때문에 필요하다.
	 * 로그를 남기는 방향으로 동기화한다.
	 */
	const [re,setRe]=useState([])
	share.projectLists={
		setRe
	}
	const projectBundle=share.app.getProjectBundle()
	useEffect(()=>{
		console.log("project list useeffect",projectBundle)
	},[re])
	// let lists=[<ToDoCard key={Date.now()}></ToDoCard>]

	// Object.values(projectBundle.data).map((project)=>{
	// 	lists.push(<ProjectCard key={project.name} project={project}></ProjectCard>)
	// })
	if(projectBundle===undefined){
		return <ul className="project_list_ul">
			loading
		</ul>
	}
	return (
	<ul className="project_list_ul">
		{/* <ProjectCard project={projectBundle.data[0]} tasks={projectBundle.data[0].GetNowTasks()} day={"오늘 할 일"} title=""></ProjectCard> */}
		{
			// projectBundle.data.map((project)=>{
			// 	return <ProjectCard key={project.name} project={project} tasks={project.GetNowTasks()} day={project.GetDay()} title={project.name}></ProjectCard>
			// })
			// Object.values(projectBundle.data).map((project)=>{
			// 	return <ProjectCard key={project.name} project={project} tasks={project.GetNowTasks()} day={project.GetDay()} title={project.name}></ProjectCard>
			// })
			projectBundle.data.map((project,index)=>{
				if(index>0){
					return <ProjectCard key={index} project={project} tasks={project.GetNowTasks()} day={project.GetDay()} title={project.name}></ProjectCard>
				}
				else{
					return <ProjectCard key={index} project={project} tasks={project.GetNowTasks()} day={"오늘 할 일"} title=""></ProjectCard>
				}
			})
		}
	</ul>
	);
}
export {ProjectLists};