"use client"

import { DesiredOutput } from "./components/DesiredOutput";
import { Provider } from "react-redux";
import store from '@/lib/store'
import { RecipesSelectors } from "./components/RecipesSelectors";
import { Report } from "./components/Report";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex flex-row">
        <div className="basis-1/2">
          <div className="flex flex-col">
            <DesiredOutput />
            <Report />
          </div>
        </div>
        <div className="basis-1/2">
          <RecipesSelectors />
        </div>
      </div>
    </Provider>
  );
}
