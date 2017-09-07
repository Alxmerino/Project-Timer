#! /usr/bin/env bash

# Start building React app
printf '\nStart building React app...\n'
yarn run build
printf '\nFinished building React app\n'


# Copy necessary files for electron
printf '\nStart copying app files...\n'
cp index.js package.json ./build
printf '\nFinished copying app files\n'

# Copy source files for electron app
printf '\nStart copying source files...\n'
mkdir -p ./build/src/js ./build/src/img
cp -r ./src/js/enums ./build/src/js
cp -r ./src/img/* ./build/src/img
printf '\nFinished copying source files\n'

# Copy node_modules directory
printf '\nStart copying node modules...\n'
mkdir -p ./build/node_modules
cp -r ./node_modules/{menubar,electron-positioner,extend} ./build/node_modules
printf '\nFinished copying node modules\n\n'

# Build electron app
electron-packager ./build --platform=darwin  --arch=x64 --overwrite --app-version=1.3.1 --icon=./app-icon.icns --no-prune
printf '\nFinished building electron app\n'
