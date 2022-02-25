// Show All Foods
window.addEventListener('load', () => {
    loadAPI();
});

// Display PreLoader
const displayLoader = () => {
    foodContainer.innerHTML = `
    <div class="d-flex w-100 justify-content-center">
        <div class="spinner-grow text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;
}

// Load API
const loadAPI = async (foodName = '') => {
    displayLoader();
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    const response = await fetch(url);
    const resData = await response.json();

    if (response.ok) {
        displayFood(resData);
    } else {
        displayErr('Something went wrong!');
        foodContainer.innerHTML = ``;
    }
}

// Display Food
const foodContainer = document.getElementById('food-container');
const displayFood = foodData => {
    // console.log(foodData.meals);
    const foods = foodData.meals;
    foodContainer.innerHTML = ``;
    if (foods !== null) {
        foods.map((food) => {
            const { strMealThumb, strMeal, strInstructions, strSource } = food;

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card">
                    <a href="${strSource}" target="_blank">
                        <img src="${strMealThumb}" class="card-img-top" alt="${strMeal}">
                    </a>
                    <div class="card-body">
                        <h5 onclick="openSource('${strSource}')" class="card-title">${strMeal}</h5>
                        <p class="card-text">${strInstructions.slice(0, 140)}...</p>
                    </div>
                </div>
            `;
            foodContainer.appendChild(div);
        });
    } else {
        displayErr('Result Not Found!');
        foodContainer.innerHTML = `
        <div class="text-center w-100">
            <h4 class="text-center text-muted w-100">Nothing Found! Try again :)</h4>
            <button class="btn" onclick="loadAPI()">Most Popular Food</button>
        </div>
        `;
    }
}

// Search Food Function
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchInput = searchField.value;

    if (searchInput !== null) {
        if (searchInput.length > 2 && isNaN(searchInput)) {
            loadAPI(searchInput);
        } else {
            displayErr('Enter Valid Food Name!');
        }
    }
    searchField.value = '';
}

// Display Error Function
const displayErr = (msg) => {
    const errMsg = document.getElementById('error-msg');
    errMsg.innerText = msg;
    errMsg.classList.add('show');

    setTimeout(() => {
        errMsg.classList.remove('show');
    }, 3000);
}

// Open Source Link (onclick)
const openSource = url => window.location = url;