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
        var dateStr = numberToStringConversion(nextDate);
        var resultList = checkPalindromeForAllDateFormats(dateStr);

        // for (let i=0; i<resultList.length; i++){
        //     if(resultList[i])
        // }
        console.log(resultList);
        break;
    }

}


var date = {
    day : 31,
    month: 12,
    year: 2020
}

console.log(getNextPalindromeDate(date));


