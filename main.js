var fishes = [];
var plants = [];

const waterline = ["~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
"^^^^ ^^^  ^^^   ^^^    ^^^^      ^^^^ ^^^  ^^^   ^^^    ^^^^      ^^^^ ^^^  ^^^   ^^^    ^^^^      ^^^^ ^^^  ^^^   ^^^    ^^^^      ^^^^ ^^^  ^^^   ^^^    ^^^^      ^^^",
"^^^^      ^^^^     ^^^    ^^     ^^^^      ^^^^     ^^^    ^^     ^^^^      ^^^^     ^^^    ^^     ^^^^      ^^^^     ^^^    ^^     ^^^^      ^^^^     ^^^    ^^     ^^^",
"^^      ^^^^      ^^^    ^^^^^^  ^^      ^^^^      ^^^    ^^^^^^  ^^      ^^^^      ^^^    ^^^^^^  ^^      ^^^^      ^^^    ^^^^^^  ^^      ^^^^      ^^^    ^^^^^^  ^^"]


fish1_l=[ "  ___",
	  "\\/  o\\",
	   "/\\___/"]

fish1_r=[ 
" ___  ",
"/o  \\/",
"\\___/\\"
]

fish2_r = [
"          __ ",
"         /  : " ,
"     _.--\"\"\"-..   _.",
"    /F         `-'   [",
"   ]  ,    ,    ,     :",
"    '--L__J_.-\"\" ',_:",
"        '-._J"
];

fish2_l = [
"          __          ",
"         ;  \\         ",
"  ._   ..-\"\"\"--._     ",
" ]  '-`           9\\    ",
";    ,    ,    ,     [   ",
" ;_,' \"\"-._L__J--'    ",
"         L_.-'     ",
]

String.prototype.reverse = function(){
	return this.split("").reverse().join()
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function reverseAscii(str){
	return str.replaceAll("/","\\").replaceAll("/","\\")
}

function fishToHtml(fish, type=0){
	html = ""
	fish.forEach(function(f){
	//for (f in fish){
		html += f.replaceAll(" ", "&nbsp;") + "<br>"

	})
	return html;
}


fish_types = [
[
	[[fishToHtml(fish1_l)]],
	[[fishToHtml(fish1_r)]]
],
[
	[[fishToHtml(fish2_l)]],
	[[fishToHtml(fish2_r)]]	

]				
]




var screen_height = 600;
var screen_width = 1200;
var fish_counter  = 0;
const fish_max = 7;
var new_spawn = 0;


function makeNewFishDiv(){
	new_div = document.createElement("div");
	new_div.classList = ["fish"];
	new_div.classList.add("e");
	document.body.append(new_div);
	return new_div;
}

plant = function(div, frames, x){
	this.div = div;
	this.frames = frames;
	this.div.innerHTML = frames[0];
	this.div.style.left = x;
	this.frame_num = 0; 
}

plant.prototype = Object.create(Object.prototype);

plant.prototype.next_frame = function(){
	this.frame_num = ((this.frame_num+1) < this.frames.length)? this.frame_num + 1 : 0;
	this.div.innerHTML = this.frames[this.frame_num];
}


function fish(div, y=20,direction=0,type=0, tempo= 4){
	this.type = fish_types[type][direction][0];
	console.log(this.type)
	this.y = y;
	this.direction = direction;
	this.tempo = tempo;
	this.x = 0;
	this.div = div;
	this.div.classList.remove("e");
	this.div.innerHTML = this.type;
}


fish.prototype = Object.create(Object.prototype);

fish.prototype.move = function(){
	if (this.direction){
		this.div.style.right = this.x += this.tempo;
	}
	else{
		this.div.style.left = this.x += this.tempo;
	}
}

fish.prototype.start = function(){
	if (this.direction){
		this.div.style.left = "";
		this.div.style.right = 0;
	}
	else{
		this.div.style.right = "";
		this.div.style.left = 0;
	}
	this.div.style.top = this.y;
	fish_counter++;
}

fish.prototype.stop = function(){
	this.div.classList.add("e");
	this.div.innerHTML = null;
}

function makeRandomFish(div=null){
	y = (Math.random()*(screen_height-80)) + 80;
	if (!div){
		div = makeNewFishDiv();
	}
	tempo = Math.floor(Math.random() * 4) + 2
	dir = Math.round((Math.random()))
	type = Math.floor(Math.random() * fish_types.length)
	f = new fish(div, y, dir, type, tempo)
	releaseNewFish(f);
}

function releaseNewFish(f){
	f.start()
	fishes.push(f)
}

function makeRandomSeaplant(){
	var length = Math.floor(Math.random() * 5) + 4;
	var x = Math.random()*(screen_width-200);
	var plantHTML = ["", ""];
	var left = Math.random() > 0.5;
	for (var i = 6; i > 0; i--){
		if (i > length){
			plantHTML[0] += "<br>";
			plantHTML[1] += "<br>";
			continue;
		}
		plantHTML[0] += ((left)? "&nbsp)" : "(&nbsp") + "<br>";
		plantHTML[1] += ((left)? "(&nbsp" : "&nbsp)") + "<br>";
		left = !left;

	}
	plant_div = document.createElement("div");
	plant_div.classList.add("plant");
	document.body.append(plant_div);
	p = new plant(plant_div, plantHTML, x);
	plants.push(p);
}


function animatePlants(){
	for (p in plants){
		plants[p].next_frame();
	}
	setTimeout(animatePlants, 500);
}


function run(){
	for (i in fishes){
		fishes[i].move();
		if (fishes[i].x > screen_width){
			fishes[i].stop()
			fish_counter -= 1;
			delete fishes[i];
		}
		
	}
	if((new_spawn < new Date().valueOf()) && (fish_counter < fish_max)){
		f_div = document.getElementsByClassName("e")[0];
		if (f_div){
			makeRandomFish(f_div)
		}
		new_spawn = new Date().valueOf() + (Math.random() *5000);
		console.log(new_spawn);
	}
	setTimeout(run,50);
}