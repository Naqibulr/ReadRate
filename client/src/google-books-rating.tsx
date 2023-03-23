async function getBookRating(title: string): Promise<number> {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  // Get the first book from the search results
  let book;
  // Find the first book with a non-null rating
  for (let i = 0; i < data.items.length; i++) {
    const bookRating = data.items[i].volumeInfo.averageRating;
    if (bookRating !== undefined && bookRating !== null) {
      book = data.items[i];
      break;
    }
  }
  return book.volumeInfo.averageRating;
}

const API_KEY = 'AIzaSyD9tgJKrbFxo7v91e_vV0k6Oe0yeR9MPwc';

export default getBookRating;
