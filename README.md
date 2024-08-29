# Chatset Viewer

Chatset Viewer is an Electron-based application for viewing chat-based LLM datasets in JSONL format.

## Features

- Load and view JSONL files containing chat conversations
- Navigate through multiple chat examples
- Render markdown content in messages
- Cross-platform support (Windows, macOS, Linux)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/snapbooks-app/chatset-viewer.git
   ```

2. Navigate to the project directory:
   ```
   cd chatset-viewer
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Usage

To start the application in development mode:

```
## How to Use

1. Click the "Load" button (folder icon) to select a JSONL file containing chat data.
2. Use the "Previous" and "Next" buttons to navigate through the chat examples.
3. Messages are color-coded based on their role (user, assistant, or system).

## Development

The project uses the following technologies:

- Electron
- HTML/CSS (with Tailwind CSS and DaisyUI)
- JavaScript

Main files:
- `main.js`: Electron main process
- `renderer.js`: Electron renderer process
- `index.html`: Main application view
- `chatLoader.js`: Module for loading chat files

## Building and Releasing

The project uses GitHub Actions for automated builds and releases. When a new tag is pushed, it triggers a workflow that builds the application for Windows, macOS, and Linux.

## License

This project is licensed under the MIT License. See the LICENSE file for details.