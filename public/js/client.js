//Global Variables
let object = {};
let category = [];
let items = [];
let restaurant = {}
let a = window.location.pathname.split("/")[2];

//Creates restaurant with initial JSON object
function createRestaurant(){
	
	object = {
		"name": document.getElementById("restaurantName").value,
		"delivery_fee": document.getElementById("deliveryfee").value,
		"minimum_order": document.getElementById("minimumorder").value,
	}
	let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			const res = JSON.parse(this.response);
			object['menu'] = res['menu'];
			alert("restaurant created");
			url = `http://127.0.0.1:3000/restaurants/${res['id']}`;
			window.location.replace(url);
		}
	}
	
	//Send a POST request to the server containing the recipe data
	req.open("POST", '/restaurants',true);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(object));
}
//Creates a category
function createCategory(){
	let div = document.createElement('h3');
	let cat = document.getElementById('textfield').value;
	console.log(cat);
	if(category.hasOwnProperty(cat)){
		alert("Cannot have duplicate Categories");
	}
	else{
		category.push(cat);
		div.textContent = cat;
		document.getElementById('menu').appendChild(div);
		let option =  `<option id="${category}">${category}</option>`;
		document.getElementById('select').append(option);
	}

}
//Creates an item
function createItem(){
	
	let name = document.getElementById("itemname").value;
	let desc = document.getElementById("itemdesc").value;
	let price = document.getElementById("itemprice").value;
	let item = {
		"category": document.getElementById("textfield").value,
		"name": name,
		"description": desc,
		"price": price,
	}

	items.push(item);
	let displayItem = `<div id='displayitem'></div>`;
	for(let i = 0; i < items.length; i++){
		displayItem+=
		`<p> Name ${items[i].name}: </p>
		 <p> Price: ${items[i].price} </p>
		 <p> Description: ${items[i].price} </p>
		`
	}
	let div = document.createElement('div');
	div.innerHTML = displayItem;
	document.getElementById("menu").appendChild(div);
}

//Sends the object info into the server
function sendToServer(){
	let req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(this.readyState==4 && this.status==200){
			alert("Restaurant Save to server!")
		}
	}
	req.open("PUT", '/restaurants/:restID',true);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(object));
}