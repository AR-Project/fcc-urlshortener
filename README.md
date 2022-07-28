# URL Shortener Microservice

This is an alpha version for the URL Shortener Microservice project by AR Project. Boiler plate and requirement for building this project can be found at https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice.

Known Issues:
- Every url will generate new short url, even it was duplicate / already generated before.
- Url validation still include 'localhost' for debug purpose.
- Data is stored locally. Everytime server is being reset, all short url that already generated will gone.

Plan in the future:
- Store all data in external database. 
