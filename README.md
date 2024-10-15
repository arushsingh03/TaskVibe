<div align="center">
      <h1> <img src="https://cdn-icons-png.freepik.com/256/861/861542.png?ga=GA1.1.1240215396.1728474490&semt=ais_hybrid" width="80px"><br/>Task Vibe</h1>
     </div>
<p align="center"> <a href="https://master.dmr9kb15c78py.amplifyapp.com/" target="_blank"><img alt="" src="https://img.shields.io/badge/Website-EA4C89?style=normal&logo=dribbble&logoColor=white" style="vertical-align:center" /></a> <a href="https://x.com/arush_singh03" target="_blank"><img alt="" src="https://img.shields.io/badge/Twitter-1DA1F2?style=normal&logo=twitter&logoColor=white" style="vertical-align:center" /></a> <a href="https://www.instagram.com/arushsingh03/" target="_blank"><img alt="" src="https://img.shields.io/badge/Instagram-E4405F?style=normal&logo=instagram&logoColor=white" style="vertical-align:center" /></a> <a href="https://www.linkedin.com/in/arushsingh03/}" target="_blank"><img alt="" src="https://img.shields.io/badge/LinkedIn-0077B5?style=normal&logo=linkedin&logoColor=white" style="vertical-align:center" /></a> </p>

# Description
TaskVibe is a project management web application designed to enhance team collaboration and productivity. It allows users to create, organize, and track tasks seamlessly, ensuring efficient workflow management. With features like Gantt chart visualization for project timelines, user authentication through AWS Cognito, and a responsive design powered by TailwindCSS, TaskVibe provides a user-friendly interface for both individuals and teams. Built with Next.js for the frontend and Express.js for the backend, it supports smooth API interactions and a robust development environment, making it an ideal tool for managing projects effectively.

# Features
- Task Management: Create, update, and track tasks seamlessly.
Team Collaboration: Organize tasks across multiple users for better productivity.
- Gantt Chart Integration: Visualize project timelines and task dependencies effectively.
- Authentication: Secure user access with AWS Cognito.
- Responsive Design: Styled with TailwindCSS for a clean, consistent UI across devices.
- Backend: Built using Express.js for API handling.
- Frontend: Developed with Next.js for fast and optimized web rendering.
I- cons & UI Components: Uses Lucide icons, MUI components, and MUI icons.
- API Communication: Axios for smooth HTTP requests and data fetching.
- Deployment: Hosted on AWS for scalability and reliability. 
# Screenshots
#### Home Page
 <img src="https://i.imgur.com/c2fRMVs.png"><br>
 #### Project Baord
 <img src="https://i.imgur.com/GuZPfjX.png"><br>
 #### Timeline
 <img src="https://i.imgur.com/DUWYjMb.png"><br>
 #### Project Table
 <img src="https://i.imgur.com/4bAXye2.png"><br>
 #### Search Page
 <img src="https://i.imgur.com/4lEoKZX.png"><br>
 #### User Profile 
 <img src="https://i.imgur.com/PlaVjXU.png"><br>
 
# Tech Used
 ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
      
# How to Setup :
### Clone the repository: 
**`git clone https://github.com/arushsingh03/TaskVibe`** , 
- got to main directory using - **`cd TaskVibe`**


### Install dependencies in both client and server: 


**_First:_** `cd client npm install`  
**_Then go to the main directory by:_** `cd ..`  
**_Again:_** `cd server npm install` for backend dependencies.

### Set up the database: 
- **`npx prisma generate`** Generates the Prisma Client for interacting with the database based on the schema defined in schema.prisma.

- **`npx prisma migrate dev --name init`** Applies pending database migrations in development and creates a new migration file named "init" based on the current schema.

- **`npm run seed`** Executes the seed script defined in package.json to populate the database with initial data for development and testing.

### Configure environment variables:

- .env for server settings, **PORT, DATABASE_URL**
- .env.local for client settings, **NEXT_PUBLIC_API_BASE_URL**
- Run the project **`npm run`** dev for both client and sever make sure your server running.... 

#### If all goes smoothly, your app should be accessible locally at:
> localhost:3000

### Live at 
<a href="https://master.dmr9kb15c78py.amplifyapp.com/" target="_blank"><img src="https://www.animatedimages.org/data/media/1096/animated-click-here-sign-and-button-image-0042.gif" /></a>
<!-- </> with 💛 by readMD (https://readmd.itsvg.in) -->
    
