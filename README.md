# Melissa Garland - UX Portfolio

This is a personal portfolio website showcasing the work and experience of Melissa Garland, a UX Principal specializing in design systems, accessibility, and enterprise software.

## Features

- **Responsive Design**: Built with modern web technologies for optimal viewing across devices
- **Case Studies**: Detailed project showcases with interactive elements
- **Password gate**: Client-side gate for casual access control
- **Accessibility**: Designed with accessibility best practices in mind
- **Static Export**: Optimized for deployment on GitHub Pages

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Deployment**: GitHub Pages with GitHub Actions CI/CD
- **Password gate**: Client-side password check with local storage

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lucicharm/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your desired credentials.

4. Set `NEXT_PUBLIC_PASSWORD` in `.env.local` to the password you want to use.

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The site is automatically deployed to GitHub Pages using GitHub Actions. Any push to the main branch triggers a new deployment.

- **Live Site**: [https://lucicharm.github.io/portfolio/](https://lucicharm.github.io/portfolio/)
- **Build Command**: `npm run build`
- **Export**: Static files generated in `out/` directory

## Project Structure

```
portfolio/
├── app/                 # Next.js app directory
│   ├── about/          # About page
│   ├── case-studies/   # Case study pages
│   ├── contact/        # Contact page
│   ├── login/          # Authentication page
│   └── globals.css     # Global styles
├── components/         # Reusable React components
├── content/            # Markdown content and assets
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and data
└── public/             # Static assets
```

## Authentication

Set the `AUTH_PASSWORD` GitHub Actions secret for production deployments. The workflow passes it to the static build as `NEXT_PUBLIC_PASSWORD`. For local development, set `NEXT_PUBLIC_PASSWORD` in `.env.local`.

Because this site is a static export, the password check runs in the browser and the password is included in the generated JavaScript. This gate only discourages casual browsing; it does not protect confidential content from someone who can inspect or download the site files. Use server-side authentication and hosting if the content must be private.

## Contributing

This is a personal portfolio site. For questions or feedback, please use the contact form on the live site.

## License

This project is private and not licensed for public use.
