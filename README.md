# Project Timer

A small timer app that can add timers for multiple projects.

## Getting started
This project uses is made with ReactJS, Redux, Browserify and uses gulp as a build tool.

Run the `connect` gulp task to run a local server or the `dev` task to watch for changes and a local server. The app should be running on http://localhost:8080

```
gulp connect // Local server
gulp dev // watch + local server
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
- [x] Save time on local storage
    - [x] Ability to add/remove multiple timers/projects
    - [x] Build timer func
    - [x] Plan hours
    - [x] Display planned time, running time
    - [x] Integrate localStorage
- [ ] Save time on server (Directus?, Firebase?, etc)
- [ ] Hook up with JIRA

## Todo
- [x] Add lint
- [ ] Ability to edit/reset timer
- [x] Able to change title after it's added
- [ ] Integrate Per-day project hours (calendar?)
- [x] test!!!
