import StateConst from "./global/StateConst"

// const _nowDataVersion=2
export class Stat{
	constructor(taskCount){
		this.taskCount=taskCount
		this.checkedTaskCount=0
	}
}
class DPlus{
	constructor(day,description,tasks){
		// this.version=_nowDataVersion
		this.D="+"
		this.state=StateConst.WaitToStart
		// this.start=false
		this.tasks=tasks
		this.day=day
		this.description=description
		try{
			this.stat=new Stat(Object.keys(tasks).length)
		}catch(e){
			this.stat=new Stat(0)
		}
		// this.prjDone=false
		this.taskDone=false
	}
}
class DMinus{
	constructor(day,description,tasks,lastTasks){
		// this.version=_nowDataVersion
		this.D="-"
		this.state=StateConst.WaitToStart
		// this.start=false
		this.tasks=tasks
		this.day=day
		this.description=description
		try{
			this.stat=new Stat(Object.keys(tasks).length)
		}catch(e){
			this.stat=new Stat(0)
		}
		// this.prjDone=false
		this.taskDone=false

		if(lastTasks){
			this.lastTasks=lastTasks
		}
	}
}
function CreateDataObj(description,tasks,D,day,lastTasks){
	let data
	switch(D){
		case "+":
			data=new DPlus(day,description,tasks)
			break
		case "-":
			data=new DMinus(day,description,tasks,lastTasks)
			break
	}
	return data
}

export{CreateDataObj}
