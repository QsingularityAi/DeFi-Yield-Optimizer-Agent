// This file provides browser polyfills for Node.js modules used by NEAR libraries

// Buffer polyfill
import { Buffer } from 'buffer';
window.Buffer = Buffer;

// Process polyfill (minimal implementation)
if (!window.process) {
  window.process = {
    env: {},
    nextTick: fn => setTimeout(fn, 0),
  };
}

// Crypto polyfill is automatically handled by Vite for most use cases

// Polyfill global
window.global = window;