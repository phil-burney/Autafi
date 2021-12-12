### Usage
To create and run the docker container locally, follow these steps:
1. Go to the Partsaphi/front-end folder
2. Run the following command: ```npm run serve```. This starts the application
4. To stop the application, run the following command: ```CTRL+C```

To create and run the docker container on a server, follow these steps:
1. Go to the Partsaphi folder
2. Run the following command: ```docker build -t frontend front-end.```
3. After that command runs, run the container by running the following command: ```docker run -d -p 8080:80 --rm --name front frontend```.  This will start the application.
4. To stop the application, run the following command: ```docker stop front```