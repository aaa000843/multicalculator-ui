# MultiCalculator

A comprehensive, modern calculator suite built with Next.js 13, Radix UI, and Tailwind CSS. MultiCalculator provides a collection of useful calculators for financial planning, mathematics, health metrics, and everyday calculations.

## Features

- 🧮 **Multiple Calculator Types**
  - Financial Calculators (Mortgage, Investment, ROI, Credit Card Payoff)
  - Math Solvers (Standard Deviation, Percentage)
  - Health & Fitness (BMI, Body Fat)
  - Everyday Tools (Grade Calculator, Password Generator)

- 🎨 **Modern UI/UX**
  - Clean, responsive design
  - Dark/Light mode support
  - Accessible components using Radix UI
  - Beautiful gradients and animations

- 🛠️ **Technical Features**
  - Server and Client Components
  - Type-safe using TypeScript
  - Environment variable validation with Zod
  - Responsive layouts with Tailwind CSS
  - Component library built with shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/MultiCalculator.git
cd MultiCalculator
```

2. Install dependencies:
```bash
yarn
```

3. Create a `.env` file in the root directory:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
MultiCalculator/
├── app/                    # Next.js 13 app directory
│   ├── financial-calculators/
│   ├── math-solver-calculation/
│   ├── health-fitness/
│   └── everyday-calculators/
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── constants/            # Constants and configurations
├── lib/                  # Utility functions
├── public/              # Static assets
└── styles/              # Global styles
```

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Zod](https://zod.dev/) - Schema validation
- [shadcn/ui](https://ui.shadcn.com/) - Component library

## Development

### Commands

- `yarn dev` - Start development server
- `yarn build` - Build production bundle
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

### Adding New Calculators

1. Create a new directory in the appropriate category folder
2. Create the calculator component
3. Add the route to the navigation
4. Implement the calculator logic
5. Add tests if necessary

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/MultiCalculator](https://github.com/yourusername/MultiCalculator)