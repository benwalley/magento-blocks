
var blockData = [
	{
		name: 'page.wrapper',
		class: 'page-wrapper',
		notes: 'Main page wrapper',
		image: ['https://www.belightsoft.com/products/imagetricks/img/core-image-filters@2x.jpg', 'https://www.belightsoft.com/products/imagetricks/img/core-image-filters@2x.jpg'],
		block: false,
		container: true,
		parent: 'body',
		children: ['main.content', 'nav.main']
	},
	{
		name: 'page.wrapper',
		class: 'page-wrapper',
		notes: 'Main page wrapper',
		image: 'https://wow.olympus.eu/webfile/img/1632/oly_testwow_stage.jpg?x=1024',
		block: true,
		container: false,
		parent: 'body',
		children: ['main.content', 'nav.main']
	}
]
var searchClass = true;
var searchName = true;

function pageInit() {
	getData()
	initListeners();
}

function updateResults(query) {
	var matches = getSearchMatches(query);
	$(".search-results").html("");

	for(var i = 0; i < matches.length; i++) {
		var block = createBlock(matches[i])
		$(".search-results").append(block);
		// add click listener
		block.find(".see-additional").on("click", function() {
			$(this).parent().toggleClass("active");

			if($(this).parent().hasClass("active")) {
				$(this).text("Hide Additional Info")
			} else {
				$(this).text("See Additional Info")
			}
		})
	}
}

function initListeners() {
	$(".submit").on("click", function() {
		updateResults($(".search-input").val());
		$(".search-input").val("");
	})	

	document.querySelector('.search-input').addEventListener('keyup', function (e) {
	      updateResults($(".search-input").val());
	});

	document.querySelector('.search-input').addEventListener('keypress', function (e) {
	    var key = e.which || e.keyCode;
	    if (key === 13) { // 13 is enter
	      // code for enter
	      updateResults($(".search-input").val());
		$(".search-input").val("");
	    }
	});

	$("window").on("keypress", function(e) {
		var key = e.which || e.keyCode;
	    if (key === 13) { // 13 is enter
	      // code for enter
	      updateResults($(".search-input").val());
		$(".search-input").val("");
	    }
	})

	$(".search-options #css") .on("change", function(e) {
		var isChecked = $(".search-options #css").is(':checked');
		if(isChecked) {
			searchClass = true;
		} else {
			searchClass = false;
		}
	})

	$(".search-options #name") .on("change", function(e) {
		var isChecked = $(".search-options #name").is(':checked');
		if(isChecked) {
			searchName = true;
		} else {
			searchName = false;
		}
	})
}

function createBlock(data) {
	// Get Css class if set
	if(data.class) {
		var cssClass = "<div class='css-class'>CSS Class: " + data.class + "</div>";
	}else {
		var cssClass = "";
	}
	// Get is block or Container
	if(data.block) {
		var type = "block";
		var htmlType = "<div class='type'>Block</div>"
	} else if (data.container) {
		var type = "container";
		var htmlType = "<div class='type'>Container</div>"
	} else {
		var type = "unknown";
		var htmlType = ""
	}
	// get notes if they exits 
	if(data.notes) {
		var notes ="<div class='notes'>Notes: " + data.notes +"</div>";
	} else {
		var notes = "";
	}
	// get first image if it exits 
	if(data.images) {
		var imageUrl = '';
		if(Array.isArray(data.images)) {
			imageUrl = data.images[0];
		} else {
			imageUrl = data.images
		}
		var image ="<img src='" + imageUrl+"'/>";
	} else {
		var image = "";
	}

	// Get Parent if it exists
	if(data.parent) {
		var parent = "<div class='parent'>Parent: " + data.parent + "</div>";
	} else {
		var parent = "";
	}

	// get other images if they exist
	if(Array.isArray(data.images) && data.images.length > 1) {
		var imageHtml = ""
		for (var i = 1; i < data.images.length; i++) {
			imageHtml += "<img src='" + data.images[i] + "'/>"
		}
		additionalImages = "<div class='additional-images'>" + imageHtml + "</div>";
	} else {
		additionalImages = "";
	}

	// Get list of children
	if(data.children) {
		var htmlChildren = "";
		for (var i = 0; i < data.children.length; i++) {
			htmlChildren += "<li>" + data.children[i] + "</li>"
		}
		var children = 
		"<div class='children'>Children: "
			+ "<ul class='children-list'>"
				+ htmlChildren
			+ "</ul>"
		+ "</div>"
	}

	var additional = "<div class='additional-info'>"
		+ "<div class='additional-left'>"
			+ notes
			+ parent
			+ children
		+ "</div>"
		+ additionalImages
	+ "</div>"

	var block = $(
		"<div class='search-result " + type + "'>"
			+ "<div class='name'>" + data.name + "</div>"
			+ "<div class='left-content'>"
			+ htmlType
			+ cssClass
			+ "</div>"
			+ image
			+ additional
			+ "<p class='see-additional'>See Additional Info</p>" +
		"</div>"
	);

	return block
		
}

function getSearchMatches(query) {
	var matches = [];
	for (var i = 0; i < blockData.length; i++) {
		if(searchClass) {
			// if query is in the class name
			if(blockData[i].class.indexOf(query) != -1) {
				matches.push(blockData[i])
			}
		} else if(searchName) {
			// if query is in the block name
			if(blockData[i].name.indexOf(query) != -1) {
				matches.push(blockData[i])
			}
		}
	}
	return matches;
}
pageInit();


function getData() {
	var data = $.get("https://sheets.googleapis.com/v4/spreadsheets/1-GWSOMv-H1H_rMl6I2DtKkWzmRDBnVbwPa9fypk6Y_I/values/Sheet1!A1:H?key=AIzaSyC8B71P9jmsQuzrL4RSbKjZU4U9D7UPX_M")
	.done(function(data) {
		blockData = mapData(data.values);
	})
	console.log(data);
}

function mapData(data) {
	var names = data[0];
	var shorterData = data.slice(1,);
	var returnData = [];
	// on each of the arrays
	shorterData.map(function(x) {
		var newData = {};
		for(var i = 0; i < names.length; i++) {
			newData[names[i]] = x[i];
		}
		returnData.push(newData);
	})

	returnData = cleanData(returnData);
	return(returnData)
}

function cleanData(data) {
	for (var i = 0; i < data.length; i++) {
		if(data[i].images) {
			var images = data[i].images;
			// remove the brackets
			images = images.slice(1,-1);
			images = images.split(",");
			for (var j = 0; j < images.length; j++) {
				images[j] = images[j].split("'").join('')
			}
			data[i].images = images;
		}

		if(data[i].children) {
			var children = data[i].children;
			// remove the brackets
			children = children.slice(1,-1);
			children = children.split(",");
			for (var j = 0; j < children.length; j++) {
				children[j] = children[j].split("'").join('')
			}
			data[i].children = children;
		}
	}

	return data;
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}
