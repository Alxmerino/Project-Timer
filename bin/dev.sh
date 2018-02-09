#! /usr/bin/env bash

# Needs to run `yarn start` separately

# Build electron app
ELECTRON_IS_DEV=1 electron ./
printf '\nFinished building electron app\n'
