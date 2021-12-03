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

### Running Test Files

- Run the following command in the terminal:
> npm install --save-dev jest

### Installing the datasets

- download all the datasets [here](https://drive.google.com/drive/u/3/folders/1_u6Z-ZV5rL95LQMRHPuvhntG_-pJlbWG)
  - make sure you are logged into a ucr email account to access the files
- make a folder in the project directory titled *csv_files*
- move the datasets into *csv_files*

### Running the program

- in the same terminal, enter 
> node server
- in a web browser go to [local host 3000](http://localhost:3000/)
