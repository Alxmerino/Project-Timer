# Project Timer

A small timer app that can add timers for multiple projects.
Use it on your browser! [Demo](https://alxmerino.github.io/Project-Timer/)

## Getting started
This project is made with create-react-app and uses gulp to build styles.

Run the `yarn start` gulp task to run a local server or the `gulp dev` task to watch for SCSS changes and a local server. The app should be running on http://localhost:8080 for SCSS and http://localhost:3000 for JS.

```
yarn start // Local server
// gulp dev // watch SCSS + local server
yarn run build // Builds for production
yarn run dist // Builds Electron app
```

## Usage
Simply fill in the fields and click "Add Timer". In the new timer you have the ability to start, pause or delete the timer.
When adding planned time (How long?) field, you can add time in any of the following formats.

````
// Hours
3h
3 h
1hour
1 hour
3hours
3 hours

// Minutes
15m
15 m
15min
15 min
15minutes
15 minutes

// Hours + minutes (combinations of above)
3h 45m
3h 45 minutes
3 hour 45min
3 hour 45 minutes
3hours45min
````

## MVP Roadmap
This project is updated as often as possible. For bug fixes and updates see [Projects Page](https://github.com/Alxmerino/Project-Timer/projects)

## Known issues
- Notification sound not working on desktop app

## Special Thanks
- [Nick](https://twitter.com/ncsfoo) For creating such amazing app icon!
