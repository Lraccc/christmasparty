
# Christmas Party Game Website

This is a festive, mobile-friendly website for hosting Christmas party games, built with Next.js, TypeScript, Tailwind CSS, and the App Router.

## Features

- 🎅 Christmas-themed landing page
- 🎮 Buttons for each game (Spin the Wheel, Quiz, Bingo, Secret Santa)
- 🏆 Live scoreboard/winners page
- ⏰ Countdown timer to the next game
- 🎶 Optional background Christmas music
- Simple, clean, and works well on phones

## Getting Started

To run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

## Project Structure

- Main landing page: `src/app/page.tsx`
- Game pages: `src/app/spin/page.tsx`, `src/app/quiz/page.tsx`, `src/app/bingo/page.tsx`, `src/app/secretsanta/page.tsx`
- Scoreboard: `src/app/scoreboard/page.tsx`
- Global styles: `src/app/globals.css`
- Add your own music to `public/music/christmas.mp3` and images to `public/images/`

## Customization

- Replace placeholder images and music with your own festive assets.
- Update or expand game logic in each game page as needed.

## License

MIT
