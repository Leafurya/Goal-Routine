import React, { useEffect, useRef, useState } from "react";
import TextInput from "./TextInput";
import Task from "../../module/data/Task";

function TaskInput({content,onDelete,onChange}){
	return(
		<li>
			<div className={"task"}>
				<span className="check_box"></span>
				<TextInput style={{color:"black",fontSize:"medium"}} value={content} onChange={onChange}></TextInput>
				<label>
					-
					<input type="button" onClick={onDelete}></input>
				</label>
			</div>
			{/* <label className={"base_style"+(tasks[task]?" checked":"")} htmlFor={"task"+index}>&nbsp;{`${task}`}&nbsp;</label> */}
		</li>
	)
}

export default ({title,groupId,tasks,getDataRef})=>{
	const[taskList,setTaskList]=useState(tasks??[])
	
	getDataRef[groupId]=()=>{
		// console.log("taskList"+groupId,taskList)
		return taskList
	}

	useEffect(()=>{
		document.querySelector(`#group_${groupId} ul.task_list`)?.childNodes[taskList.length]?.querySelector("textarea").focus()
		console.log(taskList)
	},[taskList])

	return(
		<div id={"group_"+groupId} style={{backgroundColor:"white",marginTop:"10px"}} className="card">
			<header style={{
				fontSize:"large",
				textAlign:"center",
				padding:"15px 0 0 0"
			}}>{title}</header>
			<ul className="task_list">
				{
					taskList.map((task,index)=>{
						if(task){
							return <TaskInput key={index} content={task.content} onChange={((index,taskList)=>{
								return (event)=>{
									taskList[index].content=event.target.value
								}
							})(index,taskList)} onDelete={((index)=>{
								return ()=>{
									delete taskList[index]
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
								taskList.push(new Task(groupId,taskList.length,""))
								setTaskList([...taskList])
							}
						}></input>
					</label>
				</div>
			</div>
		</div>
	)
}