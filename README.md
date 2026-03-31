# Simple Backend with Swagger and drizzle

A simple NestJS backend project with Swagger API documentation and Drizzle ORM support.

## What this project is

- Built with `NestJS` and `TypeScript`.
- Uses `Swagger` to expose interactive API documentation at `/api`.
- Uses `drizzle-orm` and `postgres` for database access.
- Includes a simple `Posts` module for managing post data.
- Loads environment settings from `.env.development.local` by default.

## Key features

- `NestJS` application structure with modules, controllers, and providers.
- `SwaggerModule` setup in `src/main.ts` for easy API testing.
- `ConfigModule` to load environment variables.
- `DrizzleModule` for database integration and migrations.

## Run locally

```bash
npm install
npm run start:dev
```

Then open:

- `http://localhost:3000` for the HTTP server
- `http://localhost:3000/api` for Swagger UI

## Database commands

```bash
npm run db:generate    # generate Drizzle schema from database
npm run db:migrate     # run database migrations
npm run db:seed        # seed the database
npm run db:pull        # pull database schema from the database
```

## Testing

```bash
npm test
npm run test:e2e
npm run test:cov
```

## Uploading to GitHub

1. Initialize git if needed: `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Initial backend project"`
4. Create a GitHub repo and add it as a remote.
5. Push: `git push -u origin main`

## Notes

- Swagger docs are created in `src/main.ts` with `SwaggerModule.setup('api', app, document)`.
- The app listens on port `3000` by default.
- This is a lightweight backend starter that can be extended with more modules and routes.
