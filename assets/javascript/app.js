//Declaring initial Topics array

var topics = [
	"Devil Wears Prada",
	"Mean Girls",
	"Pitch Perfect",
	"Bridesmaids",
	"Frozen",
	]

//Function for actually displaying the resulted giphys

function displayGiphys() {
	var movie = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC";

	//Ajax call for specific button
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		var div = $("<div>");
		div.append("<p>" + response.data.rating + "</p>");
		div.append('<img src="' + response.data.images.fixed_height_still + '">');
		$("#buttons-view").append(div);
		console.log(response);
	});
}


//Function for displaying the buttons on the page

function renderButtons() {
	$("#buttons-view").empty();
	$.each(topics, function(x, y) {
		var a = $("<button>");
		a.addClass("movie");
		a.attr("data-name", y);
		a.text(y);
		$("#buttons-view").append(a);
	});
};

//Event listener for when add button is clicked, new button is created and all buttons are rendered over again

$("#add-button").on("click", function(event) {
	event.preventDefault();
	var newButton = $("#button-input").val().trim();
	topics.push(newButton);
	renderButtons();
})

//Calling the renderButtons function to display the initial buttons from the array

renderButtons();