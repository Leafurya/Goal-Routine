import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";

function TaskInput({content,onDelete,onChange,name}){
	
	return(
		<li>
			<div className={"task"}>
				<span className="check_box"></span>
				<TextInput style={{color:"black",fontSize:"medium"}} name={name} value={content} onChange={onChange}></TextInput>
				<label>
					-
					<input type="button" onClick={onDelete}></input>
				</label>
			</div>
		</li>
	)
}

export default ({title,groupId,tasks,name,className})=>{
	const[taskList,setTaskList]=useState(tasks[groupId]??[])
	
	useEffect(()=>{
		document.querySelector(`#group_${groupId} ul.task_list`)?.childNodes[taskList.length]?.querySelector("textarea").focus()
		tasks[groupId]=taskList;
	},[taskList])

	return(
		<div id={"group_"+groupId} style={{backgroundColor:"white",marginTop:"10px"}} className={"card "+className}>
			<header style={{
				fontSize:"large",
				textAlign:"center",
				padding:"15px 0 0 0"
			}}>{title}</header>
			<ul className="task_list">
				{
					taskList.map((task,index)=>{
						if(task){
							return <TaskInput name={name} key={index} content={task.content} onChange={((index,taskList)=>{
								return (event)=>{
									taskList[index].content=event.target.value
								}
							})(index,taskList)} onDelete={((index)=>{
								return ()=>{
									delete taskList[index];
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
								taskList.push({check:false,content:"",id:taskList.length});
								setTaskList([...taskList])
							}
						}></input>
					</label>
				</div>
			</div>
		</div>
	)
}