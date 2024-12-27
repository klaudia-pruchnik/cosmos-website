function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidImageUrl(value) {
  return value && value.startsWith("http");
}

const _isValidText = isValidText;
export { _isValidText as isValidText };
const _isValidImageUrl = isValidImageUrl;
export { _isValidImageUrl as isValidImageUrl };
