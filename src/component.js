export default (text = "reco") => {
  const element = document.createElement("h3");
  element.innerHTML = text;
  return element;
};
