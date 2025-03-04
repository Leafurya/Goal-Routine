import React from "react";
import { TextAreaKeyInput } from "../../module/CreateCompModule";

export default ({style,placeholder,className,data,name,value,disabled,id,onChange})=>{
	console.log("value",value);
	return(
		<textarea style={{
			border:"none",
			fontSize:"x-large",
			background:'none',
			color:"white",
			padding:"5px 20px",
			margin:"0",
			...style
		}} onChange={onChange} className={className} placeholder={placeholder} rows="1" onKeyDown={TextAreaKeyInput} wrap="off" data-name={data} name={name} defaultValue={value} disabled={disabled} id={id}></textarea>
	)
}