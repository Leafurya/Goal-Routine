import React from "react"
import "../style/TopNavi.css";

export default ({title,sub})=>{
	return(
		<div className="top_navi">
			<div className={"top_navi_title label_base"} htmlFor={1}>
				<h2 className='base_style'>{title}</h2>
				<div className="task_stat base_style">
					<span>{sub}</span>
				</div>
			</div>
		</div>
	)
}