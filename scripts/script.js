const recipes = document.querySelectorAll(".card--recipes");

console.log(recipes);

recipes.forEach((recipe) => {
    recipe.addEventListener('click', function() {
        console.log('Klik funguje');
    });
});


const response = await fetch("/data/menu.json")
const menus = await response.json()

menus.forEach(menu => {
    document.getElementsByClassName("breakfast")[menu.day_in_week - 1].textContent = menu.breakfast.name;
    document.getElementsByClassName("snack")[menu.day_in_week - 1].textContent = menu.snack.name;
    document.getElementsByClassName("lunch")[menu.day_in_week - 1].textContent = menu.lunch.name;
    document.getElementsByClassName("dinner")[menu.day_in_week - 1].textContent = menu.dinner.name;
})
