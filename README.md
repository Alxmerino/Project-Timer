# Project Timer

A small timer app that can add timers for multiple projects.

## Getting started
This project uses is made with ReactJS, Redux, Browserify and uses gulp as a build tool.

Run the `connect` gulp task to run a local server or the `dev` task to watch for changes and a local server. The app should be running on http://localhost:8080

```
gulp connect // Local server
gulp dev // watch + local server
```

## MVP Roadmap
- [x] Save time on local storage
    - [x] Ability to add/remove multiple timers/projects
    - [x] Build timer func
    - [x] Plan hours
    - [x] Display planned time, running time
    - [x] Integrate localStorage
- [ ] Save time on server (Directus?, Firebase?, etc)
- [ ] Hook up with JIRA

## Known bugs
- Timer resets when paused.

## Todo
- [ ] Add lint?
- [ ] Ability to edit/reset timer
- [ ] Integrate Per-day project hours (calendar?)
- [ ] test!!!
