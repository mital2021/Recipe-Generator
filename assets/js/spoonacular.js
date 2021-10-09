var getMealImgAndTitle = function (userInput) {
    fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=0e8c7a5527c94d44a604939ba3869efe&cuisine=" + userInput
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            for (var i = 0; i < 4; i++) {
                index = i;
                //Div that contains image and title of specific cuisine
                var displayMealId = $('.meal-div');
                var imageDiv = $('<div>');
                var imageTag = $('<img>');
                var foodTitle = $('<div>');

                //Recipe id
                var foodIdDiv = $('<div>');

                //Selects title,image, and id from array of objects(response)
                var title = response.results[index].title;
                var foodImageURL = response.results[index].image;
                var foodId = response.results[index].id;

                //Adds text and attributes for each element
                foodIdDiv.attr('id', foodId);
                foodTitle.text(title);
                imageTag.attr('src', foodImageURL)

                //Append to 'display-meal' div
                foodTitle.appendTo(imageDiv);
                imageTag.appendTo(imageDiv);
                foodIdDiv.appendTo(imageDiv);
                imageDiv.appendTo(displayMealId);

                getRecipe(foodId);
            }

        })
}

var getRecipe = function (foodId) {
    fetch(
        "https://api.spoonacular.com/recipes/" + foodId + "/ingredientWidget.json?apiKey=0e8c7a5527c94d44a604939ba3869efe"
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            //Array that contains the ingredients of the specific cuisine
            var ingredientArray = response.ingredients;

            for (var i = 0; i < ingredientArray.length; i++) {
                index = i;
                var ingredientName = response.ingredients[index].name;
                var ingredientAmount = response.ingredients[index].amount.us.value;
                var ingredientUnit = response.ingredients[index].amount.us.unit;

                var recipePara = $('<p>');
                recipePara.text(ingredientName + ': ' + ingredientAmount + ' ' + ingredientUnit);

                recipePara.appendTo($('#' + foodId));
            }

        })

}