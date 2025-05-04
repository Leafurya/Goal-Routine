import Project,{STATE_CONST} from "./Project.js";
import {getDaysBetween} from "./Date.js";

const projects=[];

function CreateProject(formData){
	let {id,title,start,end,type,state,items}=formData;
	let today=new Date();
	// console.log("create id",id);
	id=(id??projects.length);
	let project=new Project(id,title,start,end,type,today.toLocaleDateString(),state??STATE_CONST.start);
	items.map((itemGroup,groupIdx)=>{
		project.createItemGroup(groupIdx);
		itemGroup.map((item,itemIdx)=>{
			// console.log("g",groupIdx,", i",itemIdx);
			item.id=itemIdx;
			project.addItem(groupIdx,item);
		})
	})
	projects.push(project)
	project.setID(projects.length-1)
	// projects[id]=project;
	return id;
}
function UpdateProjects(){
	if(projects.length<1){
		return false;
	}
	let today=new Date();
	today=today.toLocaleDateString();
	let lastDate=localStorage.getItem("oldDate")??today;
	
	console.log("getDaysBetween(lastDate,today)",getDaysBetween(lastDate,today));
	if(getDaysBetween(lastDate,today)==0){
		return true;
	}

	projects.map((project,idx)=>{
		project.update(today);
	});
	lastDate=today;
	localStorage.setItem("oldDate",lastDate);
	return true;
}
async function LoadProjects(){
	let today=new Date();
	today=today.toLocaleDateString();
	let projectData;
	projectData = JSON.parse(localStorage.getItem("project"));
	
	if(projectData===null){
		localStorage.setItem("project",localStorage.getItem("backup")??`
		[
			{
				"id":0,
				"title":"",
				"type":"todo",
				"start":"${today}",
				"end":null,
				"items":[[],[]]
			}
		]
		`);
		projectData = JSON.parse(localStorage.getItem("project"));
	}
	else{
		localStorage.setItem("backup",JSON.stringify(projectData));
	}
	
	projectData.map((project,idx)=>{
		CreateProject(project);
	});
}
async function SavePorjects(){
	let projectDatas=[];
	console.log("save",projects);
	projects.map((project,idx)=>{
		projectDatas[idx]=project.getProps();
	});
	localStorage.setItem("project",JSON.stringify(projectDatas));

	let today=new Date();
	localStorage.setItem("oldDate",today.toLocaleDateString());
}
function GetAllProjectData(){
	let projectDatas=[];
	projects.map((project,idx)=>{
		projectDatas.push(project.getData());
	});
	return projectDatas;
}
function GetProjectDataById(id){
	let data=null;
	data=projects[id].getData();
	return data;
}
function RemoveProject(id){
	id=parseInt(id);
	projects[id].cleanup();
	projects[id]=null;
	projects.splice(id,1);
}
function GetIDs(){
	return Object.keys(projects);
}
function GetDaysBetween(date1,date2){
	return getDaysBetween(date1,date2);
}
function GetProjectPropsById(id){
	let data=null;
	try{
		data=projects[id].getProps();
	}catch(e){
		return null;
	}
	return {...data};
}
function CheckItem(prjID,itemID){
	projects[prjID].check(itemID);
}
function ToFront(prjID){
	let target=projects[prjID];

	for(;prjID>1;prjID--){
		projects[prjID]=projects[prjID-1]
		projects[prjID].setID(prjID);
	}
	projects[1]=target;
	projects[1].setID(1);

	console.log("tofront",projects);
}

const ProjectModule={
	CreateProject,
	UpdateProjects,
	LoadProjects,
	SavePorjects,
	GetAllProjectData,
	RemoveProject,
	GetIDs,
	GetProjectDataById,
	GetDaysBetween,
	GetProjectPropsById,
	CheckItem,
	ToFront
};

export default ProjectModule;