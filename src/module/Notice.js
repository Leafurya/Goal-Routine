import "../style/Notice.css"
import {CreateElement} from "./CreateCompModule"

function CloseNotice(node){
    document.querySelector(".App").removeChild(node)
}
function Alert(str){
    let background=CreateElement({element:"div",classList:"notice_background"})
    let platform=CreateElement({element:"div",classList:"alert_platform platform_base"})
    let article=CreateElement({element:"div",classList:"article"})
    let span=CreateElement({element:"span",classList:"row_align_re"})
    let input=CreateElement({element:"input",type:"button",value:"확인",onclick:()=>{
        CloseNotice(background)
    }})

    background.append(platform)
    platform.append(article)
    platform.append(input)
    article.append(span)
    span.innerHTML=str

    document.querySelector(".App").append(background)
}
function Prompt(str){
	return new Promise((resolve)=>{
		let result=null

		let background=CreateElement({element:"div",classList:"notice_background"})
		let platform=CreateElement({element:"div",classList:"prompt_platform platform_base"})
		let article=CreateElement({element:"div",classList:"article"})
		let span=CreateElement({element:"span",classList:"row_align_re"})
		let text=CreateElement({element:"input",type:"text",classList:"col_align_re"})
		let textDiv=CreateElement({element:"div"})
		let ok=CreateElement({element:"input",type:"button",value:"확인",onclick:()=>{
			result=text.value
			CloseNotice(background)
		}})
		let cancel=CreateElement({element:"input",type:"button",value:"취소",onclick:()=>{
			result=""
			CloseNotice(background)
		}})
		let okcancel=CreateElement({element:"div",classList:"okcancel"})
	
		background.append(platform)
		platform.append(article)
		platform.append(textDiv)
		platform.append(okcancel)

		textDiv.append(text)
		
		okcancel.append(ok)
		okcancel.append(cancel)
	
		article.append(span)
		
		span.innerHTML=str
		document.querySelector(".App").append(background)
		text.focus()

		let interval=setInterval(()=>{
			if(typeof(result)==="string"){
				resolve(result)
				clearInterval(interval)
			}
		},1)
	})
}

function Confrim(str){
	return new Promise((resolve)=>{
		let result=0

		let background=CreateElement({element:"div",classList:"notice_background"})
		let platform=CreateElement({element:"div",classList:"confirm_platform platform_base"})
		let article=CreateElement({element:"div",classList:"article"})
		let span=CreateElement({element:"span",classList:"row_align_re"})
		let ok=CreateElement({element:"input",type:"button",value:"확인",onclick:()=>{
			result=1
			CloseNotice(background)
		}})
		let cancel=CreateElement({element:"input",type:"button",value:"취소",onclick:()=>{
			result=-1
			CloseNotice(background)
		}})
		let okcancel=CreateElement({element:"div",classList:"okcancel"})

		background.append(platform)
		platform.append(article)
		platform.append(okcancel)
		article.append(span)
		span.innerHTML=str

		okcancel.append(ok)
		okcancel.append(cancel)

		document.querySelector(".App").append(background)

		let interval=setInterval(()=>{
			if(result){
				resolve(result)
				clearInterval(interval)
			}
		},1)
	})
}

const Notice={
    Alert,
    Prompt,
	Confrim
}

export default Notice