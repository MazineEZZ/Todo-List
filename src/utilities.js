function pad(number) {
    return String(number).padStart(2, "0");
}

function isLeapYear(year) {
    return (!(year % 4)) ? ((!(year % 100)) ? !(year % 400) : true ): false;
}

function getDate(option) {
    const months31 = [1, 3, 5, 7, 8, 10, 12];
    const months30 = [4, 6, 9, 11];

    const now = new Date();
    let year = now.getFullYear();    
    let month = now.getMonth() + 1;
    let day = now.getDate();

    if (option.match("today")) {
        return `${year}-${pad(month)}-${pad(day)}`;
    } else if (option.match("tmrw")) {
        let nextDay = day + 1;

        if (month == 2) {
            const maxFeb = isLeapYear(year) ? 29 : 28;
            if (nextDay > maxFeb) {
                nextDay = 1;
                month++;
            } 
        } else if (months30.includes(month)) {
            if (nextDay > 30) {
                nextDay = 1;
                month++;
            }
        } else if (months31.includes(month)) {
            if (nextDay > 31) {
                nextDay = 1;
                month++;
            }
        }

        if (month > 12) {
            month = 1;
            year++;
        }

        return `${year}-${pad(month)}-${pad(nextDay)}`;
    }
}

function toggleSelectedOption(option, type) {
    const options = document.querySelectorAll(`.${type}-option`);
    
    options.forEach(opt => {
        opt.classList.remove("selected");
    })

    option.classList.add("selected");
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