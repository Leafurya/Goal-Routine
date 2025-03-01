import ProjectModule from "./Interface.js"

// title,start,end,itemss
const formData1={
	title:"test project",
	start:"2024. 02. 15",
	end:null,
	type:"+",
	state:1,
	items:[
		{content:"이뻐해주기",check:false},
		{content:"연락하기",check:false}
	]
}
const formData2={
	title:"test project",
	start:"2025. 02. 26",
	end:"2025. 02. 27",
	type:"-",
	state:1,
	items:[
		{content:"뭔가 하기",check:false}
	]
}

ProjectModule.CreateProject(formData1);
ProjectModule.CreateProject(formData2);
console.log(ProjectModule.GetProjectData());
console.log();
ProjectModule.UpdateProjects("2026. 02. 28");
console.log(ProjectModule.GetProjectData());
// let d=new Date();

// console.log(d.getTime());
// console.log(d.toUTCString())