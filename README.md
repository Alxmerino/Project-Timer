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
Works with the following formats
````
// Hours
3h
3 h
1hour
1 hour
3hours
3 hours

// Minutes
15
15m
15 m
15min
15 min
15minutes
15 minutes

// Hours + minutes
3h 45m
3h 45 minutes
3 hour 45min
3 hour 45 minutes
3hours45min````

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
- [ ] Able to change title after it's added

would be nice if 2 hours works
same with 2 minutes
2 min

BUG: can have multiple timers running, start one then start another

- [ ] Integrate Per-day project hours (calendar?)
- [ ] test!!!
