function pad(number) {
    return String(number).padStart(2, "0");
}

function isLeapYear(year) {
    return (!(year % 4)) ? ((!(year % 100)) ? !(year % 400) : true ): false;
}

function getDate(option) {
    const targetDate = new Date();

    if (option.match("tmrw")) {
        targetDate.setDate(targetDate.getDate() + 1); 
    }

    const year = targetDate.getFullYear();
    const month = pad(targetDate.getMonth() + 1);
    const day = pad(targetDate.getDate());

    return `${year}-${month}-${day}`;
}

function toggleSelectedElements(element, selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(elmt => {
        elmt.classList.remove("selected");
    })
    
    element.classList.add("selected");
}

function toggleSelectedOption(option, type) {
    toggleSelectedElements(option, `.${type}-option`);
}

/**
 * Returns a data preset by comparing a given date with today and tomorrow dates
 */
function getDueDateOption(date) {
    const todayObj = new Date();
    const tmrObj = new Date();
    tmrObj.setDate(todayObj.getDate() + 1);

    const today = `${todayObj.getFullYear()}-${pad(todayObj.getMonth() + 1)}-${pad(todayObj.getDate())}`;
    const tmr = `${tmrObj.getFullYear()}-${pad(tmrObj.getMonth() + 1)}-${pad(tmrObj.getDate())}`


    if (date == today) {
        return "today";
    } else if (date == tmr) {
        return "tmrw";
    } else {
        return "pick";
    }
}

function toggleSelectedTab(tab) {
    toggleSelectedElements(tab, ".tab");
}

function capitalize(word) {
    const firstLetter = word.slice(0, 1).toUpperCase();
    const rest = word.slice(1).toLowerCase();

    return firstLetter + rest;
}

export { pad, getDate, toggleSelectedOption, getDueDateOption, toggleSelectedTab, capitalize }