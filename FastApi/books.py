from fastapi import Body,FastAPI

app = FastAPI()

books = [
    {"title": "title one", "author": "unknow", "genre":"science"},
    {"title": "tile two", "author": "Amitav Gosh", "genre":"fictional"},
    {"title": "tile three", "author": "Amitav Gosh", "genre":"fictional"},
    {"title": "tile four", "author": "Amitav Gosh", "genre":"fictional"}
]

@app.get("/books")
async def get_books():
    return books

@app.get("/books/author")
async def get_books_by_author(author: str):
    author_book_titles = []
    for book in books:
        if book.get("author").casefold() == author.casefold():
            # Append only the title, not the whole book dictionary
            author_book_titles.append(book.get("title"))
    return author_book_titles

@app.get("/books/filter")
async def get_auth_cat(category: str, author: str):
    books_list = []
    for book in books:
        if (
            book.get("author").casefold() == author.casefold()
            and book.get("genre").casefold() == category.casefold()
        ):
            books_list.append(book)
    return books_list

@app.get("/books/{book_title}")
async def read_book(book_title: str):
    for book in books:
        if book.get('title').casefold() == book_title.casefold():
            return book
        

@app.post("/books/create_book")
async def create_book(new_book=Body()):
    books.append(new_book)

@app.put("/books/update")
async def update_book(update=Body()):
    for i in range(len(books)): 
        if books[i].get("title").casefold() == update.get("title").casefold():
            books[i] = update

@app.delete("/books/delete_book/{title}")
async def delete_book(title: str):
    for i in range(len(books)):
        if books[i].get("title").casefold() == title.casefold():
            books.pop(i)
            break

