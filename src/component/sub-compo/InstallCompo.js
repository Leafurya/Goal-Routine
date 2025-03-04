import React, { useCallback, useRef } from "react";

function Title(){
	return(
		<div style={{display:"flex",width:"100%",height:70}}>
			<div style={{backgroundImage:"url(./applogo192prev.png)",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat", flex:1}}></div>
			<div style={{flex:3}}>
				<h1 style={{margin:0,color:"white",fontSize:"x-large",transform:"translateY(-50%)",top:"50%",position:"relative"}}>목표와 반복</h1>
			</div>
		</div>
	)
}
function SimpleDescription(){
	const installEvent=useRef()
	window.addEventListener('beforeinstallprompt',(e)=>{
		e.preventDefault()
		installEvent.current=e
		console.log(installEvent.current)
		return false
	})
	const installBtnCallback=useCallback(()=>{
		let event=installEvent.current
		if(event===undefined){
			return
		}
		event.prompt()
		event.userChoice.then((result)=>{
			if(result.outcome==="dismissed"){
				console.log("install canceled")
			}
			else{
				console.log("install success")
			}
			event=null
		})
	})
	return(
		<div style={{color:"white"}}>
			<h2 style={{textAlign:"center",fontWeight:"bold"}}>
				행동을 반복하면<br/>목표를 이룰겁니다
			</h2>
			<div>
				
			</div>
			<div style={{display:"flex",}}>
				<InstallButton value="플레이스토어" onClick={()=>{
					alert("플레이스토어 바로가기")
				}}></InstallButton>
				<InstallButton value="설치하기" onClick={installBtnCallback}></InstallButton>
			</div>
		</div>
	)
}
function InstallButton({value,onClick}){
	/**
	 * 안드로이드: 스토어 바로가기, 설치하기 버튼
	 * pc: 스토어 qr(안드로이드), 사이트 qr(ios)
	 * ios: 설치하기 버튼
	 */
	return(
		<input type="button" style={{margin:5,flex:1,backgroundColor:"white",border:"none",padding:"15px 30px",borderRadius:30,fontSize:"large"}} onClick={onClick} value={value}></input>
	)
}

export default ()=>{
	
	let isMobile = /Mobi/i.test(window.navigator.userAgent);
	return(
		<div style={{backgroundColor:"white",display:"flex",flexDirection:"column",height:"100%",position:"absolute",overflowY:"scroll",width:"100%"}}>
			<div className="app_information">
				{isMobile?"":(
					<div>
						이 앱은 모바일만 지원합니다!
					</div>
				)}
				<div style={{backgroundColor:"#947fda",display:"flex",flexDirection:"column"}}>
					<Title></Title>
					<SimpleDescription></SimpleDescription>
				</div>
				<div>

				</div>
			</div>
			<div className="contact" style={{marginTop:"auto",width:"100%",height:"100px",backgroundColor:"#947fda"}}>
				연락 방법 적어놓기
			</div>
			
		</div>
	)
}

/**
 * 앱이름
 * dday
 * 
 */