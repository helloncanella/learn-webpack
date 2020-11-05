export default (text = HELLO) => {
  const element = document.createElement("h3");
  element.innerHTML = text;
  console.log("rapo");
  return element;
};
