# What's Up Kid?

This is a prototype for an app that helps sick kids communicate how they're feeling to their parents, nurses, and doctors.

It attempts to solve the problem of kids struggling to vocalise their symptoms or experience, either due to being too young, being too stressed or not being familiar enough with the carer.

# Prereq
1. Node / NPM
2. [Ionic v3](https://ionicframework.com/docs/v3/)

# Getting Started
1. Clone the project
2. Install Ionic v3
```
sudo npm i ionic@3 -g
```
3. Serve the project in Ionic Labs
```
ionic serve --l
```

# Architecture
- The different screens are sorted into pages
- You can changes the ux of the pages by editing the html and scss in `src/pages/{page}`
- The data is managed in a data service, which is responsible for loading and storing the data the application needs
- It may be necessary at some point to split the data providers out by entity (AssessmentProvider, KidProvider, etc) but for the same of speed it's all together at the moment

# Deployment
```
npm run build
firebase deploy
```

# Contributers

