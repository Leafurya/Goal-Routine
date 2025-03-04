import React, { useState } from "react";
import "../../style/CalendarStyle.css"

/**
 * 
 * @param {Date} date 
 */

export default ({select,fontSize,textAlign,children,onChange,start,end,min})=>{
	let today=new Date()
	today.setHours(0,0,0,0)
	start.setHours(0,0,0,0)
	if(end){
		end.setHours(0,0,0,0)
	}
	const [date,setDate]=useState(new Date(today))
	
	let dayEle=new Array(42)
	date.setDate(1)
	let day=date.getDay()
	let year=date.getFullYear()
	let month=date.getMonth()
	for(let temp=new Date(date);date.getMonth()===temp.getMonth();temp.setDate(temp.getDate()+1)){
		dayEle[day++]=new Date(temp)
	}
	
	let index=0

	let weeks=[]
	for(let weekIndex=0;weekIndex<6;weekIndex++){
		let days=[]
		if(weekIndex===5&&dayEle[index]===undefined){
			break
		}
		for(let dayIndex=0;dayIndex<7;dayIndex++){
			let className="day"
			if(dayIndex===0){
				className+=" sunday"
			}
			else if(dayIndex===6){
				className+=" saturday"
			}
			
			if(dayEle[index]?.getTime()>=start.getTime()&&
			dayEle[index]?.getTime()<=((end?.getTime())??start.getTime())){
				className+=" selected"
			}
			if(dayEle[index]?.getTime()===today.getTime()){
				className+=" today"
			}

			days.push(
				<td key={dayIndex} style={{textAlign:textAlign??"center"}} className={className} onClick={((date)=>{
					return(()=>{
						onChange(date)
					})
				})(dayEle[index])}>
					{React.cloneElement(children,{date:dayEle[index++]?.getDate()})}
				</td>
			)
		}
		
		weeks.push(
			<tr key={weekIndex} className="week">
				{days}
			</tr>
		)
	}

	return(
		<table style={{fontSize:"small"}} id="calendar">
			<thead>
				<tr>
					<td className="month" colSpan={7}>
						<input type="button" value="<" onClick={()=>{
							date.setMonth(date.getMonth()-1)
							setDate(new Date(date))
						}}></input>
						{`${year}년 ${month+1}월`}
						<input type="button" value=">" onClick={()=>{
							date.setMonth(date.getMonth()+1)
							setDate(new Date(date))
						}}></input>
						<input type="button" value={today.getDate()} onClick={()=>{
							setDate(new Date(today))
						}}></input>
					</td>
				</tr>
				<tr>
					<td className="week_cell sunday">일</td>
					<td className="week_cell">월</td>
					<td className="week_cell">화</td>
					<td className="week_cell">수</td>
					<td className="week_cell">목</td>
					<td className="week_cell">금</td>
					<td className="week_cell saturday">토</td>
				</tr>
			</thead>
			<tbody>
				{weeks}
			</tbody>
		</table>
	)
}