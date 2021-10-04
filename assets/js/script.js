$('button').on('click', function () {
    var userInput = $('input').val();

    fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=eb00d312a63a45e8bf30e87aca1b8514&cuisine=" + userInput
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            for (var i = 0; i < 10; i++) {
                index = i;

                var displayMealId = $('#display-meal');
                var imageDiv = $('<div>');
                var imageTag = $('<img>');
                var foodTitle = $('<div>');
                var titleURL = response.results[index].title;
                var foodImageURL = response.results[index].image;
                foodTitle.text(titleURL);
                imageTag.attr('src', foodImageURL)
                foodTitle.appendTo(imageDiv);
                imageTag.appendTo(imageDiv);
                imageDiv.appendTo(displayMealId)
            }
        })
})

