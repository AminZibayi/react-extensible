### In the Name of Allah

# React-Extensible

A library which helps you create extensible react applications.

## Installation

**Via npm:**

    npm install react-extensible --save

**Via yarn:**

    yarn add react-extensible

## Basic Usage

react-extensible exports:
1. `Extension`: it is a react component that represents an extension or plugin. It receives a prop called `name`; You can have several `Extension`s with the same name. another prop is `render`, its value is a react component.
2. `Actions`: is a static class. You can register or unrgister an extension using `Actions.register(extnInfo)` and `Actions.unregister(extnName)`, `extnInfo` is an object and at least must have a `name` field.
3. `Provider`: All the `Extension`s have to be descendants of a Provider component; Having only one Provider in your app is highly recommended.

```javascript
import React from 'react';
import {Extension, Provider, Actions} from 'react-extensible';

const App = props => (
  <Provider>
    <div className="App">
      <Extension name="alpha" render={() => <div>Hello</div>}/>
      <Extension name="beta" render={() => <div>Hello</div>}/>
      <Extension name="beta" render={() => <div>Hello</div>}/>
    </div>
  </Provider>
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

### Provider

A react component; It has no props.
All the `Extension`s have to be descendants of a Provider component; Having only one Provider in your app is highly recommended.

### Actions

A static class; It has five methods:

1. `register(extnInfo: Object)`: registers an extension so can use the registered extension information to display extension in your app, you can even display an extension at several places in your app.

`extnInfo`:
```javascript
{
  name: String, // required, the name of the extension
  disable: Boolean, // default false, if true, the extension will get unmounted
  render: Component/Function, // the extension will render this Component if none of props.render and props.children of the extension component whose props.name is equal to the name property of this object. also, it can be a loader function that will be passed to React.lazy.
  props: Object, // default {}, these props will be passed to the component that the extension component renders.
  suspense: Component, // if the value of render property is a loader function, this component will get rendered till the main component is loaded, in fact, this will be passed to React.Suspense.
  //Note: you can have custom properties and methods
}
```
2. `unregister(extnName)`: unregisters an extension in other hand remove an extnInfo object.
3. `disable(extnName)`: disables an extension so the extension will be unmounted.
4. `enable(extnName)`: enables an extension so the extension will be mounted again.
5. `get(extnName)`: returns an extnInfo object according to its name; if there is no matching extnInfo object, returns `undefined`. If you pass nothing (`undefined`), it will return the store (the extnInfo objects).

### Extension

A react component; It represents an extension. `props`:

1. `name`: is required, it links an extension to a registered extnInfo object.
2. `route`: if you are using react-router and want to pass the extension to a Route component, pass the Route component of react-router to the extension so the extension will pass its inside component as render property to a Route component; its path is the extension name.
3. `fallback`: a component which will get rendered when the ErrorBoundary catches an error in its child component tree (the component that the extension renders); This fallback component receives a prop named `error` which contain the occurred error.
4. `props`: an object, these props will be passed to the component that the extension renders.
5. `render`: a react component, the extension will render this component.
6. `children`: you can also pass the component that you want the extension to render via children.
7. `anyway`: a react component, The extension will *always* render this component, even if the extension is disabled.

**Note:** props of Extension component override the relevant extnInfo object.

### Extensions

A react component; It will call a function for each registered extnInfo object once it is rendered and anytime a change happens in the store (the extnInfo objects).

The function is received through `children`. In fact, it will be passed to a map function so it receives each extnInfo object as the first argument. It can return nothing or an `Extension`: (the following example also uses lazy loading)

```javascript
// Beta.js
import React from 'react';

export default props => <div>I'll go soon...:(</div>;

//App.js
import React from 'react';
import {Extension, Extensions, Provider, Actions} from 'react-extensible';

const App = props => (
  <Provider>
    <div className="App">
      <Extensions>
        {extnInfo => <Extension name={extnInfo.name} render={extnInfo.name === "alpha" && (() => <div>Hello, I'm alpha</div>)}/>}
      </Extensions>
      <Extensions>
        {extnInfo => {
          if(extnInfo.name === "alpha")
            return <Extension name="alpha"/>
          }}
      </Extensions>
    </div>
  </Provider>
);

Actions.register({
  name: "alpha",
  render: () => <div>Hi, I am Alpha</div>
});

Actions.register({
  name: "beta",
  render: () => import("./Beta")
});

setTimeout(() => Actions.disable("beta"), 3000);

export default App;
```

Is something missing?! feel free to open an issue!

## License

Apache 2.0