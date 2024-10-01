import StateConst from "./StateConst";

export class Tasks{
	constructor(data){
		if(data){
			Object.keys(data).map((task)=>{
				this[task]=data[task]
			})
		}
	}
	Set(task,value){
		let done=true

		this[task]=value
		for(var t in this){
			if(!this[t]){
				done=false;
				break;
			}
		}

		return done
	}
	GetTaskCount(){
		return Object.keys(this).length
	}
	Reset(){
		for(var t in this){
			this[t]=false
		}
	}
	CountChecked(){
		let result=0
		for(var t in this){
			if(this[t]){
				result++
			}
		}
		return result
	}
}
export class Project{
	#nowDataVersion=2
	constructor(name,data){
		// this.data=data
		// data=this.CheckVersion(data)
		this.name=name
		this.version=this.#nowDataVersion
		this.D=data.D
		// this.start=data.start??data.start
		this.tasks=new Tasks(data.tasks)
		this.day=Number(data.day)
		
		this.description=data.description
		this.stat=data.stat
		this.state=data.state??StateConst.ProjectStart
		// this.prjDone=data.prjDone
		this.taskDone=data.taskDone
		this.lastTasks=new Tasks(data.lastTasks)
	}
	CheckVersion(jsonData){
		let result=jsonData
		if(result.version!==this.#nowDataVersion){
			result.version=this.#nowDataVersion
			if(result.prjDone){
				result.state=StateConst.ProjectDone //프로젝트 끝
			}
			else if(!result.start&&(result.day===0)){
				result.state=StateConst.WaitToModify //수정 대기
			}
			else if(!result.start){
				result.state=StateConst.WaitToStart //시작 대기
			}
			else{
				result.state=StateConst.ProjectStart //진행중
			}
			delete result.prjDone
			delete result.start
		}
		return result
	}
	Start(){
		if((this.D==="-"&&this.day<=0)||this.start){
			return false
		}
		if(this.D==="+"){
			this.day++
		}
		this.state=StateConst.ProjectStart
		return true;
	}
	IsLastTaskExist(){
		return (this.lastTasks.GetTaskCount()>0?true:false)
	}
	GetNowTasks(){
		if(this?.lastTasks){
			if(this.day<=0&&Object.keys(this.lastTasks).length!==0){
				return this.lastTasks;
			}
		}
		return this.tasks
	}
	GetDay(){
		switch(this.D){
			case "+":{
				return `D+${this.day}`
			}
			case "-":{
				if(this.day>0){
					return `D-${this.day}`
				}
				if(this.state===StateConst.ProjectDone){
					return "D-END"
				}
				if(this.state===StateConst.WaitToModify){
					return ""
				}
				if(this.state===StateConst.ProjectStart&&this.day===0){
					return "D-DAY"
				}
			}
		}
	}
	Reset(){
		this.day=0
		// this.start=false
		this.tasks.Reset()
		if(this.IsLastTaskExist()){
			this.lastTasks.Reset()
		}
		this.state=StateConst.ProjectDone
		// this.prjDone=true
		this.taskDone=false
	}
}
export class ProjectBundle{
	#storageName="projects"
	
	constructor(){
		this.data={}
	}
	Init(){
		let jsonString=localStorage.getItem(this.#storageName)??"{}"
		let jsonData=JSON.parse(jsonString)
		this.data={}
		Object.keys(jsonData).map((name)=>{
			// let data=this.CheckVersion(jsonData[name])
			this.data[name]=new Project(name,jsonData[name])
		})
	}
	GetProject(prjName){
		return this.data[prjName]
	}
	IsExist(prjName){
		return (prjName in this.data)
	}
	Save(){
		localStorage.setItem(this.#storageName,JSON.stringify(this.data))
	}
	Append(prjName,data){
		if(this.IsExist(prjName)){
			return false
		}
		this.data[prjName]=new Project(prjName,data)
		return true
	}
	Modify(oldName,newName,data){
		if(!this.Append(newName,data)){
			return false
		}
		this.Remove(oldName)
		return true
	}
	Remove(prjName){
		delete this.data[prjName]
	}
	Quit(name){
		delete this.data[name]
		this.Save()
	}
	DailyUpdate(dateDelta){
		let nowTask
		Object.values(this.data).map((data)=>{
			if(data.state===StateConst.ProjectStart){
				nowTask=data.GetNowTasks()
				switch(data.D){
					case "+":{
						data.day+=dateDelta
						data.stat.taskCount+=(nowTask.GetTaskCount()*dateDelta)
						break
					}
					case "-":{
						data.day-=dateDelta

						if(data.day<0){
							data.stat.taskCount+=(data.tasks.GetTaskCount()*(dateDelta+data.day-1))
							data.stat.taskCount+=(data.IsLastTaskExist()?(data.lastTasks.GetTaskCount()):(data.tasks.GetTaskCount()))
							data.Reset()
							return
						}
						else{
							data.stat.taskCount+=(nowTask.GetTaskCount()*dateDelta)
						}
						break
					}
				}
				nowTask.Reset()
				data.taskDone=false
			}
		})
	}
	
}
let projectBundle=new ProjectBundle()
export default projectBundle