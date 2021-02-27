# Project Title
 
Minecraft 2D ;
 
Pure JS & HTML & CSS
 
## Getting Started
 
I was asked to create my very own Minecraft mock in less than 3 days nad this is the result.
 
### Installing
 
HTML contains the game board which is a CSS grid of 30/20 and a sidebar with the user options.
 
CSS holds original pictures and simple retro styling.
 
The object of the tiles and tools is set to get access to specific properties when a certain function is invoked.
 
JS first function in creating the 'world' and setting the grid appearance based on matrixes that were already designed.
 
Game has 2 states:
let isUsingTool = true;
let isUsingMatter = false;
 
base on these states, once a grid item is clicked, one of the following functions is invoked:
 
1) harvest() => removing the relevant class if a condition is met and add an increase to the inventory.
2) Implant() => add the relevant class to the grid if a condition is met and decrease the inventory.
 
user has an option to reset the current grid and to get a new random world.
 
## Running the tests
 
originally I choose to work only with classes compare once the function was invoked but then I realized that using a game object will be a better practice for this project.
 
## Deployment
 
Netlify: https://flamboyant-booth-7931fc.netlify.app/
 
## Authors
 
* **Gilad Yefet** -  - [PurpleBooth](https://github.com/gilad18)
 

