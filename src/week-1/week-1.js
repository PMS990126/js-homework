let userName = "박민성";

const absoluteZeroCelsius = -273.15;

let isLoggedIn = true;

let userAge = 27;

let productPrice = 39900;

const backgroundColor = "#FFFFFF";

let commentCount = 12;

let currentPageNumber = 3;

let memberGrade = "VIP";

let isButtonClicked = false;

function greetUser(username) {
    return "안녕하세요! " + username + "님. 좋은 하루되세요!";
}

const calculateOriginalPrice = function(priceWithTax) {
    const taxRate = 3.3; 
    const divisor = 1 + (taxRate / 100); 
    const originalPrice = priceWithTax / divisor; 
  
    return originalPrice;
};

const canSellAlcohol = (registrationCard) => {
    const minimumAge = 19; 
  
    if (registrationCard && typeof registrationCard.age === 'number') {
      return registrationCard.age >= minimumAge;
    } else {
      console.error("대충 예외처리");
      return false;
    }
};
  
function getDiscountedPrice(originalPrice, discountPercent) {
    const discountFactor = discountPercent / 100;
  
    const discountedPrice = originalPrice * (1 - discountFactor);
  
    return discountedPrice;
}
  
function getGradeInfo(score) {
    let grade = '';
    let description = '';
  
    if (score >= 90 && score <= 100) {
      grade = 'A';
      description = '매우 우수';
    } else if (score >= 80 && score <= 89) {
      grade = 'B';
      description = '우수';
    } else if (score >= 70 && score <= 79) {
      grade = 'C';
      description = '보통';
    } else if (score >= 60 && score <= 69) {
      grade = 'D';
      description = '미달, 통과 기준 근접';
    } else if (score >= 0 && score <= 59) {
      grade = 'F';
      description = '낙제';
    } else {
      grade = 'Invalid';
      description = '대충 예외처리';
    }
  
    return {
      score: score,
      grade: grade,
      description: description
    };
} 