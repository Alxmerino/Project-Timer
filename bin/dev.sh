#! /usr/bin/env bash

# Needs to run `yarn start` separately

# Build electron app
export ELECTRON_IS_DEV=1
export ELECTRON_START_URL=http://localhost:3000
electron ./
printf '\nFinished building electron app\n'
