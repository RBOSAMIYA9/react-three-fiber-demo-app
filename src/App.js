import { Suspense, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from "@react-three/drei";
import Archer from "./Archer";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import classRoom from "./scene.glb";
import "./styles.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { keysState as keysStateAtom } from "./allStates";
// import { moveChar } from "./charMovement";
// https://codesandbox.io/s/react-three-fiber-animation-mixer-gm4fx?file=/Archer.js

// let counter = 0;

function App() {
  const [action, setAction] = useState("Standing Idle");
  // const [keys, setKeys] = useState({})
  // const keys = useRecoilValue(keysStateAtom);
  // const [pressedKeys, setPressedKeys] = useRecoilState(keysStateAtom);

  const moveChar = (keys) => {
    const asArray = Object.entries(keys);

    const filtered = asArray.filter(([key, value]) => value === true);
    let filteredObj = {};
    filtered.forEach((item) => {
      filteredObj[item[0]] = item[1];
    });
    // console.log("keys in charMove", filteredObj);
    return filteredObj;
  };

  let keyPressed = {};

  const allowedKeys = ["w", "a", "s", "d"];
  document.addEventListener("keydown", (event) => {
    if (allowedKeys.includes(event.key.toLowerCase())) {
      keyPressed[event.key.toLowerCase()] = true;
      // console.log("keysdown: ", counter++, " ", keyPressed);
      let filteredObj = moveChar(keyPressed);
      console.log("filteredObj down", filteredObj);
      // setAction("Run Forward");
      let ans = throttle(() => {
        setAnimation("Run Forward");
      }, 50);
      ans();
    }
  });
  function setAnimation(animation) {
    setAction(animation);
    console.log("animation set");
  }
  document.addEventListener("keyup", (event) => {
    let key = event.key.toLowerCase();
    // console.log("key", key);
    if (allowedKeys.includes(key)) {
      keyPressed[event.key.toLowerCase()] = false;
      // console.log("keysup: ", counter++, " ", keyPressed);
      let filteredObj = moveChar(keyPressed);
      console.log("filteredObj up", filteredObj);
      let ans = throttle(() => {
        setAnimation("Standing Idle");
      }, 50);
      // console.log("retut",);
      ans();
    }
  });

  function throttle(callback, limit) {
    var waiting = false; // Initially, we're not waiting
    return function () {
      // We return a throttled function
      if (!waiting) {
        // If we're not waiting
        callback.apply(this, arguments); // Execute users function
        waiting = true; // Prevent future invocations
        setTimeout(function () {
          // After a period of time
          waiting = false; // And allow future invocations
        }, limit);
      }
    };
  }

  function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }

  const Model = () => {
    const gltf = useLoader(GLTFLoader, classRoom);
    return <primitive object={gltf.scene} receiveShadow scale={0.01} />;
  };

  const Lights = () => {
    return (
      <>
        <mesh position={[0, 10, 0]}>
          <ambientLight args={"#fff"} intensity={0.9} castShadow />
        </mesh>
      </>
    );
  };
  return (
    <>
      <Canvas camera={{ position: [0, 1, 2] }} shadowMap>
        <ambientLight castShadow />
        <pointLight intensity={2} position={[-1, 1, 3]} color="white" />
        <pointLight intensity={2} position={[1, 1, 3]} color="white" />
        <pointLight intensity={2} position={[0, 3, -10]} color="white" />
        <Lights />
        <Suspense fallback={null}>
          <Archer action={action} />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
        <OrbitControls target={[0, 1, 0]} />
        {/* <Environment preset="park" background /> */}
      </Canvas>
      <div className="controls">
        <button onClick={() => setAction("Run Forward")}>Run Forward</button>
        <button onClick={() => setAction("Death")}>Death</button>
        <button onClick={() => setAction("Draw Arrow")}>Draw Arrow</button>
        <button onClick={() => setAction("Standing Idle")}>Idle</button>
      </div>
    </>
  );
}

export default App;
