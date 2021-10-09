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