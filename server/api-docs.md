# Restaurant API Docs
# USER
## POST '/users/register'

### Description:
> Register new admin.

### request body:
```json
{
  "username": STRING,
  "email": STRING,
  "password": STRING,
  "phoneNumber": STRING,
  "address": STRING
}
```

### Response 201 - Created
```json
{
  "id": 1,
  "email": "test@mail.com"
}
```

### Response 400 - Bad Request
```json
  {
    "message": "Username already used!"
  }
  OR
  {
    "message": "Username required"
  }
  OR
  {
    "message": "Email already used!"
  }
  OR
  {
    "message": "Email required"
  }
  OR
  {
    "message": "Invalid email format"
  }
  OR
  {
    "message": "Password required"
  }
  OR
  {
    "message": "Password required"
  }
  OR
  {
    "message": "Role required"
  }
```
<br>

## POST '/users/login'
### Description
> Login as admin.

### request body:
```json
{
  "email": STRING,
  "password": STRING
}
```

### Response 200 - OK
```json
{
  "access_token": STRING
}
```

### Response 400 - Bad Request
```json
{
  "message": "email required"
}
OR
{
  "message": "password required"
}
```

### Response 401 - Unauthorized
```json    
{
  "message": "invalid email or password"
}
```
<br>

## GET '/users/username'
### Description
> Get username of signed in user.

### Request Header:
```json
{
  "access_token": STRING
}
```

### Response 200 - OK
```json
{
  "username": STRING
}
```

### Response 401 - Unauthorized
```json
{
  "message": "invalid token"
}
```
<br>

# CATEGORY
## GET '/categories/'
### Request Header:
```json
{
  "access_token": STRING
}
```
### Response:
```json
{
  "categories": [
      {
        "id": 1,
        "name": "Ayam Betutu",
        "createdAt": "2022-11-25T08:59:29.379Z",
        "updatedAt": "2022-11-25T08:59:29.379Z"
      },
      {
        "id": 2,
        "name": "Nasi Campur",
        "createdAt": "2022-11-25T08:59:29.379Z",
        "updatedAt": "2022-11-25T08:59:29.379Z"
      },
      ...
  ]
}
```
<br>

## POST '/categories/'
### Request Header:
```json
{
  "access_token": STRING
}
```

### Request Body:
```json
{
  "name": STRING
}
```

### Response 201 - Created
```json
{
  "message": "new category created"
}
```
<br>

## DELETE '/categories/:id'
### Request Header:
```json
{
  "access_token": STRING
}
```

### Response 200 - OK
```json
{
  "message": "category deleted succesfully"
}
```
<br>


# FOOD
## GET '/food/'
### Request Header:
```json
{
  "access_token": STRING
}
```

### Response 200 - OK
```json
{
  "food": [
    {
      "id": 1,
      "name": "Paket Nasi Ayam Betutu Goreng",
      "description": "Nasi putih, ayam betutu goreng, sate lilit, sambal matah, sambal terasi, plecing kangkung, kacang goreng",
      "price": 25500,
      "imgUrl": "https://cf.shopee.co.id/file/32cc5ab923632f7bf693172006f5c90e",
      "status": "Inactive",
      "User": {
        "id": 1,
        "email": "qwerty@mail.com"
      },
      "Category": {
        "id": 1,
        "name": "Ayam Betutu"
      },
      "canEdit": true,
      "canDelete": true
    },
    {
        "id": 2,
        "name": "Paket Nasi Ayam Betutu Kuah",
        "description": "Nasi putih, ayam betutu, sate lilit, sambal matah, plecing kangkung, kacang goreng ",
        "price": 20000,
        "imgUrl": "https://cdf.orami.co.id/unsafe/cdn-cas.orami.co.id/parenting/images/ayam-betutu.width-800.jpegquality-80.jpg",
        "status": "Active",
        "User": {
            "id": 1,
            "email": "test@mail.com"
        },
        "Category": {
            "id": 1,
            "name": "Ayam Betutu"
        },
        "canEdit": true,
        "canDelete": true
    },
    ...
  ]
}
```

<br>

