# BLOG Api

The Blog-API project is a full CRUD operation back-end project. The project utilizes NodeJS, Express, Mongoose, and MongoDB.
The user receives a Token at the header that allows the  user to access Public blogs then create, update, and delete a particular blog by ID.
The Blog API also protects the API with a hashed password. For added security Usernames/Emails must also be unique during the registration process.

## Installed dependencies

- bcrypt
- express
- express-validator
- mongoose
- helmet
+ dotenv
+ jsonwebtoken
+ morgan

### Routes


#### Auth('/auth') creates Users and Login

- userRouter.post('/register'): Register Users, AuthSchema is used. password is hashed

- userRouter.post('/login'): Login with username and password only. Token is sent to header for further acess

- userRouter.get('/'): base endpoint Finds all users. Protected with token sent to header No parameters

#### Blog('/blog')

- router.get('/'): all Public blogs are included, must be logged in and have a token

- router.post('/username/:username'): Creates Blog with blogSchema, username parameter(String) name is needed to post blog

- router.put('/id/:id'): Updates blog with id, parameter(String) id is needed to update blog

- router.get('/id/:id'): Returns blog associcated to id, parameter(String) id is required to find blog. onlyprivate blogs appear

- router.delete('/id/:id): Deletes blog associated with id, need a token for Authorization and parameter(string) id is required to delete blog

### Schemas


##### Auth Route Schema:

- username: type: String, required: true,
- password:type: String, required: true,
- email:type: String, required: true,
- birthday: type: Number, required: true,
- age: type: Number

##### Blog Route Schema:

- username: type: String, require: true,
- created_by:type: String, required: true,
- created_at: type: String, required: true,
- blog_title: type: String, required: true,
- blog_content: type: String, required: true,
- private: type: Boolean, default: false

