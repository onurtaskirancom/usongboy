const turkishCharMap = {
  ş: 's',
  Ş: 'S',
  ı: 'i',
  İ: 'I',
  ç: 'c',
  Ç: 'C',
  ü: 'u',
  Ü: 'U',
  ö: 'o',
  Ö: 'O',
  ğ: 'g',
  Ğ: 'G',
};

const replaceTurkishChars = (str) => {
  return str
    .split('')
    .map((char) => turkishCharMap[char] || char)
    .join('');
};

export default replaceTurkishChars;
