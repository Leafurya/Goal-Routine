import "../style/Lobby.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {ProjectLists} from "./sub-compo/LobbySubCompos.js";

import ProjectModule from "../modules/Project/Interface.js";

function Lobby(){
	const navigate=useNavigate()
	let projectIDs;

	try{
		if(ProjectModule.UpdateProjects()){
			projectIDs=ProjectModule.GetIDs();
			ProjectModule.SavePorjects();
		}
	}catch(e){
		return e
	}
	// let result=ProjectModule.UpdateProjects();
	// if(result>=0){
	// 	projectIDs=ProjectModule.GetIDs();
	// }
	// if(result===1){
	// 	ProjectModule.SavePorjects();
	// }

	return (
		<div className="borad">
			<ProjectLists prjIDs={projectIDs}></ProjectLists>
			<div style={{padding:"15px"}}>
					<input style={{display:"none"}} type="button" id="create_btn" onClick={()=>{
						navigate("/Create")
					}}></input>
					<label htmlFor="create_btn" className="plus_btn label_base">
						<div className="plus_btn_value base_style">+</div>
					</label>
			</div>
		</div>
	);
}
export default Lobby;

