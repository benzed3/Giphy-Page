var superheroes = ["Batman", "Spider-Man", "Superman"];

function renderButtons() {

    $(".header").empty();

    for (var i = 0; i < superheroes.length; i++) {

        var newButton = $("<button>");
        newButton.addClass("hero");
        newButton.attr("data-name", superheroes[i]);
        newButton.text(superheroes[i]);
        $(".header").append(newButton);
    }
}

$("#submit").on("click", function (event) {

    event.preventDefault();

    var newHero = $("#hero-input").val().trim();

    superheroes.push(newHero);

    renderButtons();

});


renderButtons();

function displayGifs() {

    $(".hero").on("click", function () {

        var hero = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            hero + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var heroDiv = $("<div>");

                    var p = $("<p>").text("Rating: " + results[i].rating);

                    var heroImage = $("<img>");

                    heroImage.attr("src", results[i].images.fixed_height_still.url);
                    heroImage.attr("data-still", results[i].images.fixed_height_still.url);
                    heroImage.attr("data-animate", results[i].images.fixed_height.url);
                    heroImage.attr("data-state", "still");
                    heroImage.addClass("gif");

                    heroDiv.append(p);
                    heroDiv.append(heroImage);

                    $("#images").prepend(heroDiv);
                }

                $(".gif").on("click", function () {

                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }

                });
            });

    });
};

$(document).on("click", ".hero", displayGifs);

