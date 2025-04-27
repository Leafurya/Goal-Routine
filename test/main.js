function test(){
	a=null
	console.log(a.ab)
}

try{
	test()
}catch(e){
	console.log("error")
	console.log(e)
}