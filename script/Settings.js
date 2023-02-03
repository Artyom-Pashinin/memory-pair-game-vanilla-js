class Settings {
  constructor(configurations) {
    this.layouts = [...configurations.layouts];
    this.currentLayout = undefined; 
    this.settingsTemplate = document.querySelector("[data-layout-btns]");
    this.fillLayoutOptionsList();
    this.setCurrentLayout(1);
  }

  fillLayoutOptionsList() {
    // clear container
    this.settingsTemplate.innerHTML = "";
    
    // create an option element and append to side menu
    for (let i = 0; i < this.layouts.length; i++) {
      let option = document.createElement("div");
      option.classList.add("", "btn");
      option.setAttribute('data-layout-option', this.layouts[i].id);
      option.textContent = this.layouts[i].name;

      

      this.settingsTemplate.appendChild(option);
    }
    this.settingsTemplate.firstChild.classList.add("side-menu__layout-option-btn--selected");
    
    // add click listener to all layout options
    this.settingsTemplate.addEventListener("click", (event) => {
      if(event.target.matches("[data-layout-option]")) {
        this.removeSelectionFromAll();
        event.target.classList.add("side-menu__layout-option-btn--selected");
        this.setCurrentLayout(event.target.getAttribute("data-layout-option"));
      }
    });
  }

  setCurrentLayout(optionID) {
    this.currentLayout = this.layouts.find(layout => layout.id == optionID);
    let layoutChangeEvent = new CustomEvent('layoutChangeEvent', {
      bubbles: true,
      detail: {
        layout: this.currentLayout,
      }
    });
    document.querySelector(`[data-layout-option=\"${this.currentLayout.id}\"]`).dispatchEvent(layoutChangeEvent);
  }

  removeSelectionFromAll() {
    document.querySelectorAll(".side-menu__layout-option-btn--selected")
    .forEach(btn => {
      btn.classList.remove("side-menu__layout-option-btn--selected");
    });
  }
}