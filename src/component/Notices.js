import React, { useEffect, useRef, useState } from "react";

function NotiBase({children,btns}){
	return(
		<div className="notice_background">
			<div className="platform_base">
				<div style={{padding:"15px 10px 5px 10px",fontSize:"large",color:"white",textAlign:"center"}}>
					{children}
				</div>
				{/* <div  style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
				</div> */}
				<div style={{display:"flex",bottom:0,margin:0,height:"35px"}}>
					{
						btns.map((btn,index)=>{
							return(
								<input type="button" style={{flex:1,backgroundColor:"#7965bd",color:"white",border:"none",margin:2}} value={btn.title} key={index} onClick={btn.onClick}></input>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

function Alert({children}){
	return(
		<NotiBase btns={[{
			title:"확인",
			onClick:(e)=>{window.history.back()}
		}]}>
			<div>
				{children}
			</div>
		</NotiBase>
	)
}
function Confrim({children,ResultCallback}){
	return(
		<NotiBase btns={[{
			title:"확인",
			onClick:(e)=>{ResultCallback(true,e)}
		},{
			title:"취소",
			onClick:(e)=>{ResultCallback(false,e)}
		}]}>
			<div>
				{children}
			</div>
		</NotiBase>
	)
}
function TextAreaKeyInput(e){
	console.log(e)
	if(e.keyCode===13){
		e.preventDefault()

	}
}
function Prompt({children,ResultCallback}){
	return(
		<NotiBase btns={[{
			title:"확인",
			onClick:(e)=>{
				ResultCallback(true,e)
			}
		},{
			title:"취소",
			onClick:(e)=>{
				ResultCallback(false,e)
			}
		}]}>
			<div>
				{children}
			</div>
			<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
				<textarea rows={1} style={{margin:0,width:"100%",background:"none",marginTop:6,borderBottom:"1px solid white"}} type="text" id="prompt_text_input" placeholder="포기하겠습니다" onKeyDown={(e)=>{
					if(e.key==="Enter"){
						ResultCallback(true,e)
						e.preventDefault()
					}
				}}></textarea>
			</div>
		</NotiBase>
	)
}

const toastRef={}
function Toast({}){
	const [message,setMessage]=useState(null)
	const ref=useRef({
		timeout:null,
		msg:[]
	})
	// console.group("toast")
	toastRef.SetMessage=(msg)=>{

		if(ref.current.timeout!==null){
			clearTimeout(ref.current.timeout)
			ref.current.timeout=null
		}
		ref.current.timeout=setTimeout(() => {
			// ref.current.msg.shift()
			ref.current.msg=[]
			setMessage([])
			// console.log("timeout end")
		}, 2500);
		ref.current.msg.push(<div key={ref.current.msg.length} className="uniqe_toast">{msg}</div>)
		setMessage([])
	}
	// console.groupEnd("toast")
	return(
		<div style={{bottom:150,position:"absolute",left:0,width:"100%"}}>
			{ref.current.msg}
		</div>
	)
}
export{Alert,Confrim,Prompt,Toast,toastRef}