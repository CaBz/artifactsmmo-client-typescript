# ArtifactsMMO - Typescript Client
Just a weekend project to see how to automate stuff around for this ArtifactsMMO API programming game that ended up being a full blown project to find myself in this madness of automation.

## Setup
```
cp .env.example .env
yarn install
yarn console [character name] [command]
```

## Non-intuitive way to use this is to simply start with the workflows:

```
yarn console [character name] workflow [workflow name]

yarn console Bobby workflow copper
yarn console Bobby workflow gudgeon-craft
yarn console Bobby workflow ash
yarn console Bobby workflow sunflower-craft
```

More and more workflows are added, refactored and rethought over-time.


## Shortcuts:

Returns the bank content
```
yarn bank
```

Refreshes the datasets and generated lexicals
```
yarn refresh
```