## GET '/food/logs'
### Request Header:
```json
{
  "access_token": STRING
}
```

### Response 200 - OK
```json
{
  "logs": [
    {
      "productName": "Sambal Matah",
      "description": "product with id 8 updated",
      "updatedBy": "qwerty@mail.com",
      "updatedAt": "2022-11-26T05:50:17.335Z"
    },
    {
      "productName": "Sambal Matah",
      "description": "food with id 8 created",
      "updatedBy": "qwerty@mail.com",
      "updatedAt": "2022-11-26T05:49:10.122Z"
    },
    ...
  ]
}
```
<br>

## POST '/food/'
### Request Header:
```json
{
  "access_token": STRING
}
```

### Request Body:
```json
{
  "name": STRING,
  "description": STRING,
  "price": INTEGER,
  "imgUrl": STRING,
  "categoryId": INTEGER,
}
```

### Response 201 - Created
```json
{
  "food": {
    "status": "Active",
    "id": 9,
    "name": "Good food",
    "description": "Description goes here",
    "price": 5000,
    "imgUrl": "http://sample-image",
    "authorId": 2,
    "categoryId": 1,
    "updatedAt": "2022-11-26T14:44:57.648Z",
    "createdAt": "2022-11-26T14:44:57.648Z"
  }
}
```

### Response 400 - Bad Request
```json
{
  "message": "Name already used!",
}
OR
{
  "message": "Name required",
}
OR
{
  "message": "Description required",
}
OR
{
  "message": "Price required",
}
OR
{
  "message": "min price is 5000",
}
OR
{
  "message": "Image URL required",
}
OR
{
  "message": "Category required",
}
```

<br>

## GET '/food/:id'
### Request Header:
```json
{
  "access_token": STRING
}
```

### Response 200 - OK
```json
{
  "food": {
    "id": 4,
    "name": "Air mineral dingin",
    "description": "Air mineral dingin",
    "price": 5000,
    "imgUrl": "https://asset.kompas.com/crops/u8xYYCtGiP2WURmINF0Cggn9U2k=/137x112:937x645/750x500/data/photo/2020/03/04/5e5f688cb38f7.jpg",
    "User": {
      "id": 1,
      "email": "test@mail.com",
      "username": "Test"
    },
    "Category": {
      "id": 4,
      "name": "Hot Drinks"
    }
  }
}
```
<br>

## PUT '/food/:id'
### Description
> Update food data.

### Request Header:
```json
{
  "access_token": STRING
}
```

### Request Body:
```json
{
  "name": STRING,
  "description": STRING,
  "price": INTEGER,
  "imgUrl": STRING,
  "categoryId": INTEGER,
}
```

### Response 201 - Created
```json
{
  "food": {
    "status": "Active",
    "id": 9,
    "name": "Good food",
    "description": "Description goes here",
    "price": 5000,
    "imgUrl": "http://sample-image",
    "authorId": 2,
    "categoryId": 1,
    "updatedAt": "2022-11-26T14:44:57.648Z",
    "createdAt": "2022-11-26T14:44:57.648Z"
  }
}
```

### Response 400 - Bad Request
```json
{
  "message": "Name already used!",
}
OR
{
  "message": "Name required",
}
OR
{
  "message": "Description required",
}
OR
{
  "message": "Price required",
}
OR
{
  "message": "min price is 5000",
}
OR
{
  "message": "Image URL required",
}
OR
{
  "message": "Category required",
}
```

### Response 404 - Not Found
```json
{
  "message": "food with id 4 not found"
}
```

<br>

## PATCH '/food/:id'
### Description:
> Update food status.

### Request Header:
```json
{
  "access_token": STRING
}
```

### Request Body:
```json
{
  "status": STRING
}
```

### Response 200 - OK
```json
{
  "message": "product with id 1 status changed from Active to Inactive"
}
OR
{
  "message": "product status not changed"
}
```
<br>

# Global Errors
### Response 401 - Unauthorized
(For every request that requires `access_token`)
```json
{
  "message": "invalid token"
}
```
### Response 500 - Internal Server Error
```json
{
  "message": "Internal Server Error"
}
```