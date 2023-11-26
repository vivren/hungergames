This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# The Project

## Inspiration
We felt inspired by a problem we all faced too often - wanting to enjoy a nice meal out with your friends only to end up hangry (hangry: the act of becoming angry from being too hungry) after spending too long trying to decide on a place to go.

## What it does
Our app is the industry leading solution to hangry-ness by turning choosing a restaurant to eat out at into a fun and simple process.
As the host, create a lobby by selecting the max price and distance from your current location for restaurants.
Invite the friends you're eating out with to play with a lobby codes. 
The 24 top rated restaurants that match the entered criteria are randomly put against each other in 1v1s, where each user gets to pick what they would prefer.
Through world cup style rounds, restaurants accumulate points for winning or are eliminated for losing. 
After everyone has finished their rounds, a leaderboard of the top 3 preferred restaurants amongst everyone are presented.

## How we built it
Our app is built with a Python backend and a Typescript and Next.JS frontend. Our data is stored in a MongoDB Atlas database. We used the Google Places API to fetch restaurant data.

## Challenges we ran into
All of them.

## Accomplishments that we're proud of
All of them.

## What we learned
Chat GPT is a great coder.

## What's next for Hunger Games
There are many features we planned to build but never got around to. For example,
1. User Accounts
- Allow users to create accounts
- Save user choices from games to give better initial restaurant recommendation
2. Add preferred + banned restaurant types
- Allow users to only be shown restaurants that serve the type food in a customized list
- Allow users to not be shown any restaurants that serve the type food in a customized list
3. Add customizable location filter
- Allows user to search for restaurants within a certain location
4. Add more detailed results at the end of voting
- Allow users to see who voted for what