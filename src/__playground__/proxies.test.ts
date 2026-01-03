// What are proxies in Javascript
// Proxies are a way to intercept and modify the behavior of an object
// They are a way to create a wrapper around an object that can be used to intercept and modify the behavior of the object

import { beforeEach, describe, expect, it, vi } from "vitest";

const person = {
  name: "Pedro",
  age: 35,
  gender: "Male",
  hobby: "Music",
  sayHi() {
    return "hi";
  },
};

// This section lists all the handler functions you can define. Handler functions are sometimes called traps, because they trap calls to the underlying target object.
// handler is the object that defines the custom behavior of the proxy.
// Here is the list with all available traps we can use to intercept and modify the behavior of the proxy
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions
const handlers: ProxyHandler<typeof person> = {
  set(target, property, value) {
    const prop = typeof property === "string" ? property : "";

    console.log(
      `${prop in target ? "Modifying" : "Adding"} property ${prop} with value: ${value}`,
    );

    return Reflect.set(target, property, value);
  },

  get(target, property, receiver) {
    const prop = typeof property === "string" ? property : "";
    console.log(`Reading property ${prop}`);
    return Reflect.get(target, property, receiver);
  },

  has(target, property) {
    const prop = typeof property === "string" ? property : "";
    console.log(`is ${prop} in person`, property in target ? "Yep" : "Nope");

    return Reflect.has(target, property);
  },

  deleteProperty(target, property) {
    const prop = typeof property === "string" ? property : "";
    console.log(`Deleting property ${prop}`);

    return Reflect.deleteProperty(target, property);
  },
};

const personProxy = new Proxy(person, handlers);

describe("Testing Proxy implementation", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("Should test message when setting a property", () => {
    vi.spyOn(console, "log");
    // @ts-expect-error
    personProxy.randomProperty = "This shouldn't be allowed";

    expect(console.log).toHaveBeenLastCalledWith(
      "Adding property randomProperty with value: This shouldn't be allowed",
    );

    personProxy.age = 36;
    expect(console.log).toHaveBeenLastCalledWith(
      "Modifying property age with value: 36",
    );
  });

  it("should test message when reading a property", () => {
    vi.spyOn(console, "log");

    const _name = personProxy.name;

    expect(console.log).toHaveBeenLastCalledWith("Reading property name");
  });

  it("should test message when check for a property", () => {
    vi.spyOn(console, "log");

    const hasageproperty = "age" in personProxy;

    expect(console.log).toHaveBeenLastCalledWith("is age in person", "Yep");
  });

  it("should test message when deleting for a property", () => {
    vi.spyOn(console, "log");

    delete personProxy.sayHi;

    expect(console.log).toHaveBeenLastCalledWith("Deleting property sayHi");
  });
});

function sayHi(name: string) {
  return `Hi, ${name}`;
}

const sayHiProxy = Proxy.revocable(sayHi, {
  apply(target, thisArg, argArray) {
    console.log(
      `Calling sayHi function wih a proxy. This are the arguments: ${argArray.join(",")}`,
    );
    return Reflect.apply(target, thisArg, argArray);
  },
}).proxy;

describe("Testing a proxying a function", () => {
  it("Should intercept the function invokation", () => {
    vi.resetAllMocks();
    vi.spyOn(console, "log");

    const result = sayHiProxy("Pedro");

    expect(console.log).toHaveBeenLastCalledWith(
      "Calling sayHi function wih a proxy. This are the arguments: Pedro",
    );

    expect(result).toBe("Hi, Pedro");
  });
});
