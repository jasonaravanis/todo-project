import { getDOMelements, getElements } from "./getDOMelements.js"

export const publishItem = (item) => {
    console.log("publish item activated")
    const DOM = getDOMelements()

    // Basic item module set up
    const itemModule = document.createElement("div")
    const itemModuleTitle = document.createElement("h1")
    const itemModuleDetails = document.createElement("ul")
    itemModule.appendChild(itemModuleTitle)
    itemModule.appendChild(itemModuleDetails)

    // Filling in module details
    itemModuleTitle.textContent = item.title
    const itemProperties = Object.keys(item)
    for (let i = 0; i < itemProperties.length; i++) {
        if (item[itemProperties[i]] != undefined) {
            let dotpoint = document.createElement("li")
            itemModuleDetails.appendChild(dotpoint)
            dotpoint.textContent = `${itemProperties[i]}: ${item[itemProperties[i]]}`
        }
    }
    DOM.contentWindow.appendChild(itemModule)
}