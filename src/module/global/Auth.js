let authResult=false

export function Authentication(callback){
	// console.log(`${process.env.REACT_APP_API_HOST}/api/signin`)
	/**
	 * 프로젝트 데이터 읽어오기
	 * 데이터 있으면 마지막 동기화 시간 전송할 것.
	 * 없으면 없다는 표시를 전송할 것.
	 */
	// 프로젝트 데이터 있는지 검사하고 데이터 받을지 말지 정할 것
	let project=localStorage.getItem("project")
	let lastSyncTime=localStorage.getItem("lastSyncTime")
	
	fetch(`${process.env.REACT_APP_API_HOST}/api/signin`,{
		credentials:"include"
	}).then((res)=>{
		if(res.status===200){
			authResult=true
			return res.json()
		}
		authResult=false
		return
		// callback()
		// return res.json()
	}).then((data)=>{
		console.log(data)
		if(data!==undefined){
			callback(data)
		}
	})
}
export function GetAuthResult(){
	return authResult
}
export function SetAuthResult(value){
	authResult=value
}
export function Logout(){
	
}