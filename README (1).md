
# Social Networking API

INTRODUCTION

This API provides endpoints to manage users, posts, follow, and other social networking functionalities.

Authentication: 

Implemented JWT-based authentication to secure the API. It ensures that user can sign up, log in, and perform actions on behalf of their profiles.
## Run Locally

Clone the project

```bash
  git clone https://github.com/AyushPathak7074/Socials
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## ENDPOINTS
### Users

#### Create New User
```http
  POST /user/create/user
```

#### Get all Users

```http
  GET /user/getUsers
```
#### LOGIN

```http
  POST /user/login
```
#### Update User by ID

```http
  PUT /user/update/:id
```
| Key       | Value    | Description                |
| :-------- | :------- | :------------------------- |
| `JWTToken` | `string` | **Required**. JWT Token |

#### Delete User by ID
```http
  PUT /user/delete/:id
```
| Key       | Value    | Description                |
| :-------- | :------- | :------------------------- |
| `JWTToken` | `string` | **Required**. JWT Token |

#### Follow User by ID
```http
  PUT /user/follow/:id
```
| Key       | Value    | Description                |
| :-------- | :------- | :------------------------- |
| `JWTToken` | `string` | **Required**. JWT Token |

### POSTS
### All Post Actions Require Access Token
#### Create New Post for User
```http
  POST /post/user/post
```
#### Get All Post of a User
```http
  GET /post/get/post
```
#### Upadate Post by ID
```http
  POST /post/update/:id
```
#### Delete a Post by ID
```http
  POST /post/delete/:id
```
