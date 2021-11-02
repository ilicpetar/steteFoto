# gef-create-app

## Startup

Recommended versions of Node, NPM and yarn

> Note that **YARN** version manager has to be installed

```
$ node -v ; npm -v ; yarn -v
v12.18.3
6.14.6
1.22.10
```

`yarn start` to start a local dev mock server at `localhost:3335`, and webpack dev server at `localhost:3330`.

`yarn test` run the tests with Jest and Enzyme.

`yarn test:watch` run the tests with Jest and Enzyme in watch mode.

`ci:build` CI script to build application using configuration file defined in /scripts/webpack-prod.config.js

`ci:createPackageToDeploy appName AT` CI script to archive final build into **`appName`\_static.war** package with
configuration for AT environment.

Izmena file-ova da bi prosao build

folder steteFoto\node_modules\@gef-ui\gef-scripts\webpack izmeniti file devTemplate.ejs. dodati meta tag <meta name="viewport" content="width=device-width">

folder steteFoto\node_modules\bootstrap\dist\css rename fajla u bootstrap.min.scss

rename file-a steteFoto\node_modules\react-toastify\dist\ReactToastify.scss

/node_modules/react-images-upload/index.css rename u .scss

i file-u /node_modules/react-images-upload/compiled.js rename gde ima index.css u .scss (require('./index.scss');)

slika GENERALI koja se prikazuje pri ucitavanju Modalnog prozora kopira se u folder steteFoto\node_modules\@gef-ui\components\assets\images a ime slike je 'generaliceskapojistovna-secondary-logo.svg'

## Project structure

For complete guideline how GEF application should be structured have a look at our confluence

[FE Architecture overview](https://confluence.cpas.cz/pages/viewpage.action?spaceKey=GFD&title=FE+architecture+overview)

## Tests

The testing environment is written in Jest and Enzyme.

## Eslint

This project uses GEF Javascript specs.
