import { useNavigate, useSearchParams } from 'react-router-dom';
import "../style/Template.css"
import "../style/ProjectCardStyle.css"
import ProjectModule from '../modules/Project/Interface';
import { useEffect } from 'react';

function Delete({}){
	const navigate=useNavigate();
	const [param,setParam]=useSearchParams();
	let id=param.get("id");
	ProjectModule.RemoveProject(id);
	useEffect(()=>{
		//console.log("project list useeffect",projectBundle)
		navigate(-1);
	},[])
	return ("");
}
export {Delete};