---
title: createState function using React Context and ImmerJS
date: '2020-08-03'
spoiler: It might be a useful function
tags: ["reactjs", "typescript", "sample"]
reddit: "https://www.reddit.com/r/learnreactjs/comments/i2u9hm/createstate_function_using_react_context_and"
---

In this post I am going to show a function for global state management in React applications
using [React Context](https://reactjs.org/docs/context.html) and [ImmerJS](https://github.com/immerjs/immer).
It is heavily inspired by [this post](https://dev.to/ferdaber/creating-stores-using-react-context-hooks-and-immer-5f4d).

Enough words, please read the final code :)

```typescript
import React, { useContext, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import produce from "immer";
import mapValues from "lodash/mapValues";

type Children = { children?: any };
type ProviderFC = React.FC<Children>;

type MutationFn<T> = (state: Partial<T>) => void;
type Mutations<T> = {
  [name: string]: (state: T, ...args: any[]) => void;
};

type Update<T, M extends Mutations<T>> = { setState: MutationFn<T> } & M;
type UseStateResult<T, M extends Mutations<T>> = [T, MutationFn<T>, M];
type UseStateFn<T, M extends Mutations<T>> = () => UseStateResult<T, M>;

export default function createState<T, M extends Mutations<T>>(
  {
    initialState,
    loadState = () => Promise.resolve(initialState),
  }: {
    initialState: T;
    loadState?: () => Promise<T>;
  },
  mutations?: M
): [ProviderFC, UseStateFn<T, M>] {
  const StateContext = React.createContext<T>(initialState);
  const UpdateContext = React.createContext<Update<T, M>>(null as any);

  function Provider({ children }) {
    const router = useRouter();
    const [state, update] = useReducer(produce, initialState);
    const mutate = update as any;

    const setState = (newState: Partial<T>) => {
      mutate((target: any) => {
        Object.assign(target, newState);
      });
    };

    const actions = mapValues(mutations, (fn) => (...params: any[]) => {
      mutate((target: any) => {
        fn(target, ...params);
      });
    });

    const loadAsync = async () => {
      const newState = await loadState();
      mutate((target: any) => {
        Object.assign(target, newState);
      });
    };

    // TODO avoid this effect if loadAsync is not defined
    useEffect(() => {
      loadAsync();
    }, [router.pathname]);

    return (
      <UpdateContext.Provider value={{ setState, ...actions } as any}>
        <StateContext.Provider value={state as any}>
          {children}
        </StateContext.Provider>
      </UpdateContext.Provider>
    );
  }

  function useState(): UseStateResult<T, M> {
    const { setState, ...mutations } = useContext(UpdateContext);
    return [useContext(StateContext), setState, mutations as any];
  }

  return [Provider, useState];
}
```

The `createState` function can be used as follow:

```typescript
// auth state
const initialState = {
  id: "",
  name: "",
  email: "",
  is_owner: false,
  is_admin: false,
  is_authenticated: !!getApiToken(),
};

type State = typeof initialState;

const [UserProvider, useUser] = createState({
  initialState,
  loadState: fetchAuthState,
});

export { UserProvider, useUser };

async function fetchAuthState(): Promise<State> {
  if (!getApiToken()) {
    return initialState;
  }
  try {
    const resp = await api.me();
    return {
      ...initialState,
      ...resp.data,
      is_authenticated: true,
    };
  } catch (err) {
    return initialState;
  }
}

// example login page
function LoginPage() {
   const [_, setUser] = useUser();
   const handleSubmit = async () => {
       const resp = await api.login(form);
       setUser({
            ...omit(resp.data, ['token', "token_expired_at"]),
          is_authenticated: true,
       });
   };
   return <div> Login Form </div>
}
```

> The example is truncated a bit to save your time.

This function allows specifying custom typed mutations as an object with functions accepting current state to be mutated. This can be optionally used to decompose a reducer function with big switch into smaller mutation functions. And you don't need to define actions, just define functions with parameters.

Enjoy! EOF :smile:
