# Tech-Blog   
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heidi-tech-blog.herokuapp.com/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description
A CMS-style (Content Management System style) blog site, where developers can publish their blog posts and comment on other developers’ posts as well.

## Table of Contents
* [Deployed Application](#deployed-application)
* [Usage](#usage)
* [Built With](#built-with)
* [Screenshot](#screenshot)
* [License](#license) 

## Deployed Application

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heidi-tech-blog.herokuapp.com/)

Here is the link [https://heidi-tech-blog.herokuapp.com](https://heidi-tech-blog.herokuapp.com) for the deployed application.

## Usage
- When you visit the website, you will see on the homepage all the existing blog posts, each with a title and a snippet.
- You can see the full content and the comments of a particular blog post by clicking the blog post title on the homepage.
- However, you have to login before you can leave a comment to other blog posts.
- Go to the Login tab to login.
- If you haven't had an account yet, you can sign up one from the Login page. (click 'signup' at the bottom of the Loggin page.)
- Once you are logged in, you can go to the dashboard to ADD NEW POST or eidt your existing blog posts.
- when you click the title of a particular blog post on your dashboard, you will be presented with a "Edit Post" page where you have the options to UPDATE or DELETE your blog post.

## Built With

- *MVC* architectural structure:
    - Front End (View):
        - *HTML*
        - *CSS*
        - *JavaScript*
        - *Bootstrap* as CSS framework
    - Back End (Controller):
        - *Node.js*
        - *Express.js*
        - *dotenv* for environment variables
        - *bcrypt* for password hashing
        - *Handlebars.js* as templating engine
        - *express-session* for authentication
        - *connect-session-Sequelize* for session store
    - Database (Model);
        - *MySQL*
        - *Sequelize* as the ORM
- Deployment
    - *Heroku*
    - *JawsDB* as cloud database

## Screenshot

Homepage - all blog posts with a title and a snippet:
![Homepage](./public/images/homepage.png)

Single post - full content and comments:
![Single post - full content and comments](./public/images/single_post_with_comments.png)

Login page:
![Login page](./public/images/login.png)

Sign-up page:
![Sign-up page](./public/images/sign_up.png)

Single post - after logged in, you have the option to leave a comment:
![Single post - Logged in - you have the option to leave a comment](./public/images/single_post_with_comments_logged_in.png)

Dashboard:
![Dashboard](./public/images/dashboard.png)

Add new post:
![Add new post](./public/images/new_post.png)

Edit your post:
![Edit your post](./public/images/edit_post.png)

## License

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT) 

This project is licensed under the terms of the MIT license.
