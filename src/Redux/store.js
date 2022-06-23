import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import rootReduser from "./rootReduser"

const store = createStore(rootReduser, composeWithDevTools(applyMiddleware()))

export default store;