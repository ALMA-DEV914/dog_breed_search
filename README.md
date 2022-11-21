# Dog Breed Search

This is a single-page application to search for photos of nice doggies.

 The live site [https://mellow-heliotrope-0ac680.netlify.app/](https://mellow-heliotrope-0ac680.netlify.app/)

Also, it provided me with the opportunity to practice working with [TypeScript + React](https://reactjs.org/docs/static-type-checking.html#typescript)!

---

## Specifications

This application was built according to the following specifications:

> Be able to specify 1-N breed/sub-breed combinations, and a count for each combo, then click a 'generate' button to display a modal containing the requested images tiled in a grid, randomly sorted.


     | Breed | Sub-breed | Image Count | Action |
     | --- | --- | --- | ---: |
     | v Breed Dropdown v | v Sub-breed Dropdown v |  # of images | 
     | v Breed Dropdown v | v Sub-breed Dropdown v |  # of images | + <-- click plus to add a row

> - Search for a specific breed of dog and display a list of the first 12 matching results, sorted
>   alphabetically.
>   - If the search field is empty, display a list of the first 12 breeds available, sorted alphabetically.
>   - If the search field does not match any breeds, display a message that no breeds were found.
>   - While the list of breeds is loading, display a message that the breeds are loading.
> - Select one of the matching results and view pictures of that breed.
>   - When a result is selected, mark the selection visually as being active.
>   - While the images of the selected breed are loading, display a message that the images are loading.
>   - The Dog API sends back well over a hundred images for a request to its breed endpoint.
It did not make sense to me to display that many images at once for the user, so I set a limit of 10 images with button to click adding 10 items. 

>   - Use the Dog API (https://dog.ceo/dog-api/) as your data source.

## Technical Requirements



1. Use [Material UI](https://material-ui.com/) for the UI components
1. Use the [Stanford Dog API](https://dog.ceo/dog-api/documentation/) for data, INCLUDING dropdown population 
1. Use a least one [Higher Order Component](https://reactjs.org/docs/higher-order-components.html)
1. Provide Jest specs for at least one component in the app

- Use Typescript
- Use Suspense
- Use a custom theme
- 80% test coverage
- Use global state via redux - data down, events up (Required if applying for senior-level position)



## Implementation

   Initiate `npx-create-react-app --template typescript`
   Install necessary dependencies 
   Run `yarn build or npm run build to compile webpack for deployment`



### Finite State Machines

The logic for this user interface is built using **reducers** that act explicitly as **finite state machines**. That is, the reducer uses the current state and current action to determine which is the next state it should transition, and side-effects are run _only_ when transitions between certain states have occurred.

Modeling the application with state machines will make easier to support extensibility in the long term, since it precisely defines when side-effects should be executed.

See the following state machines as interactive visualizations:

- [Click here](https://xstate.js.org/viz/?gist=464b097c1f2061d8ccde857f1fd060ce) to interact with the `App` Component's state machine visualization.
  

- [Click here](https://xstate.js.org/viz/?gist=862063fd29ac5959193d07758e32cfc9) to interact with the `BreedSelector` Component's state machine visualization.
  

### TypeScript Types

One goal I had was to create Types for the various states of the Finite State Machine (FSM), as well as the Actions that cause the FSM to transition. Redux's documentation on TypeScript does [describe an approach](https://redux.js.org/recipes/usage-with-typescript) of creating Actions using string literals, which would have sufficed.


### User Interface Layout

The UI provided by the specification show that the buttons are laid out in grid rows.


### Sub-breed Search

This application supports search by sub-breed (e.g. boston bulldog, english bulldog, french bulldog).

### Future Improvements

A future improvement here could be a "lazyload" feature, which is when the user's scroll to the bottom of the screen prompts the application to display additional images.

---

## Technologies

- TypeScript

  The sourcecode for this application has been in [TypeScript](https://www.typescriptlang.org/), allowing for errors to be caught at build time.

- React

  This application is built using React, a library for building user interfaces. In particular, this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

  In addition, the sourcecode for this application makes use of Hooks, a new(ish) feature of React.
  `useReducer` hooks are used to organize the logic for changes to application state, and `useEffect` is employed to retrieve API data.

- Material UI

- Dog API

  The [Dog API](https://github.com/ElliottLandsborough/dog-ceo-api) hosts the data and images queried by this application.

---

## Running the Application

This application has been bootstrapped with [`create-react-app`](https://facebook.github.io/create-react-app/).

To run this application in a local development environment, Node 8.10.0 or later is required.

To install the application's dependencies, navigate to the the project directory in a terminal, and run the command: `npm install` or `yarn install`

### Development

Once the installation is complete, you can run: `npm start` or `yarn start`

This command runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production

To view this application as it would run in a production environment, the recommended approach would be to generate a production build and use a static server to view it. In my case I deployed it on Netlify (just drag or drop your build folder and your app is ready to view)

```
npm run build
npm install -g serve
serve -s build
```
