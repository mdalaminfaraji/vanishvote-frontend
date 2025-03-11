# VanishVote Frontend

VanishVote is an anonymous polling application that allows users to create polls that automatically expire after a set time. This repository contains the frontend of the application built with Next.js and Tailwind CSS.

## Features

- **Create Anonymous Polls**: Create polls with multiple options that expire after a set time
- **Privacy Controls**: Set polls to be private (accessible only via direct link) or public
- **Result Visibility**: Option to hide results until the poll expires
- **Share Functionality**: Easily share poll links with others
- **Real-time Results**: See votes updating in real-time
- **Mobile Responsive**: Works seamlessly on all devices
- **No Login Required**: Create and vote on polls without an account

## Technology Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling and responsive design
- **React Icons**: For beautiful, consistent icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm or yarn
- The VanishVote backend server running (see backend README)

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd vanishvote-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How to Use VanishVote

### Creating a Poll

1. Navigate to the homepage and click "Create Poll"
2. Enter the poll title/question
3. Add at least two options for people to vote on
4. Set the expiration time (1 hour, 12 hours, 24 hours, etc.)
5. Choose privacy settings:
   - Toggle "Private poll" if you want the poll to be accessible only via direct link
   - Toggle "Hide results until poll ends" if you want to prevent voters from seeing results until the poll expires
6. Click "Create Poll" to generate your poll

### Voting on a Poll

1. Access a poll via its unique link
2. Select one of the available options
3. Click "Vote" to submit your choice
4. View the results (if allowed by the poll creator)

### Sharing a Poll

1. From the poll page, use the "Copy Link" button to copy the poll URL
2. Share the link with others through your preferred communication channel

## Important Notes

- **One Vote Per Network**: To maintain poll integrity, our system allows only one vote per IP address
- **Poll Expiration**: Once a poll expires, voting is no longer possible, but results remain visible
- **Browser Storage**: The application uses localStorage to track which polls you've already voted on

## Development

### Folder Structure
```
src/
├── app/                # Next.js app directory
│   ├── create/         # Poll creation page
│   ├── poll/[pollId]/  # Individual poll page
│   └── page.tsx        # Homepage
├── components/         # Reusable React components
├── lib/                # Utility functions and API
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

### Building for Production

```bash
npm run build
# or
yarn build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
