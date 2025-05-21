import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { FaTrash } from 'react-icons/fa';

function TaskInput({id,content,onDelete,onChange,name}){
	
	return(
		<li>
			<div className={"task"}>
				<span className="check_box"></span>
				<TextInput id={id} style={{color:"black",fontSize:"medium"}} name={name} value={content} onChange={onChange}></TextInput>
				<label>
					-
					<input type="button" onClick={onDelete}></input>
				</label>
			</div>
		</li>
	)
}

export default ({title,groupId,tasks,name,className,deleteHandler})=>{
	const[taskList,setTaskList]=useState(tasks[groupId]??[])
	
	console.log("groupid",groupId,"taskList",taskList,"tasks[groupId]",tasks[groupId])


	useEffect(()=>{
		console.log("taskList.length",taskList.length)
		// document.querySelector(`#group_${groupId} ul.task_list`)?.childNodes[taskList.length-1]?.querySelector("textarea").focus()
		tasks[groupId]=taskList;
	},[taskList])

	return(
		<div id={"group_"+groupId} style={{backgroundColor:"white",marginTop:"10px",position:"relative"}} className={"card "+className}>
			<header style={{
				fontSize:"large",
				textAlign:"center",
				padding:"15px 0 0 0"
			}}>{title}</header>
			<ul className="task_list">
				{
					taskList.map((task,index)=>{
						if(task){
							return <TaskInput id={index} name={name} key={index} content={task.content} onChange={((index,taskList)=>{
								return (event)=>{
									taskList[index].content=event.target.value
								}
								})(index,taskList)} onDelete={((index)=>{
									return ()=>{
										delete taskList[index];
										taskList.splice(index,1);
										console.log(taskList)
										setTaskList([...taskList])
									}
								})(index)}></TaskInput>
						}
					})
				}
				
			</ul>
			<div className="func_btns" style={{display:"flex",width:"100%",height:"20px"}}>
				<div>
					<label>
						<span className="base_style project_list_day">+</span>
						<input type="button" value={"+"} onClick={
							(event)=>{
								// taskList.push({check:false,content:"",id:taskList.length});
								// setTaskList([...taskList])
								setTaskList(prev=>{
									return [...prev,{check:false,content:"",id:taskList.length}]
								})
							}
						}></input>
					</label>
				</div>
			</div>
			{
				groupId>1?(
				<label style={{
					position:"absolute",
					display:("inline-block"),
					width:"25px",
					top:0,
					right:0,
					textAlign:"center",
					background:"none",
					border:"none",
				}}>
				<FaTrash style={{ color: '#9446C4', fontSize: '18px' }} />
				<input type="button" style={{
					display:"none"
				}} onClick={()=>{
					deleteHandler(groupId)
					console.log("groupId",tasks[groupId])
					if(tasks[groupId]!==undefined){
						setTaskList([...tasks[groupId]])
					}
					// console.log("tasks[groupId]",tasks[groupId])
					// ProjectModule.ToFront(id);
					// ProjectModule.SavePorjects();
					// refresher([]);
				}}></input>
			</label>):""
			}
			
			{/* {
				groupId!==1?(
				<button onClick={()=>{
					console.log("hellor")
				}} style={{
				position:"absolute",
				display:("inline-block"),
				width:"25px",
				top:4,
				right:4,
				textAlign:"center",
				background:"none",
				border:"none"
			}}>
				<FaTrash style={{ color: '#9446C4', fontSize: '18px' }} />
			</button>):""
			} */}
			
		</div>
	)
}