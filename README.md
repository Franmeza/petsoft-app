# PetSoft

PetSoft is a comprehensive tool designed for managing pet care, allowing users to control and monitor the pets under their charge. It provides an intuitive dashboard to track pets and manage their information efficiently.

## Features

- **Dashboard**: Displays a list of all current pets with their details.
  - View pet details like name, owner name, age, notes, and image.
  - Select a pet from the list to view more details.
- **Add/Edit Pets**: Easily add new pets or edit the information of existing ones through a user-friendly form.
- **Delete Pets**: Pets can be checked out or deleted from the system.
- **Authentication and Payment**:
  - Protected routes ensure only subscribed users can access the dashboard after signing in and paying the suscription.
  - Login and sign-up functionality is provided.

## Tech Stack

PetSoft is built using modern technologies:

- **Frontend**:
  - [Next.js] (TypeScript)
  - [React Hook Form] for form handling
  - [Tailwind CSS] for styling
  - [ShadCN UI] for UI components
- **Backend**:
  - [Prisma] as the ORM for database interaction
  - [PostgreSQL] as the database
  - [NextAuth] for authentication
  - [Zod] for schema validation
- **Payments**:
  - [Stripe] integration for handling subscriptions

## Deployment

PetSoft is deployed and hosted on [Vercel]. You can access the live version of the app [here] https://petsoft-app-sepia.vercel.app.
