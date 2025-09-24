# Development Container

This directory contains the configuration for a VS Code development container that provides a consistent development environment for the Foxhole Materials Calculator project.

## Features

- **Pre-configured Node.js 20** environment
- **Auto-installed npm dependencies** on container creation
- **GitHub Copilot** integration for AI-powered development
- **Essential VS Code extensions** for React/TypeScript/Tailwind development
- **Configured code formatting** with Prettier and ESLint
- **Jest testing integration** with automatic test watching
- **Port forwarding** for the Next.js development server (port 3000)

## Getting Started

1. **Install VS Code** and the **Dev Containers extension**
2. **Open this repository** in VS Code
3. **Click "Reopen in Container"** when prompted, or use the Command Palette (Ctrl+Shift+P) and select "Dev Containers: Reopen in Container"
4. **Wait for the container to build** (first time may take a few minutes)
5. **Start coding!** Dependencies are automatically installed

## Included Extensions

- GitHub Copilot & Copilot Chat
- TypeScript & React support
- Tailwind CSS IntelliSense
- Prettier code formatting
- Jest test runner
- Auto rename tag
- Path IntelliSense

## Development Workflow

Once in the container:
- **Start dev server**: `npm run dev` (or use VS Code tasks)
- **Run tests**: `npm test` (or use the Jest extension)
- **Format code**: Save files (auto-formatting enabled)
- **Debug**: Use F5 or the Debug panel

The development server will be automatically forwarded to your local machine at http://localhost:3000.