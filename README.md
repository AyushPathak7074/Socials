
# 📱Social Networking API

INTRODUCTION

This API provides endpoints to manage users, posts, follow, and other social networking functionalities.

Authentication: 

Implemented JWT-based authentication to secure the API. It ensures that user can sign up, log in, and perform actions on behalf of their profiles.

## 🚀Deployment
To Run this API:

## 💻Run Locally

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
```bash
  POST /user/create/user
```

#### Get all Users

```bash
  GET /user/getUsers
```
#### LOGIN

```bash
  POST /user/login
```
#### Update User by ID

```bash
  PUT /user/update/:id
```
| Key       | Value    | Description                |
| :-------- | :------- | :------------------------- |
| `Token` | `string` | **Required**. JWT Token |

#### Delete User by ID
```bash
  PUT /user/delete/:id
```
| Key       | Value    | Description                |
| :-------- | :------- | :------------------------- |
| `Token` | `string` | **Required**. JWT Token |

#### Follow User by ID
```bash
  PUT /user/follow/:id
```
| Key       | Value    | Description                |
| :-------- | :------- | :------------------------- |
| `Token` | `string` | **Required**. JWT Token |

### POSTS
### All Post Actions Require Access Token
#### Create New Post for User
```bash
  POST /post/user/post
```
#### Get All Post of a User
```bash
  GET /post/get/post
```
#### Upadate Post by ID
```bash
  POST /post/update/:id
```
#### Delete a Post by ID
```bash
  POST /post/delete/:id
```
