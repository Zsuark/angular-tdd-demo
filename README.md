# Goals of Presentation

Introduce the main concepts of Angular, starting with a TDD test-first approach.

Demonstrate a feature with TDD.

# Introduction

[Angular](https://angular.io) is a front end framework for SPAs and targets both the web and mobile devices. Angular 2+ is distinct from Angular JS.

Angular JS uses an MVC design pattern implemented in JavaScript. It's only target is the web.

Angular is a complete rewrite, uses TypeScript and has lost the MVC pattern in favour of other techniques for Reactive Applications.

 - [Reactive Programming in Angular](https://blog.nrwl.io/reactive-programming-in-angular-7dcded697e6c)
 - [TypeScript](https://www.typescriptlang.org/)

## Testing in Angular

[Testing](https://angular.io/guide/testing) in Angular uses Jasmine and Karma as the test framework.

 - [Jasmine](https://jasmine.github.io/) provides BDD for JavaScript (and hence also TypeScript)
 - [Karma](https://karma-runner.github.io) is the test runner
 - Unit testing may be done with these tools.
   - For examples, see: [Testing services](https://angular.io/guide/testing-services) in the Angular documentation.


# Test Driven Development Overview

Please take a moment to get back to basics with TDD.

> Three Laws of TDD.
>
>     You must write a failing test before you write any production code.
>     You must not write more of a test than is sufficient to fail, or fail to compile.
>     You must not write more production code than is sufficient to make the currently failing test pass.

 - [The Cycles of TDD](https://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html) by Robert C. Martin (Uncle Bob) on [The Clean Code Blog](https://blog.cleancoder.com/)
 - [Test-Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html) by Martin Fowler
 - [The The Laws of TDD](https://www.youtube.com/watch?v=AoIfc5NwRks) by Uncle Bob on YouTube.


# Angular Development

Angular has great documentation, including an [Introduction to Angular Concepts](https://angular.io/guide/architecture).

The software anatomy of an Angular application is constructed of:

 - Component
   - Presentation layer components - represents views and their logic.
   - Implemented in: templates, CSS, TypeScript, Test Specifications
   - The `app` module is the root component of Angular applications

 - Modules
   - Organises related items (e.g. libraries)
   - Configures the injector (Dependency Injection)
   - Configures the compiler

 - Directives
   - You can define your own directives to attach custom behavior to elements in the DOM.

   - There are three kinds of directives in Angular:
     - Components—directives with a template.
     - Structural directives—change the DOM layout by adding and removing DOM elements.
     - Attribute directives—change the appearance or behavior of an element, component, or another directive.

   - Angular offers two kinds of built-in directives: attribute directives and structural directives.
     - [Built-in directives](https://angular.io/guide/built-in-directives)

   - Attribute directives:
     - listen to and modify the behavior of other HTML elements, attributes, properties, and components.
     - are usually applied to elements as if they were HTML attributes, hence the name.



# Install Angular

 - I'll leave this up to you.
 - [Angular Homepage](https://angular.io)
 - [Setting up the local environment and workspace](https://angular.io/guide/setup-local)


# Start a new Angular project

```bash
ng new angular-tdd-demo --strict
cd angular-tdd-demo
```

# Demo the project

```bash
ng test
ng serve --open
```
 - the open option opens your web browser to the application.

The test command compiles the code and uses Karma to open and control a chrome instance to run the tests.



# Adjust the CSS and template.

You may wish to dump the CSS in the HTML file into the CSS file.

Please change the tests first before modifying the HTML.

TDD Philosophy: You can't write _any_ production code until you have first written a failing test.

For now, we only really need a blank project, so please go ahead and simplify the texts and contents.


# Creating a component

[Component overview in Angular's documentation](https://angular.io/guide/component-overview)

> Components are the main building block for Angular applications. Each component consists of:
>
>  -   An HTML template that declares what renders on the page
>  -   A Typescript class that defines behavior
>  -   A CSS selector that defines how the component is used in a template
>  -   Optionally, CSS styles applied to the template


## The root component

HTML Template file: `src/app/app.component.html`
CSS file:           `src/app/app.component.css`

TypeScript file:    `src/app/app.component.ts`
Test specs:         `src/app/app.component.spec.ts`

## Generating a new component

```bash
ng generate component item-list
```

Components are stored in the directory `src/app/<component name>` and they have the same set of files as the root component.


# Writing tests

## Changing the application title

Let's change the application title to be "Angular TDD Example Application"

### Change the tests

In the file src/app/app.component.spec.ts, change:

```typescript
  it(`should have as title 'angular-tdd-demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-tdd-demo');
  });
  ```

to:

```typescript
  it(`should have as title 'Angular TDD Example Application'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Angular TDD Example Application');
  });
  ```

### Run the tests

```bash
ng test
```

There modified test should now fail.

### Modify the component

Edit src/app/app.component.ts

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-tdd-demo';
}
```

Change
```typescript
  title = 'angular-tdd-demo';
```

To
```typescript
  title = 'Angular TDD Example Application';
```

Change the title appropriately, and check that your test has automatically turned green.

## Changing the view

The view should only contain the title, as header level 1.

__*NOTE:* We only ever reference the root AppComponent as `app` -- Use `component` for regular components.__

For reference:

 - [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
 - [Angular unit testing 101 (with examples)](https://dev.to/mustapha/angular-unit-testing-101-with-examples-6mc)
 - [Testing](https://angular.io/guide/testing) (Angular site)

 TODO: How do we setup CI?

### Extend the tests

```typescript
  it(`should render the title in an <h1> tag -- <h1>${ title }</h1>`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const element = fixture.nativeElement;
    const h1 = element.querySelector("h1");
    fixture.detectChanges();
    expect(h1.textContent).toEqual(title);
  });
```

The variable `title` is actually a const declared in the text suite. Please change other instances of the title to reference the const instead.

The title is declared at the start of the description.
```typescript
describe('AppComponent', () => {

  const title = 'Angular TDD Example Application';
...
```

For example, the previous test should now look like
```typescript
  it(`should have as title '${ title }'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual(title);
  });
```

Don't forget to `ng test` if tests aren't already running

### Modify the template

The file `src/app/app.component.css` should be empty.

The file `src/app/app.component.html` should only contain:

```html
<h1>{{ title }}</h1>
```

### Success!


# Additional references

 - [Testing Angular Directives: Using HTMLElement](https://medium.com/@joshblf/testing-angular-directives-dc8bffff5fa2)
