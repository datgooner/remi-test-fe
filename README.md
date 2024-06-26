# Funny videos - FE - Remitano examination 

## Introduction

This project serves as a platform for users to share their favorite videos from YouTube. It includes a favorite board where users can view others' shared videos. Once logged in, users can share videos, and every other logged-in user will receive notifications when a new video is shared.

This project is a FE part of web application built with those tech stacks:
- React Vite, TypeScript
- Tailwind CSS, Shadcn/ui
- Zustand, React Query
- Socket io

- Eslint, Prettier config
- Husky, Lint-staged

- Vitest, Testing-library/react
- Docker, and deployed on Vercel

## Demo

Check out the [demo](https://remi-funny-videos.vercel.app/) to see the platform in action!

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version >= 18)
- yarn
- Docker (optional)

## Installation & Configuration

To install and configure the project, follow these steps:

```bash
# Clone the repository:

   git clone https://github.com/datgooner/remi-test-fe
   cd remi-test-fe

# Install dependencies:

   yarn install
```

## Running the Application

We have two choices to run the application on the local development

### yarn

**Start the development server:**

```bash
   yarn dev
```
**Access the application in a web browser at http://localhost:3000**

### docker

We have setup a optimized docker file for development, to use it, start your docker instance, follow this step:

**Start docker compose:**

```bash
   docker compose up
```

## Testing

This project is using Vitest and Testing-library/react for testing.

```bash
# unit tests
   yarn test

# test coverage
   yarn test:coverage
```

The test coverage report will be stored in __coverage__ file. It's ignored by git.

## Deployment

I'm using [vercel](https://vercel.com/) as a free hosting for this project. It's already integrated with my vercel project. Vercel will automatically trigger deployment when got a change from main brand.

Wanna use other way?

I already have a docker setup for deployment. To use it:

**Using docker build command**

```bash
    docker build . -t <your-container-name>:<version>
```

Replace 'your-container-name' and 'version' with the name and version you want.

## Usage

Accessing home page, you can see a shared videos board. 
You can easily get the video information like video title, video description, author name (who shared this video),...
To see more videos, just scroll down...

To use the sharing function, let's use our login/register function first. 

You must enter a valid email and a password that has at least 8 characters. We don't use complicate validation here.
If your email was used to register before, please enter correct password. Otherwise, just enter your new email and password, you will be automatically signed in and logged in. 

After logged in, click to the Share a movie button on the header, you will be redirect to the sharing page. Enter your favorite video's url here. We accept both https://www.youtube.com/* and https://youtu.be/* format. Share your video, and boom...it's gonna come to the new feed. BTW, other people will get a notification about your shared video. Interested!

## Troubleshooting

Found any issue? Please let me know.