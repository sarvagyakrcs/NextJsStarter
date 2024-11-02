# Next.js Starter Repository

This is a Next.js starter repository designed to kickstart your web development project. It comes pre-configured with essential features including authentication via OAuth, file uploads to AWS S3, and a complete set of UI components from ShadCN.

## Features

- **NextAuth**: Secure authentication with support for multiple OAuth providers.
- **AWS S3 Integration**: Upload and manage profile pictures directly from your application.
- **OAuth Sign-In**: Easily sign in with Google, GitHub, Twitter, and LinkedIn credentials.
- **User Registration**: Simple user registration process for new users.
- **ShadCN Components**: All ShadCN components are included for a responsive and modern UI.
- **User Button**: A convenient button for user actions, such as signing in and managing profiles.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- An AWS account (for S3 configuration)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nextjs-starter-repo.git
   cd nextjs-starter-repo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Set up your environment variables:
   Create a `.env.local` file in the root of the project and add the following variables:
   ```plaintext
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   TWITTER_CLIENT_ID=your_twitter_client_id
   TWITTER_CLIENT_SECRET=your_twitter_client_secret
   LINKEDIN_CLIENT_ID=your_linkedin_client_id
   LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_REGION=your_aws_region
   S3_BUCKET=your_s3_bucket_name
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Authentication**: Navigate to the sign-in page to log in using your preferred OAuth provider.
- **Profile Picture Upload**: After signing in, you can upload your profile picture to AWS S3.
- **ShadCN Components**: Use the included ShadCN components to build your UI.

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [AWS S3](https://aws.amazon.com/s3/)
- [ShadCN Components](https://shadcn.dev/)
