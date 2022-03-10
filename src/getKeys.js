import { atom, useRecoilState } from "recoil";

const keysState = atom({
  key: "pressedKeys", // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});

const [pressedKeys, setPressedKeys] = useRecoilState(keysState);
let keyPressed = {};
const allowedKeys = ["w", "a", "s", "d"];
document.addEventListener("keydown", (event) => {
  if (allowedKeys.includes(event.key.toLowerCase())) {
    keyPressed[event.key.toLowerCase()] = true;
    console.log("keysdown", keyPressed);
    // setPressedKeys(keyPressed);
  }
});
document.addEventListener("keyup", (event) => {
  // console.log("key: ", event.key);
  if (allowedKeys.includes(event.key.toLowerCase())) {
    keyPressed[event.key.toLowerCase()] = false;
    console.log("keysup", keyPressed);
    // setPressedKeys(keyPressed);
  }
});
