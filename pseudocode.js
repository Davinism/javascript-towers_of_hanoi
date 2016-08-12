const Game = require('./game.js');
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const game = new Game([[3,2,1], [], [] ], reader);
const reset = (response) => {
  if (response === 'y') {
    game.stacks = [[3,2,1], [], [] ];
    game.run(playAgain);
  }
  else {
    console.log("Play again soon!");
    reader.close();
  }
};
const playAgain = () => reader.question('play again?', (response) => reset(response));

game.run(playAgain);
