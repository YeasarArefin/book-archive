const search = (event) => {

    event.preventDefault();

    const inputField = document.getElementById('search-field');
    const inputFieldValue = inputField.value;
    const url = `https://openlibrary.org/search.json?q=${inputFieldValue}`;
    const spinner = document.getElementById('loading');
    const error = document.getElementById('error');
    const foundDiv = document.getElementById('result-found');
    const resultDiv = document.getElementById('results');

    inputField.value = '';
    error.innerHTML = '';
    foundDiv.innerHTML = '';
    resultDiv.innerHTML = '';

    fetch(url)
        .then(respons => respons.json())
        .then(data => displayData(data));

    spinner.style.display = 'block';

};

const displayData = books => {

    const bookDocs = books.docs;
    const resultDiv = document.getElementById('results');
    const spinner = document.getElementById('loading');
    const foundDiv = document.getElementById('result-found');
    const error = document.getElementById('error');

    resultDiv.innerHTML = '';
    error.innerHTML = '';

    const p = document.createElement('p');
    p.innerHTML = `<p class="text-center text-warning fs-4 fw-bolder mb-2">${books.numFound} Results Found</p>`;
    foundDiv.appendChild(p);

    if (books.numFound === 0) {

        foundDiv.innerHTML = '';
        spinner.style.display = 'none';

        const p = document.createElement('p');
        p.innerHTML = `<p class="text-center text-danger fs-2 fw-bolder">Please Enter A Valid Book Name</p>`;
        foundDiv.appendChild(p);

    }
    else {

        bookDocs.forEach(book => {

            error.innerHTML = '';

            let img;

            if (book.cover_i === undefined) {

                img = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFjEKcbXDrazxVKhWU5x9Mk1ISG0ZfP_3OAQp_tskiq7l7w7BrYVW3qOqGxZGSHhRBjDY&usqp=CAU`;

            } else {

                img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

            }

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card h-100 mx-auto" style="width: 18rem;">

                <img src="${img}" class="card-img-top img-fluid">

                <div class="card-body">

                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">Publisher : ${book.publisher}</p>
                    <p class="card-text">Author : ${book.author_name}</p>
                    <p class="card-text">First Publish Year : In ${book.first_publish_year}</p>
                    <button class="btn btn-success">Buy Here</button>
                </div>

            </div>`;
            div.classList.add('col');

            resultDiv.appendChild(div);

            spinner.style.display = 'none';

        });

    }

};