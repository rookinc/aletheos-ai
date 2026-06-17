# G900 legacy runtime inventory

Status: legacy inventory recorded.

Current blank rebuild active files are expected to be `lab.html`, `lab.css`, and `g900_grammar_stage_v0.js`.
This inventory covers dormant legacy runtime files only.

## legacy/lab_boot.js

- lines: 1150
- imports:
  - ./kernel/local_storage_lenses.js :: { createLocalLens, deleteLocalLens, getLocalLens, loadLocalLenses }
  - ./kernel/camera.js :: { createCamera, clamp }
  - ./kernel/g900_data.js :: { loadG900Phase30 }
  - ./kernel/g900_geometry.js :: { buildVertices, buildEdges }
  - ./kernel/renderer.js :: { renderScene }
- exports: none
- functions/classes: applyLayerCamera, applySettingsFromUrl, applySettingsPreset, applySharedGraphLensOption, bindStageTouchControls, bodyOpacity, boolParam, buildSettingsUrl, cameraDeg, clampSheetRate, closeShareDialog, consoleText, currentPresetLabel, currentSettingsParams, deleteSelectedLocalLens, draw, edgeEnabled, edgeOpacity, faderViewLabel, frame, layer, loadLocalLensById, localLensIdFromValue, localLensValue, numericParam, openShareDialog, percentSliderValue, pointerDistance, renderLocalLensOptions, resetView, saveCurrentLensToLocalStorage, selectedLocalLensId, setCameraPreset, setCheckboxValue, setSharedGraphLensOption, setSheetRate, setSliderValue, sheetRate, sourceLabel, stepSheets, surfaceOpacity, syncSheetRateNumber, touchEnabled, trailAmount, trailEnabled, trailPercent, updateLocalLensControls, updateRateReadout, updateShareUrlText, vertexEnabled, vertexOpacity, wrapAngle
- constants: LAYERS, LOCAL_LENS_VALUE_PREFIX, PREFERRED_CANDIDATE_ID, SETTINGS_PRESETS, SHEET_COUNT, ZOOM_MAX, ZOOM_MIN
- DOM ids touched: body-opacity-readout, body-opacity-slider, camera-preset-1, camera-preset-2, camera-preset-3, camera-text, edge-opacity-readout, edge-opacity-slider, edge-toggle, fps-readout, layer-select, metrics-console, play-pause-btn, reset-btn, settings-delete-lens-btn, settings-export-url-btn, settings-preset-select, settings-save-lens-btn, settings-saved-lenses-optgroup, settings-share-close, settings-share-copy, settings-share-dialog, settings-share-name-input, settings-share-url-text, sheet-rate-apply, sheet-rate-number, sheet-rate-readout, sheet-rate-slider, stage-canvas, status-text, step-back-btn, step-forward-btn, surface-opacity-readout, surface-opacity-slider, touch-response-toggle, trail-apply, trail-number, trail-readout, trail-slider, trail-toggle, vertex-opacity-readout, vertex-opacity-slider, vertex-toggle
- event types: blur, change, click, input, keydown, pointercancel, pointerdown, pointermove, pointerup, resize, wheel
- render/build/load/create names: buildEdges, buildSettingsUrl, buildVertices, createCamera, createElement, createLocalLens, draw, loadG900Phase30, loadLocalLensById, loadLocalLenses, loaded, renderLocalLensOptions, renderScene, rendered, renderedEdges, renderer

## legacy/kernel/camera.js

- lines: 64
- imports: none
- exports: clamp, createCamera, projectPoint
- functions/classes: rotateX, rotateY, rotateZ
- constants: none
- render/build/load/create names: createCamera

## legacy/kernel/local_storage_lenses.js

- lines: 168
- imports: none
- exports: clearLocalLenses, createLocalLens, deleteLocalLens, getLocalLens, loadLocalLenses, localLensStorageAvailable, saveLocalLenses, updateLocalLens
- functions/classes: normalizeLens, readRawStorage, safeId, safeNowIso, writeRawStorage
- constants: G900_LENS_SCHEMA_VERSION, G900_LENS_STORAGE_KEY
- render/build/load/create names: createLocalLens, createdAt, loadLocalLenses

## legacy/kernel/p900_data.js

- lines: 163
- imports: none
- exports: none
- functions/classes: candidatesFromPayload, countNumber, fallbackPayload, normalizeCandidate, normalizeEdge, shortId
- constants: PHASE30_URL
- render/build/load/create names: loadG900Phase30, renderer_defaults

## legacy/kernel/p900_geometry.js

- lines: 85
- imports: none
- exports: buildEdges, buildVertices
- functions/classes: idOf
- constants: none
- render/build/load/create names: buildEdges, buildVertices

## legacy/kernel/renderer.js

- lines: 155
- imports:
  - ./camera.js :: { projectPoint }
- exports: renderScene
- functions/classes: clamp01, domChecked, domSlider, edgeColor, resizeCanvas, setReadout, vertexColor
- constants: none
- render/build/load/create names: renderScene
