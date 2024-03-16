export default class Toggle {
  /**
   * Instantiate Toggle component
   * @param {Options} options - Toggle component configuration options
   * @returns {Toggle}
   */
  constructor(options) {
    /**
     * Toggle component configuration
     * @type {Options}
     */
    this.config = Object.assign(
      {
        attr: "data-toggle",
        toggleContainer: ".toggle",
        toggleClass: "active",
        onToggle: (btn, target, isToggled) => {},
      },
      options
    );

    //Init listeners
    this.init();

    return this;
  }

  //Init listener
  init() {
    //Click event listener
    document.addEventListener("click", this.toggle.bind(this));
  }

  /**
   *
   * @param {MouseEvent} e - click event
   * @return {void}
   */
  toggle(e) {
    // Not a toggle button?
    if (!e.target.matches(`[${this.config.attr}], [${this.config.attr}] *`))
      return;

    //prevent default click
    e.preventDefault();

    //Select trigger element
    const btn = e.target.closest(`[${this.config.attr}]`);

    //Select the value of the data attribute from the trigger element
    const attrValue = btn.getAttribute(this.config.attr);

    //FIXME - Selecting target element using the value of the data attribute of the trigger element
    // const target = document.querySelector(attrValue); // There is an issue with this, as the querySelector would select the first target element in the DOM with a class of reactions hence we can instead traverse the DOM based on our HTML to make sure a unique target element is selected always

    //REVIEW - Alternative approach 1
    // const target = btn.parentElement.querySelector(`.${attrValue}`);

    //REVIEW - Alternative approach 2 (Not Advisable)
    // const target = btn.nextElementSibling;

    //REVIEW - Best approach is to group the trigger and target element into a div element with a class of toggle and use it as a local scope
    const targetParent = btn.closest(this.config.toggleContainer);

    const target = targetParent.querySelector(attrValue);

    //Toggle target element
    target.classList.toggle(this.config.toggleClass);

    //isToggled
    const isToggled = target.classList.contains(this.config.toggleClass);

    //Set button aria-expanded attribute
    btn.setAttribute("aria-expanded", isToggled);

    //Fire onToggle event for every click event
    this.config.onToggle(btn, target, isToggled);
  }
}

/**
 * Component configuration options
 * @typedef {Object} Options
 * @property {string} attr - Trigger element data attribute
 * @property {string} toggleContainer - Trigger element and Target element parent element
 * @property {string} toggleClass - class added and removed on the target element
 * @property {onToggle} onToggle - Called on each click event with access to trigger element, target element and toggled state(boolean)
 */

/**
 * onToggle callback function
 * @callback onToggle
 * @param {HTMLElement} btn - Trigger element
 * @param {HTMLElement} target - Target element
 * @param {boolean} isToggled - Target toggled state
 */
