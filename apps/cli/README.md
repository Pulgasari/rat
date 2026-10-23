# Concept Specification: Client-Side WASM Micro-Terminal

## 1. Overview
This document defines the high-level specification for a client-side, browser-based terminal application powered by WebAssembly (WASM). The goal is to provide users with a functional command-line interface directly within the browser capable of executing utility CLI binaries (e.g., ImageMagick, FFmpeg, Pandoc) entirely on the client hardware.

## 2. Core Vision & Principles
- Privacy First: Files and data are processed entirely inside the client browser. No file data is uploaded to external servers.
- Zero Server Compute: Server infrastructure is limited to static asset hosting (HTML, JS, WASM binaries). Compute resources scale with the client device.
- Modular & Lightweight: The initial page load remains minimal. WASM tools are fetched dynamically on demand.
- Offline Capability: Functionality as a Progressive Web App (PWA), allowing offline execution once required WASM packages are cached.
- Device Portability: Accessible across desktop and mobile browsers with adaptive UI.

## 3. Core Functional Requirements
- Terminal Emulator UI: An interactive terminal interface supporting command entry, stdout/stderr rendering, history navigation, and key bindings.
- Package Manager / Dynamic Initialization:
  - A built-in management command (e.g., `init <tool_name>`) that dynamically retrieves and instantiates WASM binaries.
  - A local module registry that maps executable aliases to loaded WASM routines.
- Virtual File System (VFS):
  - In-memory VFS for execution scratch space.
  - Mounting capabilities for local user files via Drag-and-Drop or File System APIs.
- Optional Account & Synchronization Layer:
  - Client-side data storage for user preferences, custom aliases, and active package lists.
  - Synchronizable configuration profile across multiple devices via a lightweight cloud sync service.

## 4. Target Use Cases
- Media conversion (JPG/PNG/WEBP batch conversions, SVG rendering).
- Text processing (Markdown to PDF/HTML via Pandoc or similar tools).
- File manipulation and metadata extraction directly on mobile or desktop browsers.

---

# Technical Implementation Specification: Phase 1 Architecture

## 1. System Architecture
The application architecture comprises four distinct layers:

```
+-------------------------------------------------------------+
|                     Terminal UI Layer                       |
|                   (xterm.js + WebGL Addon)                  |
+------------------------------+------------------------------+
                               | Event Stream / I/O
+------------------------------v------------------------------+
|                   Command Processor / CLI                    |
|             (Parser, Alias Registry, Package Manager)       |
+------------------------------+------------------------------+
                               | Data Exchange
+------------------------------v------------------------------+
|               Virtual File System (VFS Layer)               |
|            (In-Memory FS / OPFS Access Layer)               |
+------------------------------+------------------------------+
                               | Execution Channel
+------------------------------v------------------------------+
|                 Worker Execution Engine                     |
|            (Web Worker Pool + WASI/Emscripten)              |
+-------------------------------------------------------------+
```

## 2. Component Breakdown

### 2.1 Terminal UI (`xterm.js`)
- Renders standard terminal graphics and ANSI escape sequences.
- Handles keyboard shortcuts, buffer scrolling, and window resizing.
- Implements prompt state management and command history navigation (Up/Down arrow keys).

### 2.2 Command Parser & Registry
- Command Parsing: Splits raw input into command strings, argument arrays, and flags.
- Built-in Commands:
  - `help`: Lists available built-in commands and initialized tools.
  - `init <tool>`: Dynamic loader that fetches WASM package JS wrapper and `.wasm` payload from CDN.
  - `ls`, `cd`, `rm`, `cat`: VFS navigation commands.
  - `upload` / `download`: File transfer operations between host machine and VFS.
- Custom Tool Routing: Routes recognized executable commands to the corresponding loaded WASM instance.

### 2.3 Virtual File System (VFS)
- Primary Storage Engine: Origin Private File System (OPFS) for persistent, low-overhead file storage on browser threads.
- Fallback/Scratchpad Engine: In-memory POSIX-like file system provided by Emscripten MEMFS / WASI VFS.
- Interoperability: Bridge module to read binary array buffers from user-selected local files and write results back to browser downloads.

### 2.4 Execution Threading (Web Worker Isolates)
- Offloads heavy CPU-bound WASM computations away from the main UI thread.
- Standard I/O Interception: Redirects POSIX `stdout` and `stderr` streams from Web Worker to `xterm.js` via `postMessage` channels.
- Cancellation Control: Worker termination mechanism to interrupt running jobs without freezing or crashing the tab.

## 3. Package Structure for Tool Initialization
When executing `init <package>`:
1. Verify package existence in online repository index.
2. Fetch wrapper JS loader and binary payload.
3. Instantiating WASM module within dedicated Web Worker context.
4. Register binary entrypoint in active Session Command Table.

## 4. Phase 1 Implementation Milestones
- Milestone 1: Setup basic web page with `xterm.js` integrated and local command prompt loop.
- Milestone 2: Build VFS layer with basic file import/export UI.
- Milestone 3: Create Web Worker WASM runner with STDOUT/STDERR streaming.
- Milestone 4: Integrate first WASM tool (e.g., ImageMagick `@imagemagick/magick-wasm`).
- Milestone 5: Validate memory cleanup and tab stability under repeated executions.
