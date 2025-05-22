import "../style/BaseStyle.css";
import "../style/CreateStyle.css";
import "../style/Align.css";

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { toastRef } from './Notices.js';
import TextInput from './global/TextInput.js';
import Calendar from './global/Calendar.js';
import TaskCard from './global/TaskCard.js';

import ProjectModule from '../modules/Project/Interface.js';
import { FaArrowRight } from "react-icons/fa";

function CreateV3({}){
	//프로젝트 생성 컴포넌트
	const today=new Date()

	const projectDataRef=useRef({
		title:null,
		type:"+",
		start:today.toLocaleDateString(),
		end:null,
		items:[]
	}); //프로젝트 속성 값 초기화. 프로젝트 생성이기 때문에 id를 지정할 필요 없음음
	const projectData=projectDataRef.current;
	let {title,type,start,end,items}=projectData;

	if(!end){
		//end에 값 추가
		let t=new Date();
		t.setDate(today.getDate()+1);
		end=t.toLocaleDateString();
	}

	const [taskGroupCount,setTaskGroupConut]=useState({"+":1,"-":1}); //할 일 그룹이 몇 개씩 있는지 저장
	const [re,refresh]=useState([]);
	const navigate=useNavigate();

	useEffect(()=>{
	},[])

	const DeleteItemGroup=(groupId)=>{
		// ProjectModule.DeleteItemGroup(id,groupId);
		delete items[groupId];
		items.splice(groupId,1);
		taskGroupCount[type]--
		setTaskGroupConut({...taskGroupCount})
	}
	const ToFront=(groupId)=>{
		let target=items[groupId];

		for(;groupId>1;groupId--){
			items[groupId]=items[groupId-1]
		}
		items[1]=target;

		// setTaskGroupConut({...taskGroupCount})
		refresh([])
	}

	const CreateTaskGroup=()=>{
		//할 일 그룹들 생성성
		let cards=[]
		for(let i=0;i<taskGroupCount[type];i++){
			cards.push(<TaskCard className={"itemGroup"}
				tasks={items} 
				groupId={i+1} 
				name={"items"} 
				key={type+(i+1)} 
				title={`할 일 그룹 ${i+1}`} 
				deleteHandler={DeleteItemGroup}
				toFrontHandler={ToFront}
				refreshed={re}></TaskCard>)
		}
		return (cards)
	}
	let isDev=process.env.NODE_ENV==="development";

	return(
		<div className="borad">
			<form className='main_platform'>
				<div className='type_pick'>
					<input style={{display:"none"}} id='type_plus' type='radio' name="type" value="+" defaultChecked={type==="+"} onClick={(event)=>{
						if(ProjectModule.GetDaysBetween(start,today)<0){
							//시작 날짜가 오늘보다 이후라면. D+ 프로젝트는 오늘보다 이후의 날짜를 프로젝트 시작 날짜로 지정할 수 없기 때문
							projectData.start=today.toLocaleDateString(); //시작 날짜를 오늘로 지정
						}
						//프로젝트 타입을 D+로 지정하고 새로고침
						projectData.type="+";
						refresh([]);
					}}></input>
					<input style={{display:"none"}} id='type_min' type='radio' name="type" value="-" defaultChecked={type==="-"} onClick={()=>{
						if(ProjectModule.GetDaysBetween(today,start)<0){
							//시작 날짜가 오늘보다 이전이라면. D- 프로젝트는 오늘보다 이전의 날짜를 프로젝트 시작 날짜로 지정할 수 없기 때문
							projectData.start=today.toLocaleDateString(); //시작 날짜를 오늘로 지정
						}
						//프로젝트 타입을 D-로 지정하고 새로고침
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
					<div>
						{
							type==="+"?(
								<>
									<div className="create_d_type">
										<label>
											D+{ProjectModule.GetDaysBetween(start,today)+1}
										</label>
									</div>
									<div className="create_date">
										<div>
											<input name={"start"} style={{display:"none"}} id="start_date" type="text" defaultValue={start} onClick={()=>{
											}}></input>
											<label htmlFor='start_date'>
													{start.split(".")[0]}년 {start.split(".")[1]}월 {start.split(".")[2]}일 시작
											</label>
										</div>
									</div>
									
									<div className='day_pick'>
										<div>
											<Calendar start={new Date(start)} onChange={(date)=>{
												if(date>today){
													//선택한 날짜가 오늘보다 이후라면
													toastRef.SetMessage("오늘보다 이후의 날짜는 선택할 수 없습니다.")
													return
												}
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
									<div className="create_d_type">
										<label htmlFor='prj_day'>
											D-<span >{ProjectModule.GetDaysBetween(start,end??start)}</span>
										</label>
										<input onFocus={(event)=>{
											event.target.select()
											document.querySelector("label[for=prj_day] span").classList="text_selected"
										}} onBlur={()=>{
											document.querySelector("label[for=prj_day] span").classList.remove("text_selected")
										}} className='base_style' type="number" id="prj_day" defaultValue={ProjectModule.GetDaysBetween(start,end??start)} onChange={(event)=>{
											//D- 숫자 직접 수정
											let diff=Number(event.target.value)
											if(diff===0){
												//0 입력 시 1로 변경하여 표시
												diff=1
												event.target.select()
												document.querySelector("label[for=prj_day] span").classList.add("text_selected")
											}
											else{
												document.querySelector("label[for=prj_day] span").classList.remove("text_selected")
											}
											
											//시작 날짜로부터 입력한 일 수가 지난 날짜를 프로젝트 종료 일로 지정
											let temp=new Date(start)
											temp.setDate(temp.getDate()+diff)
											projectData.end=temp.toLocaleDateString();
											refresh([]);
										}}></input>
									</div>
									<div className="create_date">
										<div>
											<input name={"start"} style={{display:"none"}} id="start_date" type="text" defaultValue={start} onClick={()=>{
											}}></input>
											<label htmlFor='start_date'>
												<div>
													{start.split(".")[0]}년
												</div>
												<div>
													{start.split(".")[1]}월 {start.split(".")[2]}일
												</div>
											</label>
										</div>
										<FaArrowRight></FaArrowRight>
										<div>
											<input name={"end"} style={{display:"none"}} id="end_date" type="text" defaultValue={end??start} onClick={()=>{
											}}></input>
											<label htmlFor='end_date'>
												{end?(
												<>
													<div>
														{end.split(".")[0]}년
													</div>
													<div>
														{end.split(".")[1]}월 {end.split(".")[2]}일
													</div>
												</>
												):""}
											</label>
										</div>
									</div>
									<div className='day_pick'>
										<div>
											{
												<Calendar start={new Date(start)} end={new Date(end)} onChange={(date)=>{
													date=date.toLocaleDateString();
													if(ProjectModule.GetDaysBetween(date,start)<0){
														//선택한 날짜가 시작 날짜보다 이후라면
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
							projectDataRef.current.title=event.target.value
						}} style={{color:"black",width:"100%",boxSizing:"border-box",textAlign:"center"}}></TextInput>
					</div>
					<div className="task_inputs">
						<ul style={{padding:0}}>
							{CreateTaskGroup()}
							{
								type==="todo"?(""):(
								<>
								<label className="add_group card">
									<header>+</header>
									<input style={{display:"none"}} type="button" value="그룹 추가" onClick={()=>{
										taskGroupCount[type]++
										setTaskGroupConut({...taskGroupCount})
									}}></input>
								</label>
								</>)
							}
							{
								type==="-"?(<TaskCard name={"lastitems"} tasks={items} groupId={0} title="마지막 날 할 일 그룹"></TaskCard>):""
							}
						</ul>
						{/* <div>
							<input type="button" value="그룹 추가" onClick={()=>{
								taskGroupCount[type]++
								setTaskGroupConut({...taskGroupCount})
							}}></input>
						</div> */}
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
						//프로젝트 데이터 저장 작업 진행
						const form = document.querySelector("form.main_platform");
						const formData = new FormData(form);
						const data = Object.fromEntries(formData.entries());

						if(isDev){
							if(data.title.length===0){
								toastRef.SetMessage("제목을 지정해 주세요.");
								return;
							}
						}

						data.end=end;
						data.start=start;

						
						//마지막 할 일 그룹 데이터 저장
						let lastItems=document.querySelectorAll('textarea[name=lastitems]');
						data.items=[[]]
						for(let i=0;i<lastItems.length;i++){
							data.items[0].push({
								content:lastItems[i].value,
								check:false
							});
						}

						//할 일 그룹 데이터 저장
						let itemGroups=document.querySelectorAll("div.itemGroup");

						for(let i=0;i<itemGroups.length;i++){
							data.items.push([])
							let items=itemGroups[i].querySelectorAll("textarea[name=items]");
							if(isDev){
								if(items.length===0){
									toastRef.SetMessage("할 일을 입력해 주세요.");
									return;
								}
							}
							for(let j=0;j<items.length;j++){
								if(isDev){
									if(items[j].value.length===0){
										toastRef.SetMessage("할 일을 입력해 주세요.");
										return;
									}
								}
								data.items[i+1].push({
									content:items[j].value,
									check:false
								});
							}
						}

						if(data.type==="+"){
							//프로젝트 타입이 D+면 종료 날짜 삭제
							data.end=null;
						}

						ProjectModule.CreateProject(data);

						toastRef.SetMessage("프로젝트를 생성했습니다.");
						navigate(-1);

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
	
	
	
	const projectDataRef=useRef(ProjectModule.GetProjectPropsById(ID));
	
	const projectData=projectDataRef.current;
	let {id,title,type,start,end,items,state}=projectData;
	const [taskGroupCount,setTaskGroupConut]=useState(items.length);
	const [_,refresh]=useState([]);
	let disabled=false;

	if(ID===undefined || ID===null){
		//id없이 컴포넌트를 열면
		toastRef.SetMessage("잘못된 접근. id is undefined");
		navigate(-1);
		return "";
	}

	if(type==="todo"){
		title="오늘 할 일";
		disabled=true;
	}
	let isDev=process.env.NODE_ENV==="development";

	const DeleteItemGroup=(groupId)=>{
		// ProjectModule.DeleteItemGroup(id,groupId);
		delete items[groupId];
		items.splice(groupId,1);
		setTaskGroupConut(taskGroupCount-1);
	}
	const ToFront=(groupId)=>{
		let target=items[groupId];

		for(;groupId>1;groupId--){
			items[groupId]=items[groupId-1]
		}
		items[1]=target;
		console.log("items ToFront",groupId,items)

		refresh([]);
	}

	const CreateTaskGroup=()=>{
		let cards=[];
		for(let i=1;i<taskGroupCount;i++){
			cards.push(<TaskCard className={"itemGroup"} tasks={items} groupId={i} name={"items"} key={type+(i)} title={`할 일 그룹 ${i}`} 
			deleteHandler={DeleteItemGroup} toFrontHandler={ToFront} refreshed={_}></TaskCard>);
		}
		return (cards);
	}
	

	return(
		<div className="borad">
			<form className='main_platform'>
				<div className='type_pick'>
					{
						type==="todo"?(""):(
						<>
							{/* <input type="button" value="그룹 추가" onClick={()=>{
								let temp=taskGroupCount+1;
								setTaskGroupConut(temp);
							}}></input> */}
							<label className="delete_project">
								<input style={{display:"none"}} type="button" value="삭제" onClick={()=>{
									ProjectModule.RemoveProject(id);
									navigate(-1);
								}}></input>
								<span>프로젝트 삭제</span>
							</label>
						</>)
					}
					<div className="title">
						<TextInput disabled={disabled} name={"title"} placeholder={'제목'} className={"input"} data={"task_input"} value={title} id="input_for_title" onChange={(event)=>{
							title=event.target.value
						}} style={{color:"black",width:"100%",boxSizing:"border-box",textAlign:"center"}}></TextInput>
					</div>
					<div className="task_inputs">
						<ul style={{padding:0}}>
							{CreateTaskGroup()}
							{
								type==="todo"?(""):(
								<>
								<label className="add_group card">
									<header>+</header>
									<input style={{display:"none"}} type="button" value="그룹 추가" onClick={()=>{
										let temp=taskGroupCount+1;
										setTaskGroupConut(temp);
									}}></input>
								</label>
								</>)
							}
							{
								type==="-"?(<TaskCard name={"lastitems"} tasks={items} groupId={0} title="마지막 날 할 일 그룹"></TaskCard>):""
							}
						</ul>
						<div>
							
							
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

						if(isDev){
							if(data.title.length===0){
								toastRef.SetMessage("제목을 지정해 주세요.");
								return;
							}
						}

						let nowItemGroup=items[0];
						nowItemGroup=nowItemGroup.filter(Boolean); //undefined 등 비정상 값을 필터링 
						nowItemGroup.map((item,idx)=>{
							if(lastItems[idx].value!==""){
								let check;
								try{
									check=item?.check??false;
								}catch(e){
									check=false;
								}
								data.items[0].push({
									content:lastItems[idx].value,
									check:check
								});
							}
						});

						let itemGroups=document.querySelectorAll("div.itemGroup");
						for(let i=0;i<itemGroups.length;i++){
							data.items.push([])
							let _items=itemGroups[i].querySelectorAll("textarea[name=items]");
							if(isDev){
								if(_items.length===0){
									toastRef.SetMessage("할 일을 입력해 주세요.");
									return;
								}
							}
							nowItemGroup=items[i+1];
							nowItemGroup=nowItemGroup.filter(Boolean);
							console.log("nowItemGroup",nowItemGroup)
							
							nowItemGroup.map((item,idx)=>{
								console.log("_items[idx].value.length",idx,_items[idx].value.length!==0);
								if(_items[idx].value.length!==0){
									let check;
									try{
										check=item?.check??false;
									}catch(e){
										check=false;
									}
									data.items[i+1].push({
										content:_items[idx].value,
										check:check
									});
								}
							});
							if(isDev){
								if(data.items[i+1].length===0){
									toastRef.SetMessage("할 일을 입력해 주세요.");
									return;
								}
							}
						}
						data.id=id;
						data.type=type;
						data.start=start;
						data.end=end;
						if(type==="todo"){
							data.title=null;
						}
						else{
							data.title=title;
						}

						ProjectModule.CreateProject(data);
						navigate(-1);
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