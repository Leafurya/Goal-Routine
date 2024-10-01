import projectBundle from "../../module/global/DataBundle";
import StateConst from "../../module/global/StateConst";
import todoList from "../../module/global/ToDo";

function TaskLists({project,pageUpdate}){
	let lists=[];
	let tasks=project.GetNowTasks()
	let started=(project.state===StateConst.ProjectStart)
	
	Object.keys(tasks).map((task,index)=>{
		lists.push(
			<li key={index}>
				<input disabled={!started} className='when_start' type="checkbox" id={"task"+index} defaultChecked={tasks[task]} value={task} onChange={(event)=>{
					project.taskDone=tasks.Set(task,event.target.checked)
					if(event.target.checked){
						document.querySelector("label[for="+event.target.id+"]").classList.add("checked");
						project.stat.checkedTaskCount++
					}
					else{
						document.querySelector("label[for="+event.target.id+"]").classList.remove("checked");
						project.stat.checkedTaskCount--
					}
					projectBundle.Save()
					todoList.Save()
					pageUpdate([])
				}}></input>
				<label className={"base_style"+(tasks[task]?" checked":"")} htmlFor={"task"+index}>&nbsp;{`${task}`}&nbsp;</label>
			</li>
		)
	})
	if(!lists.length){
		lists.push(<li className="base_style" key={0} style={{textAlign:"center"}}>오늘 뭐하지?</li>)
	}

	return lists;
}

export {TaskLists};