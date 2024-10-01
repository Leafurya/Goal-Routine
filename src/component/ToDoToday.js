import React, { useState } from 'react'
import TopNavigator from './TopNavigator';
import { TaskLists } from './sub-compo/ProjectSubCompos';
import todoList from '../module/global/ToDo';
import { useNavigate } from 'react-router-dom';
import { GetAttendance } from '../module/AttendanceModule';

export default ({})=>{
	const [refresh,pageUpdate]=useState([]);
	let {stat}=todoList
	const navigate=useNavigate()
	let value=(stat.checkedTaskCount/stat.taskCount)*100
	let _stat=((isNaN(value)?"0.0":(value.toFixed(1)))+"%")

	return(
		<div className="borad">
			<TopNavigator title="오늘 할 일" sub={stat.taskCount?`성공률 ${_stat}`:"오늘 뭐하지?"}></TopNavigator>
			<div className={"main_platform project_board"}>
				<div>
					<div>
						<h1 className="project_day base_style" style={{fontSize:"2em"}}>꾸준함의 힘</h1>
						<h4 className="project_content base_style">{`연속 출석 ${GetAttendance()}일째`}</h4>
					</div>
				</div>
				{/* <div><h4 className="project_content base_style"></h4></div> */}
				<ul>
					<TaskLists project={todoList} pageUpdate={pageUpdate}></TaskLists>
				</ul>
			</div>
			<div className="function_btns">
				<input className='function_btn' type="button" value="뒤로" onClick={()=>{
					window.history.back()
				}}></input>
				<input className="when_ready function_btn" type="button" value="수정" onClick={()=>{
					navigate(`/ToDoModify`)
				}}></input>
			</div>
		</div>
	)
}