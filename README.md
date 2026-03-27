# Realtime_Chat_App

A simple real-time chat application built with Node.js and Socket.IO.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)

## Overview

This real-time chat application allows users to join different chat rooms and exchange messages in real-time. It uses Node.js on the server side and Socket.IO for real-time communication between clients and the server.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/real-time-chat-app.git
   ```

2. Change to the project directory:

   ```bash
   cd Realtime_Chat_App
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Open your web browser and visit `http://localhost:3000` to access the chat application.

3. Choose a username and a chat room to join, and start chatting in real-time.

## Configuration

Before running the application, you may customize the server configuration in the `.env` file.

```plaintext
# Server Configuration
SERVER_PORT=3000
```

**Important:** Make sure to rename the `.example.env` file to `.env` and fill it with your specific configuration values.
