import {getDaysBetween} from "./Date.js"

class Item{
	check;
	content;
	id;
	constructor(id,obj){
		this.check=obj.check;
		this.content=obj.content;
		this.id=id;
	}
	uncheck(){
		this.check=false;
	}
}

export const STATE_CONST={
	ready:0,
	start:1,
	end:2,
	finish:3
};;

export default class Project{
	#id;
	#title;
	#nofItems;
	#start;
	#current;
	#end;
	#items=[];
	#type;
	#state;

	/**
	 * @param {Number} id 
	 * @param {String} title 
	 * @param {Stringified Date} start 
	 * @param {Stringified Date} end 
	 * @param {Stringified Date} today 
	 */
	constructor(id,title,start,end,type,today,state){
		this.#id=id;
		this.#title=title;
		this.#start=start;
		this.#end=end;
		this.#nofItems=0;
		this.#current=today;
		this.#type=type;
		this.#state=state;
	}
	setTitle(title){
		this.#title=title;
	}
	setStart(start){
		this.#start=start;
	}
	setEnd(end){
		this.#end=end;
	}
	setID(id){
		this.#id=id;
	}
	getDay(today){
		switch(this.#type){
			case "todo":
				return "오늘 할 일";
			case "+":
				return "D+"+(getDaysBetween(this.#start,today)+1);
			case "-":
				let day=getDaysBetween(today,this.#end);
				if(day===0){
					this.#state=STATE_CONST.end;
				}
				else if(day<0){
					this.#state=STATE_CONST.finish;
					return "종료";
				}
				return "D-"+day;
		}
		return null;
	}
	getItemList(){
		return this.#items;
	}
	getProps(){
		return{
			id:this.#id,
			title:this.#title,
			type:this.#type,
			start:this.#start,
			end:this.#end,
			items:[...this.#items]
		}
	}
	getData(){
		let nowItemsIdx=this.getNowItemsIdx();
		let tiems=this.#items[nowItemsIdx];
		if(this.#state===STATE_CONST.finish){
			tiems=null;
		}
		return{
			id:this.#id,
			title:this.#title,
			type:this.#type,
			start:this.#start,
			end:this.#end,
			current:this.#current,
			day:this.getDay(this.#current),
			state:this.#state,
			items:tiems
		};
	}
	getID(){
		return this.#id;
	}
	update(today){
		if(this.#type==="todo"){
			this.#items[1]=[];
			return;
		}
		this.#current=today;
		if(this.#type==="-"&&getDaysBetween(today,this.#end)<0){
			this.#state=STATE_CONST.finish;
		}
		const items=this.#items;
		items.map((itemGroup,groupId)=>{
			itemGroup.map((item,idx)=>{
				try{
					item.uncheck();
				}catch(e){
					console.log(e);
				}
			})
		});
	}
	addItem(group,itemObj){
		// console.log(group,itemObj);
		if(itemObj){
			let item=new Item(itemObj.id,itemObj);
			this.#items[group].push(item);
			this.#nofItems=this.#items.length;
		}
	}
	createItemGroup(groupIdx){
		this.#items[groupIdx]=[]
	}
	cleanup(){
		for(let i=0;i<this.#nofItems;i++){
			this.#items[i]=null;
		}
	}
	getNowItemsIdx(){
		let nowItemsIdx;
		if(this.#end!==null&&getDaysBetween(this.#current,this.#end)===0&&this.#items[0].length){
			nowItemsIdx=0;
		}
		else{
			let gap=getDaysBetween(this.#start,this.#current);
			nowItemsIdx=(gap)%(this.#items.length-1)+1;
		}
		return nowItemsIdx;
	}
	check(itemID){
		let groupIdx=this.getNowItemsIdx();
		this.#items[groupIdx][itemID].check=!this.#items[groupIdx][itemID].check;
	}
	deleteItemGroup(id){
		delete this.#items[id];
		this.#items.splice(id,1);
	}
}