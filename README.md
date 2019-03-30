# Quora-REST in Node.js


### Routes

HTTP Methods

| Method | Route        | Body |
|--------|--------------|------|
| POST   | /auth/login  | `{ `  |
|        |           |  `   "email": "username@domain.com",`|
|        |           |  `   "password": "******" `|
|        |           |  `}`                      |
| POST   | /auth/signup |`{ `                |
|        |           |  `   "name": "Name Surname",`|
|        |           |  `   "email": "username@domain.com",`|
|        |           |  `   "password": "******" `|
|        |           |  `}`                      |
| GET    | /user/users  |
| GET    | /user/users/:userId  |
| GET    | /question  |
| POST    | /question  |  `{ "question": "User Question?" }` |
| GET    | /user/users  |
| PUT    | /:questionId/answer  |  `{ "question": "Answer of :questionId Question" }` |
| PUT    | /:questionId/:answerId/upVote  |

