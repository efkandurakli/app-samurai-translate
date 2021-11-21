# App Samurai Translate App

This is a simple translation web application that makes translation between Turkish and English like Google Translate. This web app have been developed by using React as part of application process for Frontend Developer position in  [App Samurai Company.](https://appsamurai.com/)


## Environment variables

Generate your credentials and project id in Google Cloud Platform. Read through the [documentation](https://cloud.google.com/iam/docs/creating-managing-service-accounts) for setting a service account.

After you acquired your credentials and project id, create a file named `.env` at the root folder of project and add credentials to this file like below.

```
REACT_APP_GCP_CLIENT_EMAIL=[private_key]
REACT_APP_GCP_PRIVATE_KEY=[client_email]
REACT_APP_GCP_PROJECT_ID=[project_id]
```

## Install packages

```
npm install
```

## Run Application

Runs the app in the development mode by running below command.\

```
npm run start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
## Other Available Scripts

In the project directory, you can run:

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## TODO

- Currently, this web app doesn't support other browsers expect Google Chrome. Add other browser supports
- Deploy the app to a cloud platform such as `heroku`, `netlify` etc.
- Make UI more responsive
- Support translation with glossary
- Improve history functionality
- Move history from IndexDB to SQL database
