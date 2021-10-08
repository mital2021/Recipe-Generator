//Gets cuisine names from localstorage if they exist. If they don't a new empty array is created
var getMeal = JSON.parse(localStorage.getItem('savedMeals')) || [];

//Selects div in order create new button
var savedMealId = document.querySelector('#saved-meal');

//Click listener for search button
$('.search-button').on('click', function () {
    //Input provided by user
    var userInput = $('input').val();

    //Clears 'display-meal' whenever a new cuisne is typed into the search box
    $('#display-meal').empty();

    //Create and display saved meal buttons
    var newBtn = document.createElement('button');
    newBtn.style.margin = '14px 0px'
    newBtn.style.display = 'block';
    newBtn.style.borderRadius = '5px';
    newBtn.style.width = '-webkit-fill-available';
    newBtn.textContent = userInput;
    savedMealId.appendChild(newBtn);

    //Clears search input
    $('#input').val('');

    //Adds cuisine name to array
    getMeal.push(userInput);

    //Saves cuisine name to localStorage
    localStorage.setItem('savedMeals', JSON.stringify(getMeal));

    getMealImgAndTitle(userInput);
})

var getMealImgAndTitle = function (userInput) {
    fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=0e8c7a5527c94d44a604939ba3869efe&cuisine=" + userInput
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            for (var i = 0; i < 5; i++) {
                index = i;
                //Div that contains image and title of specific cuisine
                var displayMealId = $('#display-meal');
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

$(document).ready(function () {
    //Retrieves saved cuisines from array
    var savedMeals = JSON.parse(localStorage.getItem('savedMeals'));
    console.log(savedMeals);

    //Loads saved meal buttons when page loads
    for (var i = 0; i < savedMeals.length; i++) {
        var newBtn = document.createElement('button');
        newBtn.style.margin = '14px 0px'
        newBtn.style.display = 'block';
        newBtn.style.borderRadius = '5px';
        newBtn.style.width = '-webkit-fill-available';
        newBtn.textContent = savedMeals[i];

        //Clears current displayed image when saved button is clicked on
        $(newBtn).on('click', function () {
            var savedMealCuisine = $(this).text();
            $('#display-meal').empty();

            getMealImgAndTitle(savedMealCuisine);
            getRecipe(savedMealCuisine);
        })
        savedMealId.appendChild(newBtn);
    }
})