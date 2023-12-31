const userDob = document.querySelector("#user-dob");
const showBtn = document.querySelector("#show-btn");
const output = document.querySelector("#output");


function reverseString(str){
    var charList = str.split("");
    var reverseList = charList.reverse();
    return reverseList.join("");
}

function isPlaindrome(str){
    var reverseStr = reverseString(str);
    return reverseStr === str;
}

function numberToStringConversion(date){
    var strDate ={}
    if(date.day < 10){
        strDate.day = '0'+date.day;
    } else {
        strDate.day = date.day.toString();
    }

    if(date.month < 10){
        strDate.month = '0'+date.month;
    } else {
        strDate.month = date.month.toString();
    }
    strDate.year = date.year.toString();

    return strDate;
}

function allFormOfDate(date){
    var strDate = numberToStringConversion(date);
    var ddmmyyyy = strDate.day + strDate.month + strDate.year;
    var mmddyyyy = strDate.month + strDate.day + strDate.year;
    var yyyymmdd = strDate.year + strDate.month + strDate.day;
    var ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
    var mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
    var yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;

    console.log([ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd])

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date){
    var listOfDateForms = allFormOfDate(date);

    var flag = false;
    for(let i=0; i<listOfDateForms.length; i++){
        if(isPlaindrome(listOfDateForms[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function leapYearCheck(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(month === 2){
        if(leapYearCheck(year)){
            if(day > 29){
                day = 1;
                month = 3;
            }
        } else {
            if(day > 28){
                day = 1;
                month = 3;
            }
        }
    } else {
        if(day > daysInMonths[month-1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }

    return{
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date){
    var nextDate = getNextDate(date);
    var countDay = 0;

    while(1){
        countDay++;
        var plaindromeCheck = checkPalindromeForAllDateFormats(nextDate);

        if(plaindromeCheck){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [countDay, nextDate]
}

function getPreviousDate(date){
    var day = date.day -1;
    var month = date.month;
    var year = date.year;

    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(month === 3){
        if(leapYearCheck(year)){
            if(day < 1){
                day = 29;
                month = 2;
            }
        } else {
            if(day < 1){
                day = 28;
                month = 2;
            }
        }
    } else {
        if(day < 1){
            if(month < 2){
                day = daysInMonths[11];
                month--;
            } else {
                day = daysInMonths[month-2];
                month--;   
            }
        }
    }

    if(month < 1){
        month = 12;
        year--;
    }

    return{
        day: day,
        month: month,
        year: year
    }
}


function getPreviousPalindromeDate(date){
    var preDate = getPreviousDate(date);
    var countDay = 0;

    while(1){
        countDay++;
        var plaindromeCheck = checkPalindromeForAllDateFormats(preDate);

        if(plaindromeCheck){
            break;
        }
        preDate = getPreviousDate(preDate);
    }
    return [countDay, preDate]
}

function showMsg(next, previous){
    if( next[0] <= previous[0]){
        output.innerText = "😔OOPS! You Missed "+next[0]+" Days,The Nearest Palindrome Date is: "+next[1].day+"-"+next[1].month+"-"+next[1].year
    } else {
        output.innerText = "😔OOPS! You Missed "+previous[0]+" Days,The Nearest Palindrome Date is: "+previous[1].day+"-"+previous[1].month+"-"+previous[1].year
    }
}


function main(date){
    if(checkPalindromeForAllDateFormats(date)){
        output.innerText = "🤩YEY! Your Birthday is Palindrome"
    } else {
        var nextPalinDate = getNextPalindromeDate(date);

        var prePalinDate = getPreviousPalindromeDate(date);
        showMsg(nextPalinDate, prePalinDate);
    }
}


function showBtnClickHandler(){
    var splitDob = userDob.value.split("-")
    if(splitDob[0]){
        var date = {
            day : Number(splitDob[2]),
            month: Number(splitDob[1]),
            year: Number(splitDob[0])
        }
        main(date)

    }
}

showBtn.addEventListener('click', showBtnClickHandler)


