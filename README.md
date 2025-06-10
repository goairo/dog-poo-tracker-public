# Dog Poo Tracker

A Next.js application for tracking your dog's bathroom habits to monitor their health and well-being.

## Overview

The Dog Poo Tracker is a modern web application built with Next.js and React that helps pet owners monitor their dog's digestive health by tracking bathroom activities. The app features a clean, intuitive interface with health scoring and progress tracking capabilities.

## Features

- Track different types of poo with health scores
- Log timestamps and notes for each entry
- Health monitoring with visual indicators
- Progress tracking over time
- Responsive design with modern UI components
- Dark/light theme support

## Tech Stack

- **Framework**: Next.js 15
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd exercise-dog-poo-tracker
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check for code issues

## Development

The application uses modern React patterns with hooks and TypeScript for type safety. The UI is built with Radix UI components and styled with Tailwind CSS for a consistent, accessible design.

### Project Structure

- `app/` - Next.js app directory with pages and layouts
- `components/` - Reusable React components
- `lib/` - Utility functions and configurations
- `public/` - Static assets