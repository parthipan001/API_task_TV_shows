document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tv-show-form').addEventListener('submit', fetchTVShows);
});

function fetchTVShows(event) {
    event.preventDefault();
    const query = document.getElementById('query').value;
    const url = `https://api.tvmaze.com/search/shows?q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayTVShows(data);
        })
        .catch(error => {
            console.error('Error fetching TV show data:', error);
        });
}

function displayTVShows(shows) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    shows.forEach(showData => {
        const show = showData.show;
        const showCard = createCard(
            show.name,
            show.image ? show.image.medium : 'https://via.placeholder.com/210x295.png?text=No+Image',
            show.summary ? show.summary : 'No description available'
        );
        contentDiv.appendChild(showCard);
    });
}

function createCard(title, imageUrl, description) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    const cardImg = document.createElement('img');
    cardImg.className = 'card-img-top';
    cardImg.src = imageUrl;
    cardImg.alt = title;

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = title;

    const cardDescription = document.createElement('p');
    cardDescription.className = 'card-text';
    cardDescription.innerHTML = description;

    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardDescription);
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    return colDiv;
}