const responseMenu = await fetch("/data/menu.json")
const menus = await responseMenu.json()

menus.forEach(menu => {
    document.getElementsByClassName("breakfast")[menu.day_in_week - 1].textContent = menu.breakfast.name;
    document.getElementsByClassName("snack")[menu.day_in_week - 1].textContent = menu.snack.name;
    document.getElementsByClassName("lunch")[menu.day_in_week - 1].textContent = menu.lunch.name;
    document.getElementsByClassName("dinner")[menu.day_in_week - 1].textContent = menu.dinner.name;
})
