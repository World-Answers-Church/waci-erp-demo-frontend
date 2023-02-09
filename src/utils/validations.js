export function isValidEmail(email) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;

  return reg.test(email);
}

export function isValidText(text) {
  // for eliminating alphanumeric input
  let regex = /^[a-zA-Z]+$/g;
  let res = regex.test(text);

  return text.length >= 3 && text.length <= 16 ? res : false;
}

export function isValidPhoneNumber(number) {
  if (number.length === 10) {
    if (number.startsWith("07")) {
      if (["7", "8", "6", "4", "5", "0", "2"].includes(number[2])) {
        return true;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function isValidYear(year) {
  //validating years since 2002
  let regex = /^20(0[2-9]|1[0-9]|2[0-3])$/;

  return regex.test(year);
}
