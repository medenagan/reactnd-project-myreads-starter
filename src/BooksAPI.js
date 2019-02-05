
const api = "https://reactnd-books-api.udacity.com";


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    "Accept": "application/json",
    "Authorization": token
};

export const get = (bookId) =>
    fetch(`${api}/books/${bookId}`, { headers })
        .then(res => res.json())
        .then(data => data.book);

export const getAll = () =>
    fetch(`${api}/books`, { headers })
        .then(res => res.json())
        .then(data => data.books);

export const update = (book, shelf) =>
    fetch(`${api}/books/${book.id}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ shelf })
    }).then(res => res.json());

export const search = (query) =>
    fetch(`${api}/search`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    }).then(res => res.json())
        .then(data => data.books);

/*
    a record looks like:
    {
      "title": "The Linux Command Line",
      "subtitle": "A Complete Introduction",
      "authors": [
        "William E. Shotts, Jr."
      ],
      "publisher": "No Starch Press",
      "publishedDate": "2012",
      "description": "You've experienced the shiny, ...",
      "industryIdentifiers": [
        {
          "type": "ISBN_13",
          "identifier": "9781593273897"
        },
        {
          "type": "ISBN_10",
          "identifier": "1593273894"
        }
      ],
      "readingModes": {
        "text": true,
        "image": false
      },
      "pageCount": 480,
      "printType": "BOOK",
      "categories": [
        "COMPUTERS"
      ],
      "averageRating": 4,
      "ratingsCount": 2,
      "maturityRating": "NOT_MATURE",
      "allowAnonLogging": true,
      "contentVersion": "1.2.2.0.preview.2",
      "panelizationSummary": {
        "containsEpubBubbles": false,
        "containsImageBubbles": false
      },
      "imageLinks": {
        "smallThumbnail": "http://books.google.com/...&source=gbs_api",
        "thumbnail": "http://books.google.com/books/...&source=gbs_api"
      },
      "language": "en",
      "previewLink": "http://books.google.com/...=gbs_api",
      "infoLink": "https://play.google.com/...&source=gbs_api",
      "canonicalVolumeLink": "https://market.android.com/details?id...",
      "id": "nggnmAEACAAJ",
      "shelf": "currentlyReading"
    }
  */
