# Vigisade

* [Guidelines](#guidelines)
* [Angular CLI](#angular-cli)

## Guidelines

__Typescript__
* Even if there is no standards recommendations for this project, you SHOULD be consistent through the entire application.
* All files MUST use the english language;
* Variables names, classes names and other names MUST be [descriptive](https://hackernoon.com/the-art-of-naming-variables-52f44de00aad);
* Comments MUST be [helpful](https://blog.codinghorror.com/code-tells-you-how-comments-tell-you-why/) for other developers;

__Angular__
* Even if there is no standards recommendations for this project, you SHOULD follow recommendations from the Angular documentation.

__Git__
* Commit messages MUST follow this pattern: `RM #{redmineId} Do something`;
* Feature branch MUST follow this pattern `{name}-{redmineId}` (ex: `gmar-81000`);
    * If you work on an already merged branch, you SHOULD add a suffix: `gmar-81000-b`;
* Each redmine issue MUST have a dedicated feature branch;
* Each feature branch MUST be merged using a Gitlab Merge Request;


## Structure

### Component

Each component MUST follow structure rules. Authorized directories are:
```
foobar/
  └ components/
  └ containers/
  └ data/
  └ directives/
  └ interfaces/
  └ pipes/
  └ resources/
  └ services/
  └ store/
  └ types/
```

* `components`: contains children components. Each of them must also follow these rules;
* `containers`: contains files of the current component (i.e. `foobar.component.ts`, html or scss);
* `data`: contains all helpers functions which don't fit with other directories;
* `resources`: contains special assets for the component;
* `directives`, `interfaces`, `types`: `pipes`, `services`: contains related Angular items. You mai required additional directories for some components.
* `store` contains files related to the NgRx store;

### Store

Store items must be separated into dedicated files:

```
store/
  └ component-name.actions.ts
  └ component-name.effects.ts
  └ component-name.module.ts 
  └ component-name.reducer.ts
  └ component-name.selectors.ts 
  └ component-name.state.ts 
```

You should split any of them into several files. Then you must create a directory:

```
store/
  └ actions/
    └ component-name-foo.actions.ts 
    └ component-name-bar.actions.ts 
```

## Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
