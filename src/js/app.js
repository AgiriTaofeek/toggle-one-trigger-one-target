import Toggle from "./toggle";

// Toggle buttons
const toggleBtns = new Toggle();
// const toggleBtns = new Toggle({
//   onToggle: (btn, target, isToggled) => {
//     btn.textContent = isToggled ? "➖" : "➕";
//   },
// });

//Dismissible component to reuse the toggle functionality
const Dismissible = new Toggle({
  attr: "data-dismiss",
  toggleContainer: ".dismissible",
});

//We can apply this Toggle functionality to many other components like dropdown menu, Accordion, tab,  modal dialog and many more. Only the CSS presentation defers. The framework requires a (1)Trigger element - It contains a data attribute whose value must be the class name of the Target element with the dot e.g (data-toggle = .target) and if we want an Id (data-toggle = #target) (2)Target element - The 'active' class name or whatever class name we specify will be toggled on this element applying some CSS presentation (3)Container element for both the Trigger and Target element
