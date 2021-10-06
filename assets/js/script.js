$('button').on('click', function () {
    var userInput = $('input').val();

    fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=0e8c7a5527c94d44a604939ba3869efe&cuisine=" + userInput
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            for (var i = 0; i < 5; i++) {
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
                imageDiv.appendTo(displayMealId);

                var foodId = response.results[index].id;
                getRecipe(foodId);
            }
        })
})

var getRecipe = function (foodId) {

    fetch(
        "https://api.spoonacular.com/recipes/" + foodId + "/ingredientWidget.json?apiKey=0e8c7a5527c94d44a604939ba3869efe"
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var ingredientArray = response.ingredients;
            //console.log(ingredientArray);
            for (var i = 0; i < 3; i++) {
                index = i;

                var ingredientName = response.ingredients[index].name;
                console.log(ingredientName);
                var ingredientAmount = response.ingredients[index].amount.us.value;
                console.log(ingredientAmount);

                var recipeDiv = $('#recipe');
                var recipePara = $('<p>');
                recipePara.text(ingredientName + ': ' + ingredientAmount);
                recipePara.appendTo(recipeDiv);
            }
        })
}