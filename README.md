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
3. `Provider`: All the `Extension`s have to be descendants of a Provider component; Having only one Provider in your app is highly recommended. Note that you only can register extensions after the Provider is rendered.

```javascript
import React, { Component } from 'react';
import {Extension, Provider, Actions} from './react-extensible';

class App extends Component {
  componentDidMount() {
    Actions.register({
      name: "alpha"
    });
    Actions.register({
      name: "beta"
    });
    setTimeout(() => Actions.disable("beta"), 3000)
  }

  render() {
    return (
      <Provider>
        <div className="App">
          <Extension name="alpha" render={() => <div>Hello</div>}/>
          <Extension name="beta" render={() => <div>Hello</div>}/>
          <Extension name="beta" render={() => <div>Hello</div>}/>
        </div>
      </Provider>
    );
  }
}

export default App;
```

**Result:**
You will observe three "Hello" messages on the screen. after 3 seconds, the two last ones will get disapeared because of `Action.disable("beta")`.

react-extensible has much more capabilites; See API Reference.

## API Reference

### Provider

A react component; It has no props.
All the `Extension`s have to be descendants of a Provider component; Having only one Provider in your app is highly recommended.

**Note:** that you only can register extensions after the Provider is rendered.

### Actions

A static class; It has five methods:

1. `register(etxnInfo: Object)`: registers an extension so can use the registered extension information to display extension in your app, you can even display an extension at several places in your app.

`extenInfo`:
```javascript
{
  name: String, // required, the name of the extension
  disable: Boolean, // default false, if true, the extension will get unmounted
  render: Component/Function, // the extension will render this Component if none of props.render and props.children of the extension component whose props.name is equal to the name property of this object. also, it can be a loader function that will be passed to React.lazy.
  props: Object, // default {}, these props will be passed to the component that the extension component renders.
  suspense: Component, // if the value of render property is a loader function, this component will get rendered till the main component is loaded, in fact this will be passed to React.Suspense.
}
```
2. `unregister(extnName)`: unregisters an extension in other hand remove an extnInfo object.
3. `disable(extnName)`: disables an extension so the extension will be unmounted.
4. `enable(extnName)`: enables an extension so the extension will be mounted again.
5. `get(extnName)`: returns an extnInfo object according to its name; if there is no matching extnInfo object, returns `undefined`.

### Extension

A react component; It represents an extension. `props`:

1. `name`: is required, it links an extension to a registered extnInfo object.
2. `route`: if you are using react-router and want to pass the extension to a Route component, pass the Route component of react-router to the extension so the extension will pass its inside component as render property to a Route component; its path is the extension name.
3. `fallback`: a component which will get rendered when the ErrorBoundary catchs an error in its child component tree (the component that the extension renders); This fallback component receive a props named `error` which contain the occurred error.
4. `props`: an object, these props will be passed to the component that the extension renders.
5. `render`: a react component, the extension will render this component.
6. `children`: you can also pass the component that you want the extension to render via children.

**Note:** props of Extension component override the relevant extnInfo object.

Is something missing?! feel free to open an issue!

## License

Apache 2.0