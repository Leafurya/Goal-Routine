const devDateDelta=0
// function GetTime(){
//     var today=Date.now()+32400000
//     var day=Math.floor(today/86400000)
//     today-=(day*86400000)
//     var hour=Math.floor(today/3600000)
//     today-=(hour*3600000)
//     var min=Math.floor(today/60000)
//     today-=(min*60000)
//     var sec=Math.floor(today/1000)
    
// 	return (""+day+"/"+hour+"/"+min+"/"+sec)
// }
function GetDay(){
	let today=Date.now()+32400000;
	return Math.floor(today/86400000)+devDateDelta;
}

let oldDate;
function InitDate(){
	oldDate=localStorage.getItem("oldDate");
	if(oldDate==null){ //non exist data in localstorage
		oldDate=GetDay();
		localStorage.setItem("oldDate",oldDate); //create oldDate item
	}
	else{
		oldDate=Number(oldDate);
	}
}
function UpdateOldDate(today){
	oldDate=today;
	localStorage.setItem("oldDate",(oldDate));
}
function IsNextDay(){
	let today=GetDay();
	if(today!=oldDate){
		return today;
	}
	return 0;
}
function GetOldDate(){
	return oldDate;
}
function GetPickedDate(date){
	let [year,month,day]=date.split("-");
	let pickedDate=new Date(year,month-1,day);
	
	return (Math.floor(pickedDate.getTime()/86400000)+devDateDelta+1);
}
// function GetDateDiff(newDate,oldDate){
// 	let diff = Math.abs(newDate.getTime() - oldDate.getTime());
// 	return Math.ceil(diff / (1000 * 60 * 60 * 24));
// }
function GetDateDiff(newDate,oldDate){
	let diff = Math.abs(newDate - oldDate);
	return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export {GetDay,InitDate,UpdateOldDate,IsNextDay,GetOldDate,GetPickedDate,GetDateDiff}