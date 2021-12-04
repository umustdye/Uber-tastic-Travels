# Uber-tastic Travels Analytics 
Team Pear


## Introduction to the project

## How to set up
### Prerequisites

- Install an IDE that supports Javascript, NodeJS and HTML. We used [Visual Studios](https://visualstudio.microsoft.com/downloads/)
  - Make sure install Javascript, NodeJS, and HTML dependencies for the IDE
- Pull or clone [this](https://github.com/ucr-cs180-fall21/cs180project-021-team-pear-1.git) repository.

### Installing Express

- open a terminal
- change the directory to the project directory
- into the terminal, enter 
> npm init -y
> 
> npm i -S express body-parser
- follow the prompts given

### Installing Anime JS

for our loading animations we used [Anime JS](https://animejs.com/)
- in the same terminal, enter
> npm install animejs --save

### Saving to File

- Your device may require this command to save data to file without crashing. This will expand the amount of memory the program has access to.
> $env:NODE_OPTIONS="--max-old-space-size=4096"

### Installing Jtest

- Run the following command in the terminal:
> npm install --save-dev jest

### Installing the datasets

- download all the datasets [here](https://drive.google.com/drive/u/3/folders/1_u6Z-ZV5rL95LQMRHPuvhntG_-pJlbWG)
  - make sure you are logged into a ucr email account to access the files
- make a folder in the project directory titled *csv_files*
- move the datasets into *csv_files*

### Running Tests
-- in the same terminal, enter
> npm test


### Running the program

- in the same terminal, enter 
> node server
- in a web browser go to [local host 3000](http://localhost:3000/)

## How to Navigate the Website
### Search

- You can search through our database by clicking the "Search" button in the top right of the website.
- Depending on the Ride Service you choose, different parameters will appear for your search.
   - Uber: You *must* input a date range and a time range.
   - Lyft: You *must* select a **Source** (where the ride starts), a **Destination** (where the ride ends), and a **Lyft Ride Type**.
   - Other Ride Services: You *must* input a date range and a time range. You have the option to include a New York street name by typing it out. If no street name is provieded, your Search will only look for parameters matching you date range and time range.
 - You have the option to edit any of your Search results by clicking the **Edit Search Results** checkbox below the search parameters.
    - When this box is checked, each piece of information about the rides from your search results will be editable.
    - You can save your changes to the ride by clicking the **Update Ride** button located to the right of the ride.
    - You can remove a ride by clicking the **Remove Ride** button located to the right of the ride. The search results will update after the ride is removed.
 - You can scroll through your search results by clicking the **>>** and **<<** buttons that appear below your search results to the left. At most, 20 results will show at a time.

### Compare Ride Services Based On Month

- This analytic will show you a bar graph that compares the number of rides ride services have done in a given month.
- Using the top navigation bar, select the "compare number of rides by month" box to open the search menu.
- You will find two rows:
  - In the first row you can select the first ride service you want to compare and the month you want to learn about.
  - In the second row you can select the second ride service you want to compare and the month you want to learn about.
- Once you click compare, a graph will appear below the search fields.


### Busiest Times

- This analytic will show you a line graph for a given ride service per an hour from Midnight to 11PM
- Using the top navigation bar, select the "pick-ups by the hour" button to open the ride service menu
  - click on a ride service option: Uber, American, Diplo, Highclass, Firstclass, or Prestige, and click on the "search times" button
- You will see a line graph, the y-axis represents the number of rides and the x-axis represents the hour of the day.

### Compare Uber to Lyft

- This analytic will show you a pie chart comparing the total number of rides from Lyft and Uber
- Using the top navigation bar, select the "compare uber to lyft" button to open the ride service menu
- You will see a pie chart, dark blue is Lyft and light blue is Uber
