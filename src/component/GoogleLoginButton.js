import { useGoogleLogin } from "@react-oauth/google"
import { getCookie } from "../module/global/Cookie"
import { SetAuthResult } from "../module/global/Auth"
import { share } from "../module/global/ShareMethod"
import { ProjectBundle } from "../module/data/DataBundle"

export default ()=>{
	const login=useGoogleLogin({
		onSuccess: async (tokenResponse)=>{
			try{
				const {code}=tokenResponse
				console.log(tokenResponse)
				fetch(`${process.env.REACT_APP_API_HOST}/auth/google`,{
					credentials:"include",
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify({code})
				}).then((res)=>{
					console.log(res)
					SetAuthResult(true)
					share.app.setRe([])
					return res.json()
					// SetAuthResult(true)
					// // let test=new ProjectBundle(data)
				}).then((data)=>{
					console.log(data)
					share.app.setProjectBundle(new ProjectBundle(data))
				})
				// const data=await res.text()
				// console.log(getCookie("api_sid"))
			}catch(e){
				console.log(e)
			}
			// try{
			// 	const {access_token}=tokenResponse
			// 	console.log(tokenResponse)
			// 	const res=await fetch("https://aiv.p-e.kr:2020/api/signin/google",{
			// 		method:"POST",
			// 		headers:{
			// 			"Content-Type":"application/json"
			// 		},
			// 		body:JSON.stringify({token:access_token})
			// 	})
			// 	const data=await res.json()
			// 	console.log(data)
			// }catch(e){
			// 	console.log(e)
			// }
		},
		onFailure:(res)=>{console.log(res)},
		flow:"auth_code",
		accessType:"offline"
	})

	return(
		<input type="button" onClick={()=>{
			login()
		}} value="구글 로그인"></input>
	)
}
//  "4/0ATx3LY44bemqFDA9z_X0AI_scanqFs_gHwzhlvhrgcqTsuV4V-peCSus_y0ifSJMzimWPQ"