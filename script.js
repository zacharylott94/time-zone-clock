//Original Code Author: Zachary Lott
//Author Github: zacharylott94@gmail.com
//localized for IE and Chrome

/*To add a new clock:
1. create a new paragraph
2. create a new updater
3. add the updater to the update function loop */



//snippet for checking dst
Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

//transforms local time 'date' object into UTC 'date' object
//Returns said object.
function DateUTC () {
	time = new Date();
	var offset = time.getTimezoneOffset() / 60;
	time.setHours(time.getHours() + offset);
	return time
};

//creates a paragraph element
//'id', string. This is the element id you want the paragraph to have.
function createP (id) {

	var p = document.createElement('p');

	p.id = id;
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(p);
	var div = document.createElement('div');
	p.appendChild(div);
	return p;

};

//creates an image object
//'id', string. The element id to assign to the image.
//'src', string. The location of the image.
function createImg (id, src) {
	var img = document.createElement('img');
	img.id = id;
	img.src = src;
	return img;

};


//This function returns another function that updates the paragraph when it is called
//'paragraph', object. The paragraph to draw information into.
//'label', string. What you want displayed above the time.
//'offset', number. The standard UTC offset of the timezone.
//'dst', bool. If true, will factor DST into the offset. Default: false
//'img', object. An image to display above the text, typically a regional flag. Default: null
function updater (paragraph, label, offset, dst, img) {
	if (!dst) {dst = false;};
	if (!img) {img = null;}
	return function () {
	var time =  DateUTC()	;

	if (dst) {
		if (time.dst()) {
			offset += 1;
			dst = false;
		};
	};

	time.setHours(time.getHours() + offset);
	paragraph.innerText = "\n" + label + "\n" + time.toLocaleTimeString('en-US');
	paragraph.insertBefore(img,paragraph.firstChild);
	}
};

//create image objects here
var usFlag = createImg("usFlag", "img/US.png");
var usFlag2 = createImg("usFlag", "img/US.png");


//create paragraphs here
var westC = createP("west");
var eastC = createP("east");


//for dynamic local time
var time = new Date();
var offset = time.getTimezoneOffset() / 60;

//create updaters here.

var west = updater(westC, "Los Angeles", -8, true, usFlag2);
var east = updater(eastC, "Atlanta", -5, true, usFlag);


function update() 	{
	//call the updaters here
	west();
	east();


};
setInterval(update, 1000);
