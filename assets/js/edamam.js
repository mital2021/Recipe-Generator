$('button').on('click', function () {
    var userInput = $('input').val();

    fetch("https://api.edamam.com/api/recipes/v2?type=public&q=desserts&app_id=f2f08026&app_key=1c35f8d0041b4d0aee2d8ff722c57ff4&dishType=Desserts"
    )
        //conole log request
        //console.log(response.json();

        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response)
            for (var i = 0; i < 4; i++) {
                index = i;

                var displayMealId = $('#display-meal');
                var imageDiv = $('<div>');
                var imageTag = $('<img>');
                var foodTitle = $('<div>');
                var titleURL = response.hits[index].recipe.label;
                var foodImageURL = response.hits[index].recipe.image;
                foodTitle.text(titleURL);
                imageTag.attr('src', foodImageURL)
                foodTitle.appendTo(imageDiv);
                imageTag.appendTo(imageDiv);
                imageDiv.appendTo(displayMealId)

                /*getRecipe();   */
            }
        })
})