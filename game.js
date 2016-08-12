const Game = function (stacks, reader) {
  this.stacks = stacks; // Array in an array.
  this.discAmount = stacks[0].length;
  this.reader = reader;
};

Game.prototype.promptMove = function (callback, completionCallback) {


  this.print();

  this.reader.question('Choose a tower to move from\n', response1 => {
    this.reader.question('Choose a tower to move to\n', response2 => {
      callback(parseInt(response1), parseInt(response2));
      this.run(completionCallback);
    });
  });
};

Game.prototype.print = function() {
  this.stacks.forEach(stack => {
    console.log(JSON.stringify(stack));
  });
};

Game.prototype.isValidMove = function(start, end) {
  const stacks = this.stacks;
  if (start < 0 || end < 0)
  return false;
  else if (start >= stacks.length || end >= stacks.length)
  return false;
  else if (stacks[end].length === 0 && stacks[start].length > 0)
  return true;
  else if (stacks[start].length === 0)
  return false;
  else if (stacks[start][stacks[start].length - 1] > stacks[end][stacks[end].length - 1])
  return false;
  else
  return true;
};

Game.prototype.move = function(start, end) {
  if (this.isValidMove(start, end)){
    this.stacks[end].push(this.stacks[start].pop());
    return true;
  }
  else {
    return false;
  }
};


Game.prototype.isWon = function() {
  return this.stacks.slice(1).some(el => el.length === this.discAmount);
};

Game.prototype.run = function(completionCallback) {
  if (!this.isWon()) {
    this.promptMove( (start, end) => this.move(start, end), completionCallback);
  }
  else {
    console.log("You win!");
    completionCallback();
  }
};

module.exports = Game;
