This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## System Requirements
- Node.js 14.6.0 or newer
- MacOS, Windows (including WSL), and Linux are supported

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Technologies Used

- **Next.js**: A React-based framework for building web applications. It provides server-side rendering, automatic code splitting, and other features to optimize the performance and user experience of your app. [Documentation](https://nextjs.org/docs)
- **TypeScript**: A typed superset of JavaScript that helps catch errors and improve code quality. It adds syntax for defining types, interfaces, and other constructs to make your code more robust and maintainable. [Documentation](https://www.typescriptlang.org/docs/)
- **Recoil**: A state management library for React that provides a simple and efficient way to manage state across your app. It uses an atom-based model for state management and provides hooks and selectors to interact with state in a predictable and scalable way. [Documentation](https://recoiljs.org/docs/introduction/getting-started)
- **CitySDK**: A toolkit for accessing and visualizing U.S. Census Bureau data. It provides APIs and libraries for working with various Census data sources, including population, demographics, housing, and more. [Documentation](https://uscensusbureau.github.io/citysdk/)
- **OpenAI API**: An API for accessing various artificial intelligence models provided by OpenAI. In this project, we use the "text-davinci-003" model to generate the 'explained like a local', 'green flags' and 'red flags' content. [Documentation](https://beta.openai.com/docs/api-reference/introduction)
- **Google Maps API**: A set of APIs for integrating Google Maps into your app. It provides various features for displaying maps, searching for locations, and obtaining directions.  [Documentation](https://developers.google.com/maps)
- **Chart.js**: A library for creating charts and graphs in your web app. It provides a flexible and easy-to-use API for creating a wide variety of charts, including line charts, bar charts, pie charts, and more. [Documentation](https://www.chartjs.org/docs/latest/)


### Enviroment Variables
The project requires certain environment variables to be set for proper configuration. An example .env file is included in the project repository titled `env-example.txt`, which you can use as a template to create your own environment variables file. To set up your own environment variables, create a file named .env.local in the root directory of the project and add your variables there. Contact the project owner for information on the required variables.

### Deployment
This project is deployed on Vercel, a cloud platform for serverless deployment. To deploy the project, simply commit your changes to the project repository and Vercel will automatically start a deployment based on your changes. You will need access to Vercel to view and troubleshoot deployments. If you do not have access, please contact the project owner for assistance.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details

## API
| Endpoint | Method | Description | Request Body | Response Body |
| -------- | ------ | ----------- | ------------ | ------------- |
| `/api/details` | `POST` | Get details about a place by its ID | `{ place_id: string, fields: string[] }` | JSON object with the details of the place |
| `/api/directions` | `POST` | Get directions between two locations | `{ destination: any, origin: any, travelMode: string }` | JSON object with the directions |
| `/api/hello` | `GET` | A simple endpoint to test the API | None | `{ name: string }` |
| `/api/nearby` | `POST` | Get nearby places of certain types around a location | `{ location: any, radius: any, types: string[] }` | Array of JSON objects with information about the places |
| `/api/openai` | `POST` | Get responses from OpenAI's GPT-3 model about a location | `{ formatted_address: string, geometry: any }` | JSON object with responses from GPT-3 |
| `/api/walkscore` | `POST` | Get walkability score of a location | `{ location: any, address: string }` | JSON object with the walkability score of the location |



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Copyright

This project is the intellectual property of its owners. All rights are reserved. This project and its contents are confidential and are intended solely for the use of its owners and contributors. Unauthorized use, reproduction, or distribution of any part of this project, without the prior written consent of its owners, is strictly prohibited.

If you have been granted access to this project, you are responsible for maintaining the confidentiality of the information contained within it. You may not disclose any information, data, or content contained within this project without the prior written consent of its owners.

If you have any questions about the use or distribution of this project, please contact the project owner for assistance.


.
