
const responseRecipes = await fetch("/data/recipes.json")
const recipes = await responseRecipes.json()

recipes.forEach(recipe => {
   createCard(recipe);
  
})

function createCard (recipe) {
    const cardSection = document.querySelector('.section__recipes');

    const cardDiv = createElement('div', 'card', 'card--recipes')
    const imageDiv = createElement('div', 'card__img')

    const imageElement = createElement('img', 'card__image')
    imageElement.src = recipe.photo_url;
    imageElement.alt = recipe.title
    imageDiv.appendChild(imageElement);
    cardDiv.appendChild(imageDiv)

    const titleElement = createElement('h1','card__title')
    titleElement.textContent = recipe.title

    const textDiv = createElement('div','card__text', 'card__text--recipes');

    const subtitleIngredients = createElement('p','card__subtitle', 'card__subtitle--ingredients');
    subtitleIngredients.textContent = 'Suroviny:';
    const descriptionIngredients = createElement('p','card__description', 'card__description--recipes','card__description--ingredients');
    descriptionIngredients.textContent = recipe.ingredients.map(ingredient => ingredient.nazev).join(", ");
    const subtitleWorkflow = createElement('p','card__subtitle');
    subtitleWorkflow.textContent = 'Postup:';
    const descriptionWorkflow = createElement('p','card__description', 'card__description--recipes', 'card__description--workflow');
    descriptionWorkflow.textContent = recipe.workflow;

    textDiv.appendChild(subtitleIngredients);
    textDiv.appendChild(descriptionIngredients);
    textDiv.appendChild(subtitleWorkflow);
    textDiv.appendChild(descriptionWorkflow);
    
    cardDiv.appendChild(titleElement)
    cardDiv.appendChild(textDiv);

    textDiv.style.display = 'none';

    cardSection.appendChild(cardDiv);
}


function createElement (elementType, ...classes) {
    const element = document.createElement(elementType);
    element.classList.add(...classes);
    return element
}

const recipesCards = document.querySelectorAll(".card--recipes");

recipesCards.forEach((recipe) => {
    recipe.addEventListener('click', function() {
        const cardDivEl = this; 
        const textDivEl = cardDivEl.querySelector('.card__text');

        createActiveCard(cardDivEl, textDivEl);
        
    });
});

function createActiveCard (cardDivEl, textDivEl) {

    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'block';

    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
      });

    cardDivEl.classList.add('card--active');
    textDivEl.style.display = 'block';

    // // Výška a šířka viewportu
     const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
     const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // // Výška a šířka aktivní karty
     const cardWidth = cardDivEl.offsetWidth;
     const cardHeight = cardDivEl.offsetHeight;

     const leftPosition = (viewportWidth - cardWidth) / 2;
     const topPosition = (viewportHeight - cardHeight) / 2;
    
     cardDivEl.style.position = 'fixed';
     cardDivEl.style.left = leftPosition + 'px';
     cardDivEl.style.top = topPosition + 'px';
    
}

function closeActiveCard () {
    const activeCard = document.querySelector('.card--active');

    if (activeCard) {
        const textDiv = activeCard.querySelector('.card__text');
        const ff = activeCard.querySelector('.card__img');

        textDiv.style.display = 'none';
        activeCard.classList.remove('card--active');

        activeCard.style.position = '';
        activeCard.style.removeProperty('left') 
        activeCard.style.removeProperty('top') 
    }

}

//zavření aktivní karty kliknutím na tmavé pozadí - overlay
const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', function () {
    closeActiveCard();
    overlay.style.display = 'none';
    overlay.style.opacity = '0'
});
