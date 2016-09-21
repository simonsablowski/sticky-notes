var StickyNotes = function(configuration) {
	var self = this;
	self.canvas = null;
	self.configuration = null;
	
	self.construct = function(configuration) {
		self.configuration = configuration;
		self.createCanvas();
		self.configureControls();
		self.configureDragging();
	}

	self.createCanvas = function() {
		self.canvas = new fabric.Canvas('canvas');
		self.canvas.setDimensions({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}

	self.create = function(x, y, colour, tempText) {
		var group = new fabric.Group([
			//TODO: x and y are not ideal positions
			new fabric.Rect({
				left: x,
				top: y,
				fill: colour,
				width: 100,
				height: 100
			}),
			/*new fabric.Image.fromURL(tempText + '.png', function(image) {
				//TODO: image library not available
			}),*/
			//TODO: find a way to make text editable inline (another library is needed)
			new fabric.Text(tempText, {
				left: x + 20,
				top: y + 20,
				fontSize: 20
			})
		]);
		//TODO: find ideal configuration for sticky note objects
		group.hasControls = group.hasBorders = false;
		self.canvas.add(group);
	}

	self.configureControls = function() {
		for (var i = 0, l = self.configuration.colours.length; i < l; i++) {
			//TODO: fix overwriting problem
			var colour = self.configuration.colours[i];
			document.getElementById(colour.name).onmousedown = function(e) {
				self.create(e.x, e.y, colour.code, colour.name);
			};
		}
	}

	self.configureDragging = function() {
		self.canvas.on({
			'mouse:down': function(e) {
				if (e.target) {
					e.target.opacity = 0.75;
					self.canvas.renderAll();
				}
			},
			'mouse:up': function(e) {
				if (e.target) {
					e.target.opacity = 1;
					self.canvas.renderAll();
				}
			},
			'object:moved': function(e) {
				e.target.opacity = 0.75;
			},
			'object:modified': function(e) {
				e.target.opacity = 1;
			}
		});
	}
	
	self.construct(configuration);
}