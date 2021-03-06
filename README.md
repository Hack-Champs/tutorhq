# Tutor HQ
Everything a tutor needs to run a successful remote tutoring business.
* Student management
* Invoicing
* Scheduling and booking management
* Virtual classroom with collaborative whiteboard, chat, code editor, and live audio / video streams.

## Team
* [Henry Neale - Software Engineer](https://github.com/henryneale)
* [Grant Spilsbury - Software Engineer](https://github.com/grantspilsbury)
* [Luna Kim - Software Engineer](https://github.com/lunakim96)
* [Steven Lee - Product Owner, Software Engineer](https://github.com/zaySeoul)

## To run the app locally
1. In the root directory of your app run ```npm install```
2. Sign up for a SendGrid account and take note of the username and password that you used to login to the site.
3. Enable Google Places API in the Google API console.
4. In the root of your app change the name of .env.example to .env. You can update your local variables here.
5. Uncomment the simplewebrtc line in the head of client/dist/index.html
6. Start the React server by running ```npm run react```
7. Start the node server by running ```npm run server```
8. To see the classroom, login > create a student > create a booking > click on the booking link

## Future considerations
* Payment service provider integration
* User Account management
* Enhanced UI
* More robust form validation

##  Acknowledgments
:clap: [Jonathan Lewis](https://github.com/jonathandavidlewis) for all the AWS help :clap:
