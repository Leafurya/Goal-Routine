import React, { useEffect, useRef, useState } from "react";
import TextInput from "./TextInput";
import Task from "../../module/data/Task";

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
			{/* <label className={"base_style"+(tasks[task]?" checked":"")} htmlFor={"task"+index}>&nbsp;{`${task}`}&nbsp;</label> */}
		</li>
	)
}

export default ({title,groupId,tasks,name,className})=>{
	const[taskList,setTaskList]=useState(tasks??[])
	

	useEffect(()=>{
		document.querySelector(`#group_${groupId} ul.task_list`)?.childNodes[taskList.length]?.querySelector("textarea").focus()
		console.log(taskList)
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
							console.log("map",task.content);
							return <TaskInput name={name} key={index} content={task.content} onChange={((index,taskList)=>{
								return (event)=>{
									// console.log("onchange",event.target.value);
									taskList[index].content=event.target.value
								}
							})(index,taskList)} onDelete={((index)=>{
								return ()=>{
									// console.log("delete",index);
									// for(var i=index;i<taskList.length-1;i++){
									// 	taskList[i]=taskList[i+1];
									// 	taskList[i].id=i;
									// }
									// taskList[taskList.length-1]=null;
									// taskList.splice(taskList.length-1,1);
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
								// taskList.push(new Task(groupId,taskList.length,""))
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