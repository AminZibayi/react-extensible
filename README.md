### In the Name of Allah

# React-Extensible

A library which helps you create extensible React applications.

## Table of contents

- [React-Extensible](#react-extensible)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Basic Usage](#basic-usage)
  - [API Reference](#api-reference)
    - [Actions](#actions)
    - [Extension](#extension)
    - [Map](#map)
  - [Examples](#examples)
  - [License](#license)

## Installation

**Via npm:**

    npm install react-extensible --save

**Via yarn:**

    yarn add react-extensible

## Basic Usage

react-extensible exports:
1. `Extension`: it is a React component that represents an extension or plugin. It receives a prop called `name`; You can have several `Extension`s with the same name. another prop is `render`, its value is a React component/element.
2. `Actions`: is a static class. You can register or unrgister an extension using `Actions.register(extnInfo)` and `Actions.unregister(extnName)`, `extnInfo` is an object and at least must have a `name` field.

```javascript
import React from 'react';
import {Extension, Actions} from 'react-extensible';

const App = props => (
  <div className="App">
    <Extension name="alpha" render={<div>Hello</div>}/>
    <Extension name="beta" render={() => <div>Hello</div>}/>
    <Extension name="beta" render={<div>Hello</div>}/>
  </div>
);

Actions.register({
  name: "alpha"
});
Actions.register({
  name: "beta"
});
setTimeout(() => Actions.disable("beta"), 3000)

export default App;
```

**Result:**
You will observe three "Hello" messages on the screen. after 3 seconds, the two last ones will get disappeared because of `Action.disable("beta")`.

react-extensible has much more capabilities; See API Reference.

## API Reference

### Actions

A static class; It has five methods:

1. `register(extnInfo: Object)`: registers an extension so you can use the information of the registered extension to display the extension in your app, you can even display an extension at several places in your app.

`extnInfo`:
```javascript
{
  name: String, // required, the name of the extension
  disable: Boolean, // default false, if true, the extension will get unmounted
  render: Component/Element, // the extension will render this React component/element if none of props.render and props.children of the extension component whose props.name is equal to the name property of this object.
  props: Object, // default {}, these props will be passed to the component that the extension component renders.
}
```
2. `unregister(extnName)`: unregisters an extension in other hand remove an extnInfo object.
3. `disable(extnName)`: disables an extension so the extension will be unmounted.
4. `enable(extnName)`: enables an extension so the extension will be mounted again.
5. `get(extnName)`: returns an extnInfo object according to its name; if there is no matching extnInfo object, returns `undefined`. If you pass nothing (`undefined`), it will return the store (the extnInfo objects).
6. `update(fn: (prevStore: any[]) => store)`: updates the store to the value that its callback returns.

### Extension

A React component; It represents an extension. `props`:

1. `name`: is required, it links an extension to a registered extnInfo object.
2. `fallback`: a component which will get rendered when the ErrorBoundary catches an error in its child component tree (the component that the extension renders); This fallback component receives a prop named `error` which consists the occurred error.
3. `props`: an object, these props will be passed to the component that the extension renders.
4. `render`: a React component/element, the extension will render this component/element.
5. `children`: a React component/element, The extension will *always* render this component/element, even if the extension is disabled.

**Note:** the props of the Extension component will override the relevant extnInfo object.

### Map

A React component; It will call a function for each registered extnInfo object once it is rendered and anytime a change happens in the store (the extnInfo objects).

The function is received through `children`. In fact, it will be passed to a map function so it receives each extnInfo object as the first argument. It can return nothing or an `Extension`:

```javascript
import React from 'react';
import {Extension, Map, Actions} from 'react-extensible';

const App = props => (
  <div className="App">
    <Map>
      {extnInfo => <Extension name={extnInfo.name} render={extnInfo.name === "alpha" && (<div>Hello, I'm alpha</div>)}/>}
    </Map>
    <Map>
      {extnInfo => {
        if(extnInfo.name === "alpha")
          return <Extension name="alpha"/>
        }}
    </Map>
  </div>
);

Actions.register({
  name: "alpha",
  render: <div>Hi, I am Alpha</div>
});

Actions.register({
  name: "beta",
  render: () => <div>I'll go soon...:(</div>
});

setTimeout(() => Actions.disable("beta"), 3000);

export default App;
```

## Examples

Several `ReactDOM.render`s

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {Extension, Map, Actions} from 'react-extensible';

Actions.register({
  name: "alpha",
  render: <div>Hi, I am Alpha</div>
});

ReactDOM.render(<Map>
  {extnInfo => <Extension name={extnInfo.name} render={extnInfo.name === "alpha" && (<div>Hello, I'm alpha</div>)}/>}
</Map>,
document.getElementById('a'));

ReactDOM.render(<Map>
  {extnInfo => {
    if(extnInfo.name === "alpha")
      return <Extension name="alpha"/>
    }}
</Map>, document.getElementById('b'));

Actions.register({
  name: "beta",
  render: () => <div>I'll go soon...:(</div>
});

setTimeout(() => Actions.disable("beta"), 3000);
```

Is something missing?! feel free to open an issue!

## License

Apache 2.0