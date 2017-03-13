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
- Timer will stop running if computer goes to sleep
- Timer will occasionally go off-sync of and the actuall time will be off. 
    - Planned fix: Update to use start/stop timestamps and get the time between to get a more accurate duration. Also do this on the `TIMER_UPDATE` action

## Todo
- [ ] Add lint?
- [ ] Integrate Per-day project hours (calendar?)
- [ ] test!!!
