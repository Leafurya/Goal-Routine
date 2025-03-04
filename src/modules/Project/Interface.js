import Project,{STATE_CONST} from "./Project.js";
import {getDaysBetween} from "./Date.js";

const projects=[];

/*
,
		{
			"id":null,
			"title":"건강해지기",
			"type":"+",
			"start":"2024. 2. 15",
			"end":null,
			"items":[
				[],
				[{
					"id":0,
					"check":false,
					"content":"팔굽10개"
				},
				{
					"id":1,
					"check":false,
					"content":"스쿼트10개"
				}],
				[{
					"id":0,
					"check":false,
					"content":"팔굽20개"
				},
				{
					"id":1,
					"check":false,
					"content":"스쿼트20개"
				}]
			]
		}
*/


function CreateProject(formData){
	let {id,title,start,end,type,state,items}=formData;
	let today=new Date();
	// id=parseInt(id??today.getTime());
	// projects.push(1)
	console.log("create id",id);
	id=(id??projects.length);
	let project=new Project(id,title,start,end,type,today.toLocaleDateString(),state??STATE_CONST.start);
	items.map((itemGroup,groupIdx)=>{
		project.createItemGroup(groupIdx);
		itemGroup.map((item,itemIdx)=>{
			item.id=itemIdx;
			project.addItem(groupIdx,item);
		})
	})
	projects[id]=project;
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
	// console.log(lastDate);
	
	if(getDaysBetween(lastDate,today)==0){
		return true;
	}
	// console.log("update. init");
	// projects.map((project,idx)=>{
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
	let projectData = JSON.parse(localStorage.getItem("project")??`
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
	projectData.map((project,idx)=>{
		CreateProject(project);
	});

	// localStorage.setItem("oldDate",today);
	// console.log("create project");
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
	// projects.map((project,idx)=>{
	// 	if(project.getID()===id){
	// 		data=project.getData();
	// 		return;
	// 	}
	// });
	data=projects[id].getData();
	return data;
}
function RemoveProject(id){
	// projects.map((project,idx)=>{
	// 	if(project.getID()==id){
	// 		project.cleanup();
	// 		projects[idx]=null;
	// 		projects.splice(idx,1);
	// 	}
	// });
	projects[id].cleanup();
	projects[id]=null;
	projects.splice(id,1);
}
function GetIDs(){
	// let ids=[];
	// projects.map((project,idx)=>{
	// 	ids.push(project.getID());
	// });
	// Object.keys(projects).map((key,idx)=>{
	// 	ids.push(parseInt(key));
	// });
	// ids=Object.keys(projects);
	
	return Object.keys(projects);
}
function GetDaysBetween(date1,date2){
	return getDaysBetween(date1,date2);
}
function GetProjectPropsById(id){
	let data=null;
	console.log("id",id);
	// projects.map((project,idx)=>{
	// 	if(project.getID()===id){
	// 		data=project.getProps();
	// 		return;
	// 	}
	// });
	try{
		data=projects[id].getProps();
	}catch(e){
		return null;
	}
	return data;
}
function CheckItem(prjID,itemID){
	// projects.map((project,idx)=>{
	// 	if(project.getID()===id){
	// 		data=project.getProps();
	// 		return;
	// 	}
	// });
	projects[prjID].check(itemID);
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
	CheckItem
};

export default ProjectModule;