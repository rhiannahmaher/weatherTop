# weatherTop Application
weatherTop is a comprehensive weather application that allows users to manage multiple weather stations, generate weather reports, and view real-time weather data. Users can sign up, log in, and personalize their weather stations. The application is built with HTML, CSS, and Node.js, and utilizes data from OpenWeather.

## Description
weatherTop allows users to log in/sign up and add personalised weather stations to view current weather information. 
The application provides users with a personalised weather station list to suit their needs.
Users can add as many stations as needed and can manually add weather reports or utilize the _Auto Generate Report_ feature to access their station's current weather data from openWeather.

### Key Features
- Add and delete weather stations
- Manually or auto-generate report readings
- Current weather data displayed on _Dashboard_ and a station's page
- Update user details

## Dependencies

### Glitch
Users can access deployed weatherTop application via Glitch. Refer to GitHub repository ReadMe for deployed Glitch URL.
No further prerequisite is required.

### GitHub
Users can access weatherTop application via GitHub repository using the following URL: [GitHub weatherTop Repository](https://github.com/rhiannahmaher/weatherTop.git).
Prerequisites are as follows:
```json
{
  "axios": "^1.7.5",
  "body-parser": "^1.20.2",
  "cookie-parser": "^1.4.6",
  "dayjs": "^1.11.13",
  "express": "^4.18.2",
  "express-fileupload": "^1.4.0",
  "express-handlebars": "^6.0.7",
  "fs-extra": "^11.1.0",
  "lowdb": "^5.1.0",
  "uuid": "^9.0.0"
}
```
## Installing

## Modifications (Glitch & Github)
Before serving the application, replace the placeholder API key with your personal API key. 
Navigate to _controllers/station-controller.js_ and update line 14 & line 103 with your openWeather API key.

## Executing program (GitHub)
Clone the project repository using the following command:
```bash
git clone git@github.com:rhiannahmaher/weatherTop.git
```
After cloning, navigate to the project directory:
```bash
cd weatherTop
```
Ensure Node.js is installed, and run:
```bash
npm install
```
Then start the server by running:
```bash
node server.js
```
Follow provided local address to browser to view project.

## Issues
Latitude and longitude must be correctly coded when using the application in order for the station's map view to show the correct location.

## Authors
ex. Rhiannah Maher
ex. 20085527@mail.wit.ie

## Version History
0.1
Initial Release & see commit change throughout.

## Libraries and Tools
- Express: Web framework for Node.js used to build the server-side application. [Express Documentation](https://expressjs.com/).
- Handlebars: Templating engine for rendering HTML. [Handlebars Documentation](https://handlebarsjs.com/guide/).
- Leaflet: JavaScript library for interactive maps. [Leaflet Documentation](https://leafletjs.com/reference.html).
- Frappe Charts: Library for creating charts and graphs. [Frappe Charts Documentation](https://frappe.io/charts/docs).
- CSS: Styling framework for designing application [CSS: Cascading Style Sheets](https://developer.mozilla.org/en-US/docs/Web/CSS).

## References
- For-of loop logic was inspired by MDN: [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of).
- Array filter() function was inspired by W3Schools: [JavaScript Array filter()](https://www.w3schools.com/jsref/jsref_filter.asp).
- Logic for sorting stations alphabetically was inspired by FreeCodeCamp: [Sort Alphabetically in JavaScript – How to Order by Name in JS](https://www.freecodecamp.org/news/how-to-sort-alphabetically-in-javascript/).
- Logic for capitalizing station title taken from SheCodes: [[JavaScript] - How to Capitalize the First Letter in a String with JavaScript](https://www.shecodes.io/athena/3710-how-to-capitalize-the-first-letter-in-a-string-with-javascript#:~:text=Using%20JavaScript%2C%20you%20can%20capitalize,with%20the%20toUpperCase()%20method.)
- Viewport fill logic taken from StackOverflow: [How to make an element fill the remaining viewport height?](https://stackoverflow.com/questions/50043803/how-to-make-an-element-fill-the-remaining-viewport-height).
- Password visibility on hover insired by MDN: [visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) & [CSS :hover Selector](https://www.w3schools.com/cssref/sel_hover.php).
- new Date() logic inspired by W3Schools: [JavaScript Date Objects](https://www.w3schools.com/js/js_dates.asp).
- Converting Celcius to Fahrenheit logic was inspired by GeeksforGeeks: [JavaScript Program to Convert Celsius to Fahrenheit](https://www.geeksforgeeks.org/javascript-program-to-convert-celsius-to-fahrenheit/).
- Switch case logic inspired by Medium: [3 alternatives to if & else to improve code reading in javascript](https://medium.com/@sulistef/3-alternatives-to-if-else-to-improve-code-reading-in-javascript-8e624a2c1343).
- Color logic for active navigation page inspired by MDN: [Element: classList property](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList). 
