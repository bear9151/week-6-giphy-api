//Declaring initial Topics array

var topics = [
	"Devil Wears Prada",
	"Mean Girls",
	"Pitch Perfect",
	"Bridesmaids",
	"Frozen",
	"Anchorman",
	]

//Function for actually displaying the resulted giphys

function displayGiphys() {
	var movie = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

	//Empty Giphys-view div

	$("#giphys-view").empty();

	// Ajax call for specific button

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var results = response.data;
		for (var i = 0; i < results.length; i++) {
			var gifDiv = $("<div>")
				.addClass("well");
            
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            
            var image = $("<img>");
            image.attr("src", results[i].images.fixed_height_still.url)
            	.attr("alt", results[i].slug)
            	.data("still", results[i].images.fixed_height_still.url)
            	.data("animate", results[i].images.fixed_height.url)
            	.data("state", "still")
            	.addClass("gifff");

        	gifDiv.append(p).append(image).appendTo("#giphys-view");


            // $("#giphys-view")
            // 	.append(gifDiv)
            // 	.append(p)
            // 	.append(image);
		};
	});
};


//Function for displaying the buttons on the page

function renderButtons() {
	$("#buttons-view").empty();
	$.each(topics, function(x, y) {
		var a = $("<button>");
		a.addClass("movie-button");
		a.attr("data-name", y);
		a.text(y);
		$("#buttons-view").append(a);
	});
};

// Event listener for when add button is clicked, new button is created and all buttons are rendered over again

$("#add-button").on("click", function(event) {
	event.preventDefault();
	var newButton = $("#button-input").val().trim();
	topics.push(newButton);
	renderButtons();
})

// Adding click event listeners to all elements with a class of "movie"

$(document).on("click", ".movie-button", displayGiphys);


// Calling the renderButtons function to display the initial buttons from the array

renderButtons();