# woodrealm App API Doc

## List available endpoint

- POST /register
- POST /login
- GET /product
- GET /product/:id
- GET /myproducts
- POST /myproducts/:id
- DELETE /myproducts/:id
- POST /generate-midtrans
- GET /generatepdf

### POST /register

this endpoint can add new user

- Request Body

```js
{
    "email":<String>
    "password":<String>
}
```

Response 201-Created

- Response Body

```js
{
    "id":<Integer>
    "email":<String>
}
```

Response 400-Bad Request

```js
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

### POST /login

this endpoint can get you login

- request Body

```js
{
    "email":<String>
    "password":<String>
}
```

Response 200-OK

- Response Body

```js
{
    "access_token": <String>
    "email": <String>
}
```

Response 400-Bad Request

```js
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response 401-Unauthorized

```js
{
  "message": "Invalid email/password"
}
```

### GET /product

this is end point to get all of product

Response 200 - OK

- Response Body

```js
{
    "currentPage": 1,
    "pageSize": 12,
    "totalPages": 2,
    "totalCount": 20,
    "data": [
        {
            "id": 1,
            "name": "Alex",
            "description": "meja, abu-abu toska, 132x58 cm",
            "price": 126046,
            "stock": 925,
            "status": "Active",
            "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/776/0977665_PE813728_S3.webp",
            "createdAt": "2023-08-30T10:48:08.614Z",
            "updatedAt": "2023-08-30T10:48:08.614Z"
        },
    ]
}
```

### GET /product/:id

this is end point to get product by the id

Request :

- params

```js
{
    "id": <integer>
}
```

Response 200 - OK

-Response Body

```js
{
    "id": 2,
    "name": "VEBJÖRN",
    "description": "Diagnostic agents",
    "price": 191210,
    "stock": 227,
    "status": "Active",
    "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/746/1174618_PE894559_S3.webp",
    "createdAt": "2023-08-30T10:48:08.614Z",
    "updatedAt": "2023-08-30T10:48:08.614Z"
}
```

Response 404-Not found

```js
{
    "message": "Product not found"
}
```

### GET /myproducts

this is end point to get all of customer product

- headers

```js
{
  "access_token": "string"
}
```

Response 200 - OK

- Response Body

```js
[
    {
        "id": 7,
        "CustomerId": 1,
        "ProductId": 4,
        "createdAt": "2023-08-30T11:52:48.211Z",
        "updatedAt": "2023-08-30T11:52:48.211Z",
        "Product": {
            "id": 4,
            "name": "LOMMARP",
            "description": "meja, krem muda, 90x54 cm",
            "price": 321140,
            "stock": 106,
            "status": "Active",
            "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/709/0770955_PE755649_S3.webp",
            "createdAt": "2023-08-30T10:48:08.614Z",
            "updatedAt": "2023-08-30T10:48:08.614Z"
        }
    },
]
```

### POST /myproducts/:id

this is end point to post  customer product

Request :

- params

```js
{
    "id": <integer>
}
```

- headers

```js
{
  "access_token": "string"
}
```

Response 200 - OK

- Response Body

```js
[
    {
        "id": 7,
        "CustomerId": 1,
        "ProductId": 4,
        "createdAt": "2023-08-30T11:52:48.211Z",
        "updatedAt": "2023-08-30T11:52:48.211Z",
        "Product": {
            "id": 4,
            "name": "LOMMARP",
            "description": "meja, krem muda, 90x54 cm",
            "price": 321140,
            "stock": 106,
            "status": "Active",
            "imgUrl": "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/709/0770955_PE755649_S3.webp",
            "createdAt": "2023-08-30T10:48:08.614Z",
            "updatedAt": "2023-08-30T10:48:08.614Z"
        }
    },
]
```

### POST /generate-midtrans

API documentation for the Midtrans handling endpoint.

- headers

```js
{
  "access_token": "string"
}
```

Response 201-OK

-Response Body

```js
{
    "https://app.sandbox.midtrans.com/snap/v1/redirect/..."
}
```

### GET /generatepdf

API documentation for the PDF generation endpoint.

- headers

```js
{
  "access_token": "string"
}
```

Response 201-OK

-Response Body

```js
{
     "message":"successfully generate pdf"
}
```

### DELETE /myproducts/:id

this endpoint can delete customerproduct by id

- Request Params

```js
    {
        id: <Integer>
    }
```

- headers

```js
{
  "access_token": "string"
}
```

Response 200-OK

-Response Body

```js
{
    "message": 'success delete"
}
```

Response 403 - Forbidden

- Response Body

```js
{
    "message": 'Produt not found'
}
```

Response 401 - Unauthorized

- Response Body

```js
{
    "message": 'Unauthorized'
}
```

### Global Error

response 500 - Internal Server Error

```js
{
    "message": "Internal server error"
}
```

Response 401 - Unauthorized

```js
{
  "message": "Invalid token"
}
```
