const openGameSelect = () => {
  let elem = document.getElementById("game-menu")
  console.log(elem.isOpen)
  if (!elem.isOpen) {
    elem.style.width = "250px";
    elem.isOpen = true;
    elem.focus();
  }
}

const closeGameSelect = () => {
  let elem = document.getElementById("game-menu")
  elem.isOpen = false;
  document.getElementById("game-menu").style.width = "0";
}


document.getElementById("game-menu").addEventListener("focusout", (event) => {
    let elem = document.getElementById("game-menu")
    closeGameSelect();
});


const openOptions = () => {
  let elem = document.getElementById("options-menu")
  console.log(elem.isOpen)
  if (!elem.isOpen) {
    elem.style.width = "350px";
    elem.isOpen = true;
    elem.focus();
  }
}

const closeOptions = () => {
  let elem = document.getElementById("options-menu")
  elem.isOpen = false;
  document.getElementById("options-menu").style.width = "0";
}


document.getElementById("game-menu").addEventListener("focusout", (event) => {
    let elem = document.getElementById("game-menu")
    closeGameSelect();
});

document.getElementById("options-menu").addEventListener("focusout", (event) => {
    let optionsMenu = document.getElementById("options-menu")
    if (!optionsMenu.contains(event.relatedTarget)) {
          closeOptions();
    }
});
