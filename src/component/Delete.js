import { useNavigate, useSearchParams } from 'react-router-dom';
import "../style/Template.css"
import "../style/ProjectCardStyle.css"
import ProjectModule from '../modules/Project/Interface';
import { useEffect } from 'react';

function Delete({}){
	//프로젝트 삭제 작업 진행행
	const navigate=useNavigate();
	const [param,setParam]=useSearchParams();
	let id=param.get("id");
	ProjectModule.RemoveProject(id);
	useEffect(()=>{
		navigate(-1);
	},[])
	return ("");
}
export {Delete};