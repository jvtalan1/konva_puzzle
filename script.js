var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
	container: 'container',
	width: width,
	height: height
});

var layer = new Konva.Layer();
var box;

var source = {pic1: 'items/0.jpeg',
	pic2: 'items/1.jpeg',
	pic3: 'items/2.jpeg',
	pic4: 'items/3.jpeg',
	pic5: 'items/4.jpeg',
	pic6: 'items/5.jpeg',
	pic7: 'items/6.jpeg',
	pic8: 'items/7.jpeg',
	pic9: 'items/8.jpeg',
	pic10: 'items/9.jpeg',
	pic11: 'items/10.jpeg',
	pic12: 'items/11.jpeg',
	pic13: 'items/12.jpeg',
	pic14: 'items/13.jpeg',
	pic15: 'items/14.jpeg',
	pic16: 'items/empty.jpg'};


loadImages(source, function(image) {
	draw(image);
});

function loadImages(source, callback) {
	var image = {};
	var loadedImages = 0;
	var numImages = 0;

	for (var n in source) {
		numImages++;
		console.log(numImages);
	}

	for (var n in source) {
		image[n] = new Image();
		image[n].onload = function() {

			if (++loadedImages>=numImages) {
				console.log(loadedImages);
				callback(image);
			}
		};
		image[n].src = source[n];
	}
}

function draw(image) {
	var i = 0;
	var x = 0;
	var y = 0;

	for (var n in source) {
		x = offsetX(i);
		y = offsetY(i);

		box = new Konva.Rect({
			x: x,
			y: y,
			width: 150,
			height: 150,
			fillPatternImage: image[n],
			stroke: 'white',
			strokeWidth: 2,
			draggable: true,
			name: n,
			dragBoundFunc: function(pos) {
				return {
					x: this.getAbsolutePosition().x,
					y: this.getAbsolutePosition().y,
				}
			}
		});

		box.on('dragstart', function() {
			var setX = box.name('pic9').getAttr('x');
			var setY = box.name('pic9').getAttr('y');

			var getX = this.getAttr('x');
			var getY = this.getAttr('y');

			var limitX = Math.abs(getX - setX);
			var limitY = Math.abs(getY - setY);

			console.log(setX);
			console.log(limitY);

			if (limitX <= 150 && limitY <= 150 && limitX != limitY) {
				box.name('pic9').setAttr('x', getX);
				box.name('pic9').setAttr('y', getY);

				this.setAttr('x', setX);
				this.setAttr('y', setY);
			}

		});

		layer.add(box);
		stage.add(layer);
		i++;

	};
}

function offsetX(i) {
	var x;
	if (i >= 0 && i < 4) {
		x = 0;
	} else if (i>=4 && i<8) {
		x = 150;
	} else if (i>=8 && i<12) {
		x = 300;
	} else if (i>=12 && i<16) {
		x = 450;
	}
	return x;
}

function offsetY(i) {
	var y;
	if (i == 0 || i == 4 || i == 8 || i == 12) {
		y = 0;
	} else if (i == 1 || i == 5 || i == 9 || i == 13) {
		y = 150;
	} else if (i == 2 || i == 6 || i == 10 || i == 14) {
		y = 300;
	} else if (i == 3 || i == 7 || i == 11 || i == 15) {
		y = 450;
	}
	return y;
}


