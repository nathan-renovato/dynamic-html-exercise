const countriesDiv = document.querySelector('.countries');
const searchInput = document.querySelector('.search');

searchInput.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' || event.target.value === '') {
        return;
    }

    const promiseAnswer = fetch('https://restcountries.com/v2/all');

    promiseAnswer.then(answer => {
        const promiseBody = answer.json();

        promiseBody.then(body => {
            body.forEach(item => {
                const countryDiv = document.createElement('div');
                countryDiv.classList.add('country');
                countryDiv.classList.add('none');
                if (item.name === event.target.value) {
                    countryDiv.classList.remove('none');
                };

                const countryInformation = document.createElement('div');
                countryInformation.classList.add('country-information');

                const countryName = document.createElement('h2');
                countryName.textContent = `País: ${item.name}`;

                const regionCountry = document.createElement('span');
                regionCountry.textContent = `Região: ${item.region}`;

                const capitalCountry = document.createElement('span');
                capitalCountry.textContent = `Capital: ${item.capital}`;

                const countryPopulation = document.createElement('p');
                countryPopulation.textContent = `População: ${item.population}`;

                const countryFlag = document.createElement('div');

                const flagImage = document.createElement('img');
                flagImage.src = item.flag;
                flagImage.alt = `Bandeira ${item.name}`;

                countryInformation.append(countryName, regionCountry, capitalCountry, countryPopulation);
                countryFlag.append(flagImage);
                countryDiv.append(countryInformation, countryFlag);
                countriesDiv.append(countryDiv);

                searchInput.addEventListener('click', function () {
                    countryDiv.classList.add('none');
                    searchInput.value = '';
                });
            });
        });
    });
});

