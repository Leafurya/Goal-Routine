import React from "react";

function TextAreaKeyInput(e){
	if(e.keyCode===13){
		// let textInput=e.target
		// let name=e.target.dataset.name
		// GetElement(`${name}s`).appendChild(CreateTaskInputCell(name,textInput.value).div);
		// // GetElement(`${name}s`).appendChild(<TaskInputCell name={name} cntnt={textInput.value} disabled={false}></TaskInputCell>);
		// textInput.value=""
		// textInput.focus()
		e.preventDefault()
	}
}

export default ({style,placeholder,className,data,name,value,disabled,id,onChange})=>{
	return(
		<textarea key={Date.now()} style={{
			border:"none",
			fontSize:"x-large",
			background:'none',
			color:"white",
			padding:"5px 20px",
			margin:"0",
			resize: "none",
			...style
		}} onChange={onChange} className={className} placeholder={placeholder} rows="1" onKeyDown={TextAreaKeyInput} wrap="off" data-name={data} name={name} defaultValue={value} disabled={disabled} id={id} onFocus={(e)=>{
			console.log(e.target.id)
			e.target.focus()
		}}></textarea>
	)
}