# CodersCamp 2020 - Projekt końcowy REST API
## **PikaBook** - Gotta read them all!
___


**Mangos Team** presents a system for books exchange. 

Where users can finally make their reader's dreams come true. All of us, the readers, are struggling with the same problem - after some time our bookshelves are full of volumes, series of books we've already read. As there are books we want to keep for life, there are some that were meant to be read only once (We feel sorry for them too). PikaBook can give them a second life! Our API allows you to find other people that are willing to adopt your unneeded books in exchange for readings they offers.

## Used technologies
- Node.js / Express
- REST API
- JWT validation
- NoSQL MongoDB and mongoose
- authorization and authentication with Json Web Token
- jest

## Our team 
* [Aleksandra Cypko](https://github.com/AleksandraCyp)
* [Agata Ludwiczyńska](https://github.com/AgataLudwiczynska)
* [Daria Dziubałtowska](https://github.com/daria305) (Tech Lead)
* [Małgorzata Dziewit](https://github.com/memeraki) (Develepment Manager)
* [Mariusz Smarż](https://github.com/mariusz-sm) (Business Owner)

Mentor: [Łukasz Dutka](https://github.com/lukaszdutka)
___
## How to run it
**Local set up**
1. Clone the repo
2. `npm install`
5. update `src/pre-start/env/developement.env` file with your Mongo database url `DATABASE_URL=` 
6. `npm start:dev`

### Registration
To use most of API functionalities, you need to make an account and authorize yourself.

1. Register with `POST /api/users` and provide
```    
    {
        "password":
        "email":
        "name":
        "location":
    }
```
2. Log in using  `POST /api/auth` with
```
    {
        "password":
        "email":
    }
```
---
## API functionalities
 - create an accaunt and log in to the system
 - add and remove books to/from their collection
 - filter books by users, location or title
 - user can initiate exchange with other user, propose its own books for other user's titles by creating a basket
 - possible to change basket status to track the book exchange
 - users can communicate over messages to agree on a details of the exchange
 - pokes - interaction between users, to let others know you are interested in one of their books

## Books

Get the full list of all books, filter by `location`, `name` of the book

    GET /api/books
    GET /api/books?name=book&location=city

Get a book by id

    GET /api/books/:id

Add book

    POST /api/books

Update one of actually logged in user books

    PUT /api/books/:id

Delete book of actually logged in user

    DELETE /api/books/:id

## User

Get the list of all users

    GET /api/users

Get a user by id

    GET /api/users/:id/

Get user's books by id

    GET /api/users/:id/books

## Sending messages between users

Send a new messaage

    POST /api/conversations

Update a message

    PUT /api/conversations

## Basket for books exchange
Available basket's status codes: `'pending', 'accepted', 'rejected', 'cancelled', 'offered','failedByRequestor', 'failedByTarget', 'success'`

Create a basket

    POST /api/baskets

Get a basket by id

    GET /api/baskets/:id
    
Update a basket

    PUT /api/baskets/:id

## Pokes

Poke a user

    POST /api/pokes
 
 Update a poke
 
    POST /api/pokes/:id

## Logged user specific actions

Get a currently logged user

    GET /api/me/

Get all books of the currently logged user

    GET /api/me/books

Get all baskets of the currently logged user, possible to filter by `status`

    GET /api/me/baskets
    GET /api/me/baskets=offered

Get all conversations of the currently logged user

    GET /api/me/conversations

Get a conversation with a specific user
    
    GET /api/me/conversations/:id
    
Get all pokes of the currently logged user

    GET /api/me/pokes
    
Get a poke by its ID 
    
    GET /api/me/pokes/:id

Get all baskets of currently logged user
    
    GET /api/me/baskets

