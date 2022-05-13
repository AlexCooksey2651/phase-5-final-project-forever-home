# FOREVER HOME

## Alex Cooksey, Flatiron School Software Engineering Program
### Phase 5 Capstone Project

## Introduction

Forever Home is an app designed to help more pets get adopted into loving homes. A user can sign up as either an animal shelter or as a customer, and the app experience is different depending on which type of profile they sign up with. When a user signs up, Forever Home sends them a welcome email. There is also a "Forgot Password" function that triggers a password reset email. 

Customers can browse pets that match their interests, bookmark pets for future reference, and submit adoption applications. They can also view their applications (sorted into approved applications, pending, and denied), send shelters direct messages about a specific animal, view direct messages received from shelters, and edit their profile information (or delete the account). 

Shelters can view the animals they have listed for adoption, edit/remove those listings, view customers' applications (sorted into pending and denied), and view prior adoptions (i.e. "approved" applications). When viewing customers' applications, shelters can send a customer a direct message. In the messages page, shelters can see any messages they have received and reply. Finally, shelters can also edit profile information or delete their account.

## Running the Application

Enter `rails s` from the application folder in the terminal to run the backend server at [http://localhost:3000](http://localhost:3000).

Navigate to a new tab in the terminal and enter `npm start --prefix client` to run the frontend at [http://localhost:4000](http://localhost:4000).

This app utilizes `react-router-dom` and `react-bootstrap` on the frontend; if needed, navigate to the frontend folder by entering `cd client` in the terminal, then entering `npm install react-router-dom@6.3.0` and `npm install react-bootstrap` to use these dependencies. For further information on utilizing React-Bootstrap, please visit [React-Bootstrap](https://react-bootstrap.github.io/).

## Future Developments and Edits

Some ideas for future edits or additional features:

-I am currently working to incorporate mailers that will send a welcome email to users when they sign up for an account, as well as password reset functionality, which will include sending an email to users with a temporary password to be used when resetting the password.

-Refactor code to utilize `useContext` hook and/or Redux to reduce "prop drilling" of data utilized in various React components, such as User information. Some other variables/functions are repeated in multiple components, and these could possibly be moved into parent components and passed as props to reduce redundancy, or moved into Context if appropriate. In general, a lot of redundancy exists in order to avoid messier conditional statements that would determine what to render based on which type of user is utilizing the app. As much as possible, I would like to reduce redundancy while keeping the code as clean and easy to understand as possible. 

-Create custom serializers to reduce volume of data being loaded and optimize performance.

-Create background functions for background tasks, such as when loading different pages. 

-It could be fun to include a section (perhaps on the app homepage) with shelter and/or customer testimonials, perhaps even video links to show successful adoption stories.

## Resources

Forever Home was built with a React frontend and a Ruby-on-Rails backend, and will ultimately be deployed using Heroku. The app was styled using React-Bootstrap and CSS. 

Seed data created with the assistance of the Faker gem. To learn more about Faker, please visit this [link](https://github.com/faker-ruby/faker).

Check out a brief video walkthrough of the app [here](https://youtu.be/p14MoKJbuk0). 

Please check out these blog posts on Medium to learn more about a couple of the challenges I encountered and learned from over the course of building Forever Home:
-To learn about creating multiple types of users through polymorphic associations, visit [here](https://medium.com/@aecooksey2651/allowing-multiple-types-of-users-and-user-experiences-on-react-ruby-on-rails-2c5b33fac828).
-To learn how I linked Pet attributes so that they were updated dynamically as a function of PetApplication activity, visit this [article](https://medium.com/@aecooksey2651/linking-dependent-updates-across-multiple-tables-in-ruby-on-rails-8b6fd12a4c82).

State abbreviations array borrowed from this Github [page](https://gist.github.com/bubblerun/a624de5b4fa8ff0980010054a7220977#file-array-js).

Background image on app header found [here](https://shantelswaggingtails.com/wp-content/uploads/2015/07/Depositphotos_8775384_m.jpg).

Background image on app body found [here](https://cache.desktopnexus.com/thumbseg/1690/1690747-bigthumbnail.jpg).


