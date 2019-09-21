# What's Up Kid?

This is a prototype for an app that helps sick kids communicate how they're feeling to their parents, nurses, and doctors.

It attempts to solve the problem of kids struggling to vocalise their symptoms or experience, either due to being too young, being too stressed or not being familiar enough with the carer.

# Prereq
1. Node / NPM
2. Ionic v3

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
- The data for each entity is managed through providers in `src/providers/{entity}`
- To get access to a new bit of data simply inject the service into the page component, or initialise it in the constructor if it's a dynamic service

# Contributers

