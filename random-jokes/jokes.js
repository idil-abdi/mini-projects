const jokesContainer = document.getElementById('jokes')
const btn = document.querySelector('.jokes-btn');

const url = 'https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8ecef55232mshfd797077303d2b8p1ea2b2jsn77d2ba0e86e5',
		'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com'
	}
};

let jokes = async () => {
    try {
    const response = await fetch(url, options);
    const result = await response.json();
    jokesContainer.textContent = `${result[0].joke}`;
    } catch (error) {
        console.error(error);
    }
}

btn.addEventListener('click', jokes);
jokes();

