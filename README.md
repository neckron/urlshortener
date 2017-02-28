# urlshortener_microservice

 * **User Story:** I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
 * **User Story:** If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
 * **User Story:** When I visit that shortened URL, it will redirect me to my original link.

## Example creation usage:

```
* https://host:port/create/www.google.com
* https://host:port/create/http://foo.com:80
```

## Example creation output:

```
* {"original_url" : "www.google.com", "short_url" : "https://hots:port/AxJi12"}
```

#Usage:

```
*  https://hots:port/AxJi12 will redirecto to : www.google.com
```


### Installing and Running

To installing it on local dev env:

```
* install npm install
* run node server.js
```
## Built With

* [Node.js](https://nodejs.org/) - Execution environment
* [Express.js](http://expressjs.com/) - Web framework for Node.js programs
* [ejs](http://www.embeddedjs.com/) - Templating engine
* [randomstring]

## Authors

* **Neckron**
