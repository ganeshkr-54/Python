from fastapi import FastAPI, HTTPException, Path
from pydantic import BaseModel, Field

app = FastAPI()

class Books():
    id: id
    author: str
    title: str
    description: str
    rating: int

    def __init__(self, id, author,title,description, rating):
        self.id = id
        self.author = author
        self.title = title
        self.description = description
        self.rating = rating

class Book_request(BaseModel):
    id: int
    author: str = Field(min_length=3)
    title: str = Field(min_length=3)
    description: str = Field(min_length=5, max_length=100)
    rating: int = Field(gt=0, lt=6)

BOOKS = [
    Books(1,"Amitav Gosh", "The Glass Palace", "Three life journies", 5),
    Books(2,"Amitav Gosh", "sea of poppies", "a village story", 5),
   Books(3,"Amitav Gosh", "The shadow lines", "a lighting story", 4),
    Books(4,"R.K.Narayan", "Malgudi Days", "A collection of short stories", 5),
    Books(5,"C.Narayana reddy", "vasantarayalu", "Three life journies", 3),
    Books(6,"sadhguru", "death", "book on death", 4),
    Books(7,"ganesh", "title", "fictional stories", 2)
]

@app.get("/books")
async def get_books():
    return BOOKS

# Get book by rating

@app.get("/books/")
async def get_book_rating(rating: int):
    rating_books = []
    for book in BOOKS:
        if book.rating == rating:
            rating_books.append(book.title)
    return rating_books

# Get book by ID

@app.get("/books/{book_id}")
async def get_book_id(book_id: int = Path(gt=0)):
    for book in BOOKS:
        if book.id == book_id:
            return book 
    raise HTTPException (status_code=404, detail="Iteam not found")
        

@app.delete ("/books/{delete_book}")
async def delete_book(id: int):
    for i in range(len(BOOKS)):
        if BOOKS[i].id == id:
            BOOKS.pop[i]
            break


@app.post("/create-book")
async def create_book(book_request: Book_request):
    new_book = Books(**book_request.model_dump())
    BOOKS.append(set_book_id(new_book))

def set_book_id(book: Books):
    book.id = 1 if len(BOOKS)==0 else BOOKS[-1].id + 1
    # if len(BOOKS) > 0:
    #     book.id = BOOKS[-1].id + 1
    # else:
    #     book.id = 1
    return book

@app.put("/books/update_book")
async def update_book(book: Book_request):
    for i in range(len(BOOKS)):
        if BOOKS[i].id == book.id:
            BOOKS[i] = book


