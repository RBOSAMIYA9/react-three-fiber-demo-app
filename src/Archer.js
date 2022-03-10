import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model({ action }) {
  const group = useRef();
  const previousAction = usePrevious(action);
  const { nodes, materials, animations } = useGLTF("/archer-animation.glb");
  const { actions } = useAnimations(animations, group);
  // console.log("actions",actions);
  useEffect(() => {
    console.log("previousAction",previousAction ,"current action",action)
    if (previousAction) {
      actions[previousAction].fadeOut(0.1);
      actions[action].stop();
    }
    actions[action].play();
    actions[action].fadeIn(0.2);
  }, [actions, action, previousAction]);
  return (
    <group ref={group}  castShadow dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={nodes.Erika_Archer_Body_Mesh.geometry}
          material={materials.Body_MAT}
          skeleton={nodes.Erika_Archer_Body_Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Erika_Archer_Clothes_Mesh.geometry}
          material={materials.Akai_MAT}
          skeleton={nodes.Erika_Archer_Clothes_Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Erika_Archer_Eyelashes_Mesh.geometry}
          material={materials.Lashes_MAT}
          skeleton={nodes.Erika_Archer_Eyelashes_Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Erika_Archer_Eyes_Mesh.geometry}
          material={materials.EyeSpec_MAT}
          skeleton={nodes.Erika_Archer_Eyes_Mesh.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/archer-animation.glb");

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
