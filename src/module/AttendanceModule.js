let attendance;
function InitAttendance(){ //씀
	attendance=localStorage.getItem("attendance");
	if(attendance==null){
		attendance=0;
		localStorage.setItem("attendance",0);
	}
}
function UpdateAttendance(dateDelta){ //씀
	attendance++;
	if(dateDelta>1){
		attendance=0;
	}
	localStorage.setItem("attendance",attendance);
}
function GetAttendance(){ //씀
	return attendance;
}

module.exports.InitAttendance=InitAttendance;
module.exports.UpdateAttendance=UpdateAttendance;
module.exports.GetAttendance=GetAttendance;