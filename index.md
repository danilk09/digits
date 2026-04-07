![](./digits_home_page.png)

## Installation

First, [install PostgreSQL](https://www.postgresql.org/download/). Then create a database for your application.

```

$ createdb nextjs-application-template
Password:
$

```

Second, go to [https://github.com/ics-software-engineering/nextjs-application-template](https://github.com/ics-software-engineering/nextjs-application-template), and click the "Use this template" button. Complete the dialog box to create a new repository that you own that is initialized with this template's files.

Third, go to your newly created repository, and click the "Clone or download" button to download your new GitHub repo to your local file system. Using [GitHub Desktop](https://desktop.github.com/) is a great choice if you use MacOS or Windows.

Fourth, cd into the directory of your local copy of the repo, and install third party libraries with:

```

$ npm install

```

Fifth, create a `.env` file from the `sample.env`. Edit the line `DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"` to match your setup. Replace `mydb` with the PostgreSQL database that you created in the first step (in the example for this step the database is `nextjs-application-template`). replace `johndoe:randompassword` with a username and password you created for this db. If you did not create a user for this database, you can use the `postgress` user with the password you set when you installed postgress. Note: this is not a recommdened practice since the `postgres` user is an admin with full access to postgres. 

See the Prisma docs [Connect your database](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql#3-connect-your-database). 

Then run the Prisma migration `npx prisma migrate dev` to set up the PostgreSQL tables.

```
$ npx prisma migrate dev
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma/schema.prisma.
Datasource "db": PostgreSQL database "mydb", schema "public" at "localhost:5432"

Applying migration `20260301195634_init`

The following migration(s) have been applied:

migrations/
  └─ 20260301195634_init/
    └─ migration.sql

Your database is now in sync with your schema.

$

```

Create the Prisma Client by running the command `npx prisma generate`. This will create the Prisma Client in the `generated/prisma` directory, which is used by the application to interact with the database.

```
$ npx prisma generate

Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma/schema.prisma.

Generated Prisma Client (7.4.2) to ./generated/prisma in 80ms
 
```

Then seed the database with the `/config/settings.development.json` data using `npm run seed`.

```

$ npm run seed  

> nextjs-application-template-s26@0.1.0 seed
> npx tsx src/seed.ts

Seeding the database
  Creating user: admin@foo.com with role: ADMIN
  Creating user: john@foo.com with role: USER
  Adding stuff: {"name":"Basket","quantity":3,"owner":"john@foo.com","condition":"excellent"}
  Adding stuff: {"name":"Bicycle","quantity":2,"owner":"john@foo.com","condition":"poor"}
  Adding stuff: {"name":"Banana","quantity":2,"owner":"admin@foo.com","condition":"good"}
  Adding stuff: {"name":"Boogie Board","quantity":2,"owner":"admin@foo.com","condition":"excellent"}
$

```

## Running the system

Once the libraries are installed and the database seeded, you can run the application by invoking the "dev" script in the [package.json file](https://github.com/ics-software-engineering/nextjs-application-template/blob/master/app/package.json):

```

$ npm run dev

> nextjs-application-template-s26@0.1.0 dev
> next dev

▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://XXX.XXX.XXX.XXX:3000
- Environments: .env

✓ Starting...
✓ Ready in 821ms

```

### Viewing the running app

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000). You can login using the credentials in [settings.development.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config/settings.development.json), or else register a new account.


### ESLint
You can verify that the code obeys our coding standards by running ESLint over the code in the src/ directory with:

```
$ npm run lint

> nextjs-application-template-1@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
$
```

### Building the App

To build the application for production deployment, use the following command:

```bash
$ npm run build
```

This will compile the Next.js application and output the production build to the `.next/` directory.

After building, you can start the production server with:

```bash
$ npm start
```

Make sure your environment variables and database are properly configured before building for production.

### Testing
This project uses [Playwright](https://playwright.dev/) for end-to-end and authentication testing. Tests are located in the `tests/` directory and cover user flows, authentication, and admin features.

To run all tests:

```
$ npx playwright test
```

You can run tests for a specific file:

```
$ npx playwright test tests/john-pages.spec.ts
```

To view tests in headed mode (see the browser UI):

```
$ npx playwright test --headed
```

For more information, see the [Playwright documentation](https://playwright.dev/).


## Walkthrough

The following sections describe the major features of this website.

#### Landing page

When you retrieve the app at http://localhost:3000, this is what should be displayed:

![](doc/home_page.png)

The next step is to use the Login menu to either Login to an existing account or register a new account.

#### Login page

Clicking on the Login link, then on the Sign In menu item displays this page:

![](doc/signin-page.png)

#### Register page

Alternatively, clicking on the Login link, then on the Sign Up menu item displays this page:

![](doc/signup-page.png)

#### Landing (after Login) page, non-Admin user

Once you log in (either to an existing account or by creating a new one), the navbar changes as follows:

![](doc/landing-after-login-page.png)

You can now add new Stuff documents, and list the Stuff you have created. Note you cannot see any Stuff created by other users.

#### Add Contact page

After logging in, here is the page that allows you to add new Contacts:

![](doc/add-contact-page.png)

#### List Contact page

After logging in, here is the page that allows you to list all the Contact you have created:

![](doc/list-contact-page.png)

You click the "Edit" link to go to the Edit Contact page, shown next.

#### Edit Contact page

After clicking on the "Edit" link associated with a contact, this page displays that allows you to change and save it:

![](doc/edit-contact-page.png)

#### Landing (after Login), Admin user

You can define an "admin" user in the settings.json file. This user, after logging in, gets a special entry in the navbar:

![](doc/admin-landing-page.png)

#### Admin page (list all users stuff)

To provide a simple example of a "super power" for Admin users, the Admin page lists all of the Contacts by all of the users:

![](doc/admin-list-contact-page.png)

Note that non-admin users cannot get to this page, even if they type in the URL by hand.
### Tables

The application implements two tables "Contacts" and "User". Each Contacts row has the following columns: id, first_name, last_name, image, address, and owner. The User table has the following columns: id, email, password (hashed using bcrypt), role.

The Stuff and User models are defined in [prisma/schema.prisma](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/prisma/schema.prisma).

The tables are initialized in [prisma/seed.ts](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/prisma/seed.ts) using the command `npm run seed`.

### CSS

The application uses the [React implementation of Bootstrap 5](https://react-bootstrap.github.io/). You can adjust the theme by editing the `src/app/globals.css` file. To change the theme override the Bootstrap 5 CSS variables.

```css
/* Change bootstrap variable values.
 See https://getbootstrap.com/docs/5.2/customize/css-variables/
 */
body {
  --bs-light-rgb: 236, 236, 236;
}

/* Define custom styles */
.gray-background {
  background-color: var(--bs-gray-200);
  color: var(--bs-dark);
  padding-top: 10px;
  padding-bottom: 20px;
}
```

### Routing

For display and navigation among its four pages, the application uses [Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing).

Routing is defined by the directory structure.

### Authentication

For authentication, the application uses the NextAuth package.

When the database is seeded, a settings file (such as [config/settings.development.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config/settings.development.json)) is used to create users and stuff in the PostgreSQL database. That will lead to a default accounts being created.

The application allows users to register and create new accounts at any time.

### Authorization

Only logged in users can manipulate Stuff items (but any registered user can manipulate any Stuff item, even if they weren't the user that created it.)

### Configuration

The [config](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config) directory is intended to hold settings files. The repository contains one file: [config/settings.development.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config/settings.development.json).

The [.gitignore](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/.gitignore) file prevents a file named settings.production.json from being committed to the repository. So, if you are deploying the application, you can put settings in a file named settings.production.json and it will not be committed.

### Quality Assurance

#### ESLint

The application includes a [.eslintrc.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/.eslintrc.json) file to define the coding style adhered to in this application. You can invoke ESLint from the command line as follows:

```
[~/nextjs-application-template]-> npm run lint

> nextjs-application-template-1@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
[~/nextjs-application-template]->
```

ESLint should run without generating any errors.

It's significantly easier to do development with ESLint integrated directly into your IDE (such as VSCode).

<!--
## Screencasts

For more information about this system, please watch one or more of the following screencasts. Note that the current source code might differ slightly from the code in these screencasts, but the changes should be very minor.

- [Walkthrough of system user interface (6 min)](https://youtu.be/48xu1hrqUi8)
- [Data and accounts structure and initialization (18 min)](https://youtu.be/HZRjwrVBWp4)
- [Navigation, routing, pages, components (34 min)](https://youtu.be/XztTdHpv6Jw)
- [Forms (32 min)](https://youtu.be/8FyWR3gUGCM)
- [Authorization, authentication, and roles (12 min)](https://youtu.be/9HX5vuXTlvA)
-->
