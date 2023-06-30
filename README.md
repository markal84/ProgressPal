# ProgressPal

ProgressPal is a web application designed to help users track their workouts and exercises. It allows user to create account, log in securely, and access personalized workout tracking features. The application is actively developed, with regular updates and new features being added.

## Key Features

- **User Registration and Authentication:** ProgressPal provides a secure user registration and authentication system. Users can create accounts and log in to access their personalized workout tracking features. The backend handles user authentication and data storage, which is deployed on Render.com.

- **Exercise Tracking:** With ProgressPal, users can easily track their exercises. They can add exercises to their workouts and specify details such as the exercise name, sets, reps, and weights. This feature allows users to keep a record of their progress and monitor their performance over time.

- **Data Persistence:** All workout and exercise data entered by users is securely stored in a MongoDB Atlas cloud database. This ensures data integrity and availability, allowing users to access their data from anywhere with an internet connection.

## Tech Stack

ProgressPal's frontend is built using the following technologies:

- **React**: A popular JavaScript library for building user interfaces.
- **Material UI**: A set of pre-built components and styles for faster and consistent UI development.

## Getting Started

To get started with ProgressPal locally, follow these steps:

1. Clone the repository: `git clone https://github.com/markal84/gymApp.git`
2. Install dependencies: `npm install`
3. Configure environment variables: Create a `.env` file in the project root directory and specify any required variables.
4. Run the application: `npm start`
5. Access the application in your web browser at the localhost address.

## Deployment

The frontend part of ProgressPal can be deployed to any static hosting platform. It doesn't require a backend setup if the backend is already deployed on Render.com. To deploy the frontend, follow these steps:

1. Build the production-ready version of the application: `npm run build`
2. Upload the contents of the `build` directory to your chosen static hosting platform.
3. Configure the necessary environment variables for the frontend, if applicable, based on the deployment platform.

## Contributing

Contributions to ProgressPal are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue on the GitHub repository. If you'd like to contribute code, you can fork the repository, make your changes, and submit a pull request.

When contributing to this project, please ensure that your code follows the established coding style and that it is thoroughly tested.

## License

This project is licensed under the [MIT License](LICENSE).
