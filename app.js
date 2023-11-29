const bell = document.querySelector(".notification-bell")
const notifications = document.querySelector(".notification-dropdown")
const profileDropdown = document.querySelector(".profile-dropdown-container")
const profile = document.querySelector(".profile-dropdown-box")
const planAd = document.querySelector("#plan-select")
const cancelAd = document.querySelector(".btn-cancel")
const setUpList = document.querySelector("#setup-list")
const setUpToggle = document.querySelector("#toggle-full-width")
const setUpHidden = document.querySelectorAll(".setup-hidden")
const setUpItems = document.querySelectorAll(".setup-item")
const progress = document.querySelector("#progress")
const progressLabel = document.querySelector("#progress-label")
const checkBoxes = document.querySelectorAll(".setup-checkbox")
const menuItems = document.querySelectorAll("[role=menuitem]")
let isVisible = false
let completed = 0
let width = 0

function showNotifications() {
    notifications.classList.toggle("visible")
    if (bell.attributes["aria-expanded"].value === "true") {
        bell.ariaExpanded = "false"
    } else {
        bell.ariaExpanded = "true"
    };
}

function showProfile() {
    profile.classList.toggle("visible")
    if (profileDropdown.attributes["aria-expanded"].value === "true") {
        profileDropdown.ariaExpanded = "false"
    } else {
        profileDropdown.ariaExpanded = "true"
    }
    menuItems.item(0).focus()
}

function clearAdvert() {
    planAd.style.display = "none"
}

function toggleFullWidth() {
    setUpToggle.classList.toggle("rotate")
    const isCollapsed = setUpList.style.display === "none"
    console.log(isCollapsed);
    if (isCollapsed) {
        setUpList.style.display = "block"
    } else {
        setUpList.style.display = "none"
    }
}

function showHidden(item, index) {
    item.addEventListener("click", function () {
        console.log(isVisible);
        if (isVisible) {
            if (setUpHidden[index].classList.contains("visible")) {
                return
            } else {
                for (let i = 0; i < setUpHidden.length; i++) {
                    setUpHidden[i].classList.remove("visible")
                    setUpItems[i].classList.remove("expanded-item")
                }
            }
            setUpHidden[index].classList.add("visible")
            setUpItems[index].classList.add("expanded-item")
        } else {
            hideHidden(index)
        }

        
    })
}


function hideHidden(index) {
    let nextSetupIndex = index + 1
    
    if (index === setUpHidden.length - 1) {
        setUpHidden[index].classList.remove("visible")
        setUpItems[index].classList.remove("expanded-item")
        setUpItems[0].classList.add("expanded-item")
        setUpHidden[0].classList.add("visible")
    } else {
        for (let i = 0; i < setUpHidden.length; i++) {
            setUpHidden[i].classList.remove("visible")
            setUpItems[i].classList.remove("expanded-item")
        }
        setUpHidden[nextSetupIndex].classList.add("visible")
        setUpItems[nextSetupIndex].classList.add("expanded-item")        
    }
    
}

function toggleCompleted(item, index) {
    checkBoxes[index].addEventListener("click", function () {
        let children = checkBoxes[index].children;
        hideHidden(index)

        if (children[0].classList.contains("checkbox-hidden")) {
            children[2].classList.add("checkbox-hidden")
            children[1].classList.remove("checkbox-hidden")
            setTimeout(() => {
                children[1].classList.add("checkbox-hidden")
                children[0].classList.remove("checkbox-hidden")
            }, 1000);
            completed--
            width -= 20
        } else {
            children[0].classList.add("checkbox-hidden")
            children[1].classList.remove("checkbox-hidden")
            setTimeout(() => {
                children[1].classList.add("checkbox-hidden")
                children[2].classList.remove("checkbox-hidden")
            }, 1000);
            completed++
            width += 20
        }
        progressLabel.innerHTML = `${completed}/5 completed`
        progress.style.width = `${width}%`
    })
}


notifications.addEventListener("keypress", function(event) {
    if (event.key == "Escape") {
        showNotifications()
    }
})


profileDropdown.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        showProfile()
    }
})

profile.addEventListener("keyup", function(event) {
    if (event.key == "Escape") {
        showProfile()
    }
})

menuItems.forEach(function(item, index) {
    let nextIndex = index + 1
    let prevIndex = index - 1
    item.addEventListener("keyup", function(event) {
        let key = event.key
        if (key == "ArrowDown" || key == "ArrowRight") {
            if (index == menuItems.length - 1) {
                menuItems.item(0).focus()
            } else {
                menuItems.item(nextIndex).focus()
            }
        }

        if (key == "ArrowUp" || key == "ArrowLeft") {
            if (index == 0) {
                menuItems.item(menuItems.length - 1).focus()
            } else {
                menuItems.item(prevIndex).focus()
            }
        }
    })
})

function makeCheckboxVisible(item, index) {
    item.addEventListener("click", function () {
        let children = checkBoxes[index].children;

        if (children[0].classList.contains("checkbox-hidden")) {
            isVisible = true
        } else {
            isVisible = false
        }
    })
}

progressLabel.innerHTML = `${completed}/5 completed`
progress.style.width = `${width}%`
setUpItems[0].classList.add("expanded-item")
setUpHidden[0].classList.add("visible")
bell.addEventListener("click", showNotifications)
profileDropdown.addEventListener("click", showProfile)
cancelAd.addEventListener("click", clearAdvert)
setUpToggle.addEventListener("click", toggleFullWidth)
checkBoxes.forEach(makeCheckboxVisible)
checkBoxes.forEach(toggleCompleted)
setUpItems.forEach(showHidden)
