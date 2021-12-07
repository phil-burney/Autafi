 # ReadMe for CSC342 Team 12
### Deployed website link
[Deployed Website](http://104.131.120.33/#/)

## Demos
M1: [Demo 1](https://drive.google.com/file/d/1cc1JX048n2CR_kBRfY1TLq1914VdBr0J/view?usp=sharing)

M2: [Demo 2](https://youtu.be/Felqn61fykQ)

M3: [Demo 3](https://drive.google.com/file/d/1Ht-t0lPDw0YpyJo2QJy7CRsJ3cRe_zs2/view?usp=sharing)

## Progress Table
|Pages|Status|Wireframe|
|---|---|---|
|Landing|✅||
|Choice Page|✅|[Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/wireframes/choice_page_wireframe.png)|
|Part Bounty Form|✅|[Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/wireframes/parts_bounty_wireframe.png)|
|Part Sales Form|✅|[Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/wireframes/parts_bounty_wireframe.png)|
|Car Sales Form|✅|[Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/wireframes/car_bounty_wireframe.png)|
|Car Bounty Form|✅|[Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/wireframes/car_bounty_wireframe.png)|
|Car Sales List|✅|[Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/wireframes/car_sales_wireframe.png)|
|Part Sales List|✅|[Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/wireframes/parts_sales_wireframe.png)|
|Car Bounty List|✅|[Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/wireframes/parts_sales_wireframe.png)|
|Part Bounty List|✅|[Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/wireframes/parts_sales_wireframe.png)|
|Login|✅|[Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/wireframes/login_wireframe.png)|

## API Endpoints 
|Endpoints|Status|Purpose|Response|
|---|---|---|---|
|POST (/partbounty)|✅|Sends a new part bounty request to the server to be added to the list of parts bounties.|Response ACK|
|GET (/partbounty)|✅|Sends a list of part bounties (filtered or not) to the front end service|List of JSON part objects|
|POST (/carbounty)|✅|Sends a new car bounty request to the server to be added to the list of cars bounties|Response ACK|
|GET (/carbounty)|✅|Sends a list of car bounties (filtered or not) to the front end service|List of JSON car objects|
|POST (/partsale)|✅|Sends a new part sales request to the server to be added to the list of parts bounties.|Response ACK|
|GET (/partsale)|✅|Sends a list of part sales (filtered or not) to the front end service|List of JSON part objects|
|POST (/carsale)|✅|Sends a new car sale request to the server to be added to the list of cars bounties|Response ACK|
|GET (/carsale)|✅|Sends a list of car sale posts (filtered or not) to the front end service|List of JSON car objects|
|POST (/user)|✅|Creates a new user and saves the user to the database based off of the data in the request body.|Response ACK|
|PUT (/user/validatetoken)|✅|Validates the token to ensure that the user is legitimately logged in.|Response ACK|
|PUT (/login)|✅|Logs the user in by creating a token for the user to use.  If the login is invalid, then the server responds by stating that the login request is invalid|Response ACK|
|PUT (/logout)|✅|Logs the user out by destroying the token associated with the user|Response ACK|



## Elevator Pitch
My team is building a platform to facilitate the buying and selling of classic cars and car parts to help classic car enthusiasts find, repair or sell their classic cars by providing them a space to buy and sell classic cars and car parts as well as put a bounty on certain parts.

## Wireframes
  ![Bounty Hunter Wireframe](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/wireframes/wireframe.png)
  
## Milestone 2 Report
### What is done:
* Login is done, users can log in and four of the pages (Parts Bounty, Parts Sale, Car Bounty, and Car Sale) can only be accessed if a user is logged in.
* Parts Bounty, Parts Sale, Car Bounty, and Car Sale have been completed and routed.
* The list pages for Parts Bounty, Parts Sale, Car Bounty, and Car Sale have been created and routed
* MongoDB has been created for the back end, and the back end now reads and writes data to MongoDB
* All endpoints have been implemented
### What needs to be done
* Parts Bounty, Parts Sale, Car Bounty, and Car Sale all need to validate data before it is sent to the back end.
* Some pages will need to be restyled, such as the Landing Page.
## Milestone 3
### Acceptance Tests
[Acceptance Tests Document](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/SwapMeet/About/AcceptanceTests.md)
### Runbook
[Runbook Document](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-12/blob/main/SwapMeet/About/Runbook.md)
### Final report
#### The problem solved
As an application, SwapMeet serves as an application to connect buyers and sellers for all sorts of parts.  By allowing sellers to post prices for parts that they are sellings as well as allowing buyers to post prices that they will pay for certain parts, buyers and sellers are better able to connect.  Combined with a beautiful, easy to use interface and a platform specific to the automotive community, buyers and sellers will be able to find each other easier than ever before.  
#### Reflection on the development process
At the start of the project, the application was coming together at a promising rate.  The API and design were quickly fleshed out, and work on the application quickly commenced.  After the first milestone, however, the group suffered a communication breakdown.  Tasks were not completed, and nobody provided progress updates on their assigned tasks.  The implementation of a database and user accounts were not complete for Milestone 2, largely because the person in charge of that tasks waited until the last minute to communicate with the team about her lack of progress on the assigned part.  Since then, this group member has been silent and has not contributed to the third milestone.  The team has tried to reach out to this group member, but to no avail.  However, due to the work of one studious group member, the application has been fully completed.
#### Limitations and future work
Currently, a limited amount of photos can be uploaded through one post due to their size.  Photos also take up a large amount of space, so compressing the photos and decompressing the photos when they are needed is a possible future task.  Additionally, a hard limit can be put on the amount of photos being uploaded for each sale or bounty post.  For future work, the styling of all of the listing pages can be improved, as the pages currently have weird formatting on some screen sizes. The overall look of the listing boxes can be improved as well.  In the future, each listing will lead the user to a full listing page, where the user can read the full description of the part, as well as go through all of the pictures associated with a given post.  Currently, a user can only see the first picture in an array of pictures uploaded by a user in a given post.  Finally, the application has much more potential for extension.  Adding new years, makes and models, allowing junkyards to post their selection of cars along with a shortlist of major parts still available, and allowing users to delete posts when their parts are sold are all future tasks on the list.   

