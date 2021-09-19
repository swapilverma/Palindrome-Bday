function reverseStr(str){
  var listOfChars = str.split("");
  var reverseList = listOfChars.reverse();
  var reverseStr = reverseList.join("");
  return reverseStr;
}

function isPalindrome(str){
  var reverse = reverseStr(str);
  return str===reverse;
}

function convertDateToStr(date){

  var dateStr = { day: '', month: '', year: ''};

  if(date.day<10){
    dateStr.day = "0" + date.day;
  }
  else{
    dateStr.day = date.day.toString();
  }

  if(date.month<10){
    dateStr.month = "0" + date.month;
  }
  else{
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormarts(date){

  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.date + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd =  dateStr.year.slice(-2) + dateStr.month + dateStr.date

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormat(date){
  var listOfPalindrome = getAllDateFormarts(date);

  var check = false;

  for(var i=0; i<listOfPalindrome.length; i++){
    if(isPalindrome(listOfPalindrome[i])){
      check = true;
      break;
    }
  }
  
  return check; 
}

function isLeapYear(year){
  if(year%400===0){
    return true;
  }
  if(year%100 === 0){
    return False;
  }
  if(year%4 === 0){
    return true;
  }
  return false;
}


function getNextDate(date){
  var day = date.day+1
  var month = date.month
  var year = date.year

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if(month === 2){
    if(isLeapYear(year)){
      if(day>29){
        day = 1;
        month++;
      }
    }
    else {
        if(day > 28){
         day = 1;
         month++; 
        }
      }
    }
    //check for leap year
  else {
    if (day>daysInMonth[month-1]){
      day = 1;
      month++;
    }
  }

  if (month>12){
    month =1;
    year++;
  }

  return {
    day: day,
    month:month,
    year: year
  };
}

function getNextPalindromDate(date){
  var count = 0;
  var nextDate = getNextDate(date);

  while(1){
    count++;
    var isPalindrome = checkPalindromeForAllDateFormat(nextDate);
    if (isPalindrome){
      break;
    }
    nextDate = getNextDate(nextDate);
  }  
  return [count, nextDate];
}

function getPrevDate(date){
  var day = date.day-1
  var month = date.month
  var year = date.year

} //do Yourself
// var date = {
//   day: 23,
//   month: 01,
//   year: 1997
// };

// console.log(getNextPalindromDate(date)); \

var dateInput = document.querySelector("#bday-input");
var bdayBtn = document.querySelector("#bday-btn");
var resultRef = document.querySelector("#result");

function clickhandler(e){
  var bdayStr = dateInput.value;

  if (bdayStr !== ''){
    var listOfdate = bdayStr.split('-');
    var date = {
      day: Number(listOfdate[2]),
      month: Number(listOfdate[1]),
      year: Number(listOfdate[0])
    };
    
    var isPalindrome = checkPalindromeForAllDateFormat(date);

    if (isPalindrome) {
      resultRef.innerText = "Yup! your birthday is a Palindrome. 🤩"
    }

    else{
      var [count, nextDate] = getNextPalindromDate(date)
      resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days! 😔`;
    }
  }
}

bdayBtn.addEventListener('click', clickhandler)