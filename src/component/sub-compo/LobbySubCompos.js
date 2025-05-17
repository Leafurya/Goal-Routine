import React,{useState} from "react";
import "../../style/Template.css"
import "../../style/ProjectCardStyle.css"

import { useNavigate } from 'react-router-dom';

import ProjectModule from '../../modules/Project/Interface';

function Task({task,idTree}){
	let {check,content}=task
	return(
		<li>
			<label className={`${check?" checked":""} task`}>
				<input className='when_start' type="checkbox" defaultChecked={check} value={content} onChange={(event)=>{
					ProjectModule.CheckItem(idTree[0],idTree[1]); //group id, item id
					ProjectModule.SavePorjects();
					if(event.target.checked){
						event.target.parentNode.classList.add("checked")
					}
					else{
						event.target.parentNode.classList.remove("checked")
					}
				}}></input>
				<span className='check_box'></span>
				<span style={{width:"90%"}}>&nbsp;{`${content}`}&nbsp;</span>
			</label>
		</li>
	)
}
function ProjectCard({prjID,refresher}){
	let id=prjID;
	let projectData=ProjectModule.GetProjectDataById(id);
	let day=projectData.day;
	let title=projectData.title;
	let tasks=projectData.items;

	const navigate=useNavigate();
	return(
		<li style={{marginTop:"7px",position:"relative"}} className="card " key={id}>
			<input type="button" style={{
				position:"absolute",
				display:(id===0?"none":"inline-block"),
				width:"25px",
				top:0,
				right:0,
				textAlign:"center",
				background:"none",
				border:"none"
			}} value="↑" onClick={()=>{
				ProjectModule.ToFront(id);
				ProjectModule.SavePorjects();
				refresher([]);
			}}></input>
			<header style={{display:"flex",flexDirection:"column"}}>
				<div className="title" style={{display:"flex", flexDirection:"column", justifyContent:"space-between",padding:"15px 15px 5px 15px"}}>
					<input id={`day${id}`} type="button" onClick={
						(event)=>{
							
						}
					}></input>
					<input id={`title${id}`} type="button" onClick={
						(event)=>{
							
						}
					}></input>


					<label className=" title" htmlFor={`title${id}`} style={{display:"flex", justifyContent:"center"}}>
						<h4 style={{textAlign:"center", margin:0}}>
							{title}
						</h4>
					</label>
					<label htmlFor={`day${id}`} style={{}}>
						<span  className=" project_list_day ">{day}</span>
					</label>
				</div>
			</header>
			<div>
				<ul className="task_list">
					{
						tasks?.map((task,index)=>{
							return <Task key={index} task={task} idTree={[id,index]}></Task>
						})
					}
				</ul>
			</div>
			<div className="func_btns" style={{display:"flex",width:"100%",height:"20px"}}>
				<div>
					{
						tasks?(<>
						<input id={`modi${id}`} type="button" value={"수정"} onClick={
							(event)=>{
								navigate(`/Modify?id=${id}`);
							}
						}></input>
						<label htmlFor={`modi${id}`}>
							<span className="base_style project_list_day ">수정</span>
						</label>
						</>):(<>
						<input id={`modi${id}`} type="button" value={"삭제"} onClick={
							(event)=>{
								navigate(`/Delete?id=${id}`);
							}
						}></input>
						<label htmlFor={`modi${id}`}>
							<span className="base_style project_list_day ">삭제</span>
						</label>
						</>)
					}
				</div>
			</div>
		</li>
	)
}

function ProjectLists({prjIDs}){
	const [_,refresh]=useState([]);
	if(prjIDs===undefined){
		return <ul className="project_list_ul">
			loading
		</ul>
	}
	return (
	<ul className="project_list_ul">
		{
			prjIDs.map((id,index)=>{
				return <ProjectCard key={index} prjID={parseInt(id)} refresher={refresh}></ProjectCard>
			})
		}
	</ul>
	);
}
export {ProjectLists};