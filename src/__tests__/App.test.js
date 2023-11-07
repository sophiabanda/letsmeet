import { render } from "@testing-library/react";
import App from "../App";

describe("<App /> component", () => {
  test("renders list of events", () => {
    const AppDOM = render(<App />).container.firstChild;
    //here, firstChild is how you reference the DOM node, the first empty div inside of the app component
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
    //matcher function are always chained to expect, ie toBeInDoc
  });
});
