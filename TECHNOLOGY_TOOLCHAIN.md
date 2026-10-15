# Riyadvi motion and 3D toolchain

## Integrated frontend packages

The frontend includes Three.js, React Three Fiber, Drei, GSAP/ScrollTrigger, Lenis, Motion for React, Lottie React, Rive React Canvas, Spline React, Theatre.js core, and Theatre.js R3F.

The homepage's **Interactive Motion Lab** demonstrates Motion, a local Lottie animation, the existing Three.js/R3F scene, and optional Rive/Spline asset loading. Theatre.js project/sheet initialization is included as a foundation for authored timelines.

## Configure authored assets

Add these variables to the frontend's Vercel project environment settings when you have published assets:

- `VITE_RIVE_FILE_URL`: URL to your exported `.riv` asset.
- `VITE_SPLINE_SCENE_URL`: URL to your published `.splinecode` scene.

Redeploy after setting variables. These asset URLs are intentionally not fabricated; provide real exported assets from the Riyadvi design team.

## Design and 3D asset tools

- **Blender**: create and optimize original 3D models; export optimized GLB/GLTF for use with Three.js/R3F. Blender is a desktop authoring tool, not an npm dependency.
- **getlayers.ai**: use as an external design/asset ideation workflow; exported assets must be reviewed and integrated into the repository.
- **threeui.com**: use as an external Three.js UI/reference resource; it is not a runtime package and should not be represented as an installed integration.
- **Spline**: author/publish a scene and set `VITE_SPLINE_SCENE_URL`.
- **Rive**: author a state machine and set `VITE_RIVE_FILE_URL`.
- **Theatre.js**: author keyed sequences with Theatre's editor; project and sheet initialization is present, but a completed authored timeline still needs to be created and bound to scene properties.

## Motion and accessibility

GSAP/ScrollTrigger remains responsible for the existing page reveal choreography. Motion and Lottie are used in the new lab. The existing site honors reduced-motion preferences for its GSAP choreography; keep the same requirement when adding new animated interactions.
