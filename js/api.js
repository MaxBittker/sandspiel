var storage;
var functions;
try {
  storage = firebase.storage();
  functions = firebase.functions();
} catch (e) {}
window.onload = () => {
  functions = firebase.functions();
  storage = firebase.storage();
};

export { functions, storage };
