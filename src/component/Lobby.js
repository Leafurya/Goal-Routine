import "../style/Lobby.css";

import {ProjectLists} from "./sub-compo/LobbySubCompos.js"
import {GetAttendance, UpdateAttendance} from '../module/AttendanceModule.js'
import Notice from '../module/Notice.js';
import { StyledLink} from "../module/GlobalModule";
import { GetOldDate, IsNextDay, UpdateOldDate } from "../module/TimeModule";
import projectBundle from "../module/global/DataBundle";
import todoList from "../module/global/ToDo";
import { toastRef } from "./Notices.js";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import userInfo from "../module/global/User.js";
import GoogleLoginButton from "./GoogleLoginButton.js";
import { GetAuthResult, SetAuthResult } from "../module/global/Auth.js";
import { share } from "../module/global/ShareMethod.js";
import { useEffect } from "react";

function Lobby(){
	let today=IsNextDay();
	const navigate=useNavigate()
	if(today){
		UpdateOldDate(today);
		let dateDelta=today-GetOldDate();
		// UpdateAttendance(dateDelta);
		// todoList.DailyUpdate()
		// projectBundle.DailyUpdate(dateDelta)
		// projectBundle.Save()
	}
	useEffect(()=>{
		console.log("lobby")
		
	},[])
	// console.log(window.sessionStorage)
	return(
		<div className="borad">
			<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
				{
					GetAuthResult()?(
						<input type="button" value="로그아웃" onClick={()=>{
							fetch(`${process.env.REACT_APP_API_HOST}/api/logout`,{
								method:"GET",
								credentials:"include"
							}).then((res)=>{
								if(res.status===200){
									console.log(res.status)
									SetAuthResult(false)
									share.app.setRe([])
								}
							})
						}}></input>
					):(
						<GoogleLoginButton></GoogleLoginButton>
					)
				}
			</div>
			<ProjectLists></ProjectLists>
			{/* <ul className="project_list_ul">
			</ul> */}
			<div style={{padding:"15px"}}>
				{/* <label htmlFor="create_btn"> */}
					<input style={{display:"none"}} type="button" id="create_btn" onClick={()=>{
						navigate("/Create")
					}}></input>
					<label htmlFor="create_btn" className="plus_btn label_base">
						<div className="plus_btn_value base_style">+</div>
					</label>
				{/* </label> */}
			</div>
			
			{/* <label htmlFor="create_btn">
				<div className="plus_btn label_base">
					<div className="plus_btn_value base_style">+</div>
				</div>
			</label> */}
		</div>
	)
}
export default Lobby;

