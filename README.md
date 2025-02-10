# BC Pay

A comprehensive dashboard application designed for CEOs, HR professionals, and Team Leads to monitor company rule violations and track associated monetary penalties.

## 🚀 Overview

BC Pay provides a centralized platform for tracking and managing company policy violations and their corresponding financial implications. The dashboard offers intuitive interfaces for different user roles to effectively monitor and manage compliance-related activities.

## 🛠️ How it works

In the homepage, there are options meant to simulate login actions with roles such as CEO, HR, and Team Leads. When they login, they are forwarded to the dashboard. For each user role, the dashboard is different.

- **CEO Dashboard:** The CEO will see the recent violations and top contributions made from those violations in the current month.
- **HR Dashboard:** The HR will get the same options as the CEO but with an added option to track and update the money collection status. They can update if the money is collected and if they have been sent to the finance team yet.
- **Team Lead Dashboard:** A team lead can see their team's violations report as well as the form to report a new violation made by their team members.

## 🔮 Future Scope

1. The project is just simulating a login function by each user role. We can implement a proper login method for users.
2. The project has no backend to store the data of violations and users. It's just updating the states. We can add a backend with Postgres or Supabase to handle the data.
3. Further improvement can be made by letting the members log in and see their individual violation reports so that they can act upon it.

## 💻 Tech Stack

- **Framework:** 
  - React
  - Next.js
- **Styling:** 
  - TailwindCSS
  - shadcn/ui components
- **State Management:**
  - Zustand
- **Deployment:**
  - Netlify
- **Development Tools:**
  - Claude (Anthropic) - Data generation and development assistance
  - GitHub Copilot - Code generation and refactoring

## 🔗 Important Links

- **Live Preview:** [https://bcpay.netlify.app/](https://bcpay.netlify.app/)
- **Design File:** [Figma Design Link](https://www.figma.com/design/IVZKkw06pZuMYRnRR0NwIx/BCPay)

## 🛠️ Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/mirzakaiyum/bcpay-system.git
   cd bcpay-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application running locally.

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run start
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
