"use client"

import { DesiredOutput } from "./complonents/DesiredOutput";
import { Provider } from "react-redux";
import store from '@/lib/store'
import { RecipesSelectors } from "./complonents/RecipesSelectors";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex flex-row">
        <div className="basis-1/2">
          <div className="flex flex-col">
            <DesiredOutput />
          </div>
        </div>
        <div className="basis-1/2">
          <RecipesSelectors />
        </div>
      </div>
    </Provider>
  );
}
