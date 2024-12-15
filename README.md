# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Instruction To Run Project
1. Using command prompt (cmd) move to the directory that consist this project and type code . in cmd Vs Code will open with project. 

2. First Install all the dependencies that are important to run project with npm install , then other librarys of React that I have used that are needed for the completion various features of the Project, that we have to install mentioned below with following command :-
1. npm install react-router-dom(For Routing Purpose)
2. npm install react-redux (For state management)
3. npm install axios (for getting the data asynchronously)
4. npm install chart.js react-chartjs-2 (For showing the data with the help of chart for Ex. Bar chart,Pie chart,Line chart)

3. After all installation of required dependencies is completed write npm start to run the project on Browser.


## List of feature Implemented
1. User Management Dashboard
    
    1.    Login Page: Authenticate using mock API.
    2.    Dashboard: Fetch and display users in a table with actions (view   details, delete).
    3.    Search and Filter: Filter users by name or email.
    4.    Pagination: Paginate the user list (5 users per page).

2. Analytics Dashboard
    Overview Cards
        Display summary metrics, such as:
        1. Total Users: Count of all fetched users.
        2.  Active Users: Assume a mock calculation based on a field like "status".
        3.  Deleted Users: Track the count of deleted users during the session

3. Charts Section
   1.    User Registration Trend: A line chart showing user registrations over the past 6 months
        (mock data).
    2.    Active vs Inactive Users: A pie chart comparing active and inactive users.
    3.    Users by Region: A bar chart or map displaying user distribution by regions (mock region
data).

4. Filters for Analytics
    Allow filtering analytics by:
    1. Region.

5. Responsive Designs


## Asumptions made

1. **Login Page**:
   - Mock API uses static credentials: `urawesome@gmial.com` and `great`.(optional cedentials :- `urawesome1@gmial.com` and `great1`) use any of it.
   - If user is not loginIn website should not be accessible ,for that purpose a authenticationSlice is use with local storage to fulfill this implementation.
   

2. **User Data**:
   - User status determines activity: `"active"`, `"inactive"`, or `"deleted"`.
   - Redux is used for state management, where data is stored temporarily. The delete functionality only simulates deletion by      updating the Redux state, as the mock data file cannot be modified without a backend because browsers do not allow manipulating source files for security and sandboxing reasons.

3. **Analytics Data**:
   - User registration trend is based on mock data for the past 6 months.
   - Region data is predefined with regions like `"North America"`, `"Europe"`, etc.

4. **Pagination**:
   - Each page displays 5 users.
   - Pagination is implemented on the client side if the API doesn't support it.

5. **Filtering**:
   - Filters for name and email are case-insensitive and client-side.

6. **Responsive Design**:
   - The application is designed for desktop, tablet, and mobile devices, with limited views on smaller screens.

7. **State Management**:
   - Redux slices are used for managing users and analytics data separately.

8. **Mock API**:
   - All data for users and analytics is fetched from static JSON files.