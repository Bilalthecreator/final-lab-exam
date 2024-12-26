# final-lab-exam
Library management system backend api
In our project, we have developed a Library Management System that allows managing authors, books, and borrowers. Here's a quick breakdown:

Models:
Author Model:
Stores information about authors, including name, email, phone, and the books they've written (with a limit of 5 books per author).
Book Model:
Stores information about books, including title, ISBN, the author (linked via the author ID), and available copies.
Borrower Model:
Stores borrower details, such as name, membership status (standard or premium), and borrowed books (linked by book IDs).
Controllers:
Author Controller:

Handles CRUD operations for authors (creating, reading, updating, deleting authors).
Book Controller:

Handles CRUD operations for books (creating, reading, updating, deleting books).
Books are linked to authors, and the author’s list of books is updated automatically.
Borrower Controller:

Manages borrowers, allowing adding new borrowers and updating borrowed books.
Borrowing a book decreases its available copies.
Routes:
Author Routes: Define routes to manage authors.
Book Routes: Define routes for managing books.
Borrower Routes: Define routes for managing borrowers.
Working:
When an author is created, we link their books with a limit of 5.
When a book is added, it’s linked to an author and updates the author’s book list.
Borrowers can borrow books, and available copies of books are updated in real time.
Challenges:
We implemented a validation to ensure authors can't exceed 5 books.
Ensured that borrowed books have their available copies updated automatically when a borrower adds books.
This system works by ensuring seamless management of authors, books, and borrowers, with proper data validation and relationships between entities.


to test routes use Library Management API testing postman.postman_collection.json file for postman