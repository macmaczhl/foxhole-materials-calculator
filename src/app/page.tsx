"use client";

import { ItemsManager } from "./components/ItemsManager";
import { Provider } from "react-redux";
import store from "@/lib/store";
import { RecipesSelectors } from "./components/RecipesSelectors";
import { Report } from "./components/Report";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:basis-1/2">
          <div className="flex flex-col">
            <ItemsManager />
            <Report />
          </div>
        </div>
        <div className="w-full lg:basis-1/2">
          <RecipesSelectors />
        </div>
      </div>
    </Provider>
  );
}
