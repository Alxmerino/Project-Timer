#! /usr/bin/env bash

# Bash script to package electron app
APP_RESOURCES_PATH='Project Timer-darwin-x64/Project Timer.app/Contents/Resources'

echo 'Creating build directory...'
echo ''
mkdir -p ./build/node_modules
echo 'Created build directory'
echo ''

echo 'Copying app files...'
echo ''
cp index.js index.html package.json ./build
echo 'Copied app files'
echo ''

echo 'Copying node modules...'
echo ''
cp -r ./node_modules/{menubar,electron-positioner,extend,underscore,moment,moment-duration-format} ./build/node_modules
echo 'Copied node modules'
echo ''

echo 'Copying dist and source files...'
echo ''
cp -r ./dist ./build/dist
cp -r ./src ./build
echo 'Copied dist and source files'
echo ''

./node_modules/.bin/electron-packager ./build  --platform=darwin --asar=true --arch=x64 --overwrite --app-version=1 --icon=./app-icon.icns
echo ''
echo 'Packaged electron app'
echo ''

echo 'Clean up build files...'
echo ''
rm -rf ./build
echo 'Cleaned up build files'
echo ''
