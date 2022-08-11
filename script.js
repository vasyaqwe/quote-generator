const randomBtn = document.querySelector('.btn-random');
const main = document.querySelector('main');

const getRandQuote = async () => {
  const randPage = Math.floor(Math.random() * 7268);

  const res = await fetch(`https://quote-garden.herokuapp.com/api/v3/quotes?page=${randPage}`);
  const obj = await res.json();
  const data = obj.data;

  main.innerHTML = `
    <p class="quote-text">
     "${data[0].quoteText}"
    </p>
    <button class="btn btn-author">
      <div>
        <strong class="author-text">${data[0].quoteAuthor}</strong>
        <small class="quote-genre">${data[0].quoteGenre}</small>
      </div>
      <i class="fa-solid fa-arrow-right-long"></i>
    </button>
  `;
  const authorBtn = document.querySelector('.btn-author');

  const getAuthorsQuotes = async () => {
    const authorTextEl = document.querySelector('.author-text');
    const res = await fetch(`https://quote-garden.herokuapp.com/api/v3/quotes?author=${authorTextEl.innerText}`);
    const obj = await res.json();
    const data = obj.data;
    main.innerHTML = `
    <h1 class="author-text">
      ${data[0].quoteAuthor}
    </h1>
    `
    for (let quote of data) {
      const newQuote = document.createElement('p');
      newQuote.classList.add('quote-text');
      newQuote.innerText = quote.quoteText;
      main.append(newQuote);
    }
  };
  authorBtn.addEventListener('click', getAuthorsQuotes);
}




randomBtn.addEventListener('click', getRandQuote);