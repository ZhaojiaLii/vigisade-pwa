# Vigisade

* [Service Worker](#service-worker)
* [Guidelines](#guidelines)
* [Structure](#structure)
* [Angular CLI](#angular-cli)


## Service Worker

* Host: `127.0.24.1 www-dev.vigisade.com`
* Only work with the production flag `npm run build-prod`
* If you have a SSL certificate issue, run Google Chrome with this command: `google-chrome --user-data-dir=/tmp/foo --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://www-dev.vigisade.com`
* Only work with HTTPS


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
