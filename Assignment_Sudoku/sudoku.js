	function solver() // solver function for the board 
	 {         
			  BOARD_SIZE = 4;           // total size of the board (the size indirectly indicates the range of numbers that can be used)
			  BOX_SIZE = 2;             // size of each box (2 means 2*2 i.e., 4 elements place 3 for 3*3 i.e., 9 element sudoku)
			  EMPTY = "";              

			  var board = new Array();  // the board is represented as array!

			  function valid_move(num, row, col) // checks whether the solution or move is valid or not!
			  { 		
		
				  var row_index, col_index, box_index;    // Indexes of the cells to valid_move
				  var r = (Math.floor(row / BOX_SIZE) * BOX_SIZE);
				  var c = (Math.floor(col / BOX_SIZE) * BOX_SIZE);

				  
				  for (var i=0; i<BOARD_SIZE; i++) // this logic checks for same element if presents on the combining row/column and returns true if valid and false if not valid
					{
						  row_index = (row * BOARD_SIZE) + i;
						  col_index = col + (i * BOARD_SIZE);
						  box_index = (r + Math.floor(i / BOX_SIZE)) * BOARD_SIZE + c + (i % BOX_SIZE);
						  if (num == board[row_index].value ||
							  num == board[col_index].value ||
							  num == board[box_index].value)
							  return false;
					}
					  return true;
			  }
			  
			  function solution_check(cell_id)  // checks the solution in backtracking mode till the board is completely solved!
			  {      
				  
				  var row = Math.floor(cell_id / BOARD_SIZE);
				  var col = cell_id % BOARD_SIZE;

				  if (cell_id >= board.length)
					  return true;

				  if (board[cell_id].value != EMPTY)
					  return solution_check(cell_id + 1);

				  for (var i=1; i<=BOARD_SIZE; i++) 
				  {
					  if (valid_move(i, row, col)) 
					  {
						  board[cell_id].value = i;
						  if (solution_check(cell_id + 1))
							  return true;
					  }
				  }

				  board[cell_id].value = EMPTY;
				  return false;
			  }
			  
			  this.game_start = function() 
			  {
				  board = document.getElementsByTagName("input"); // gets the starting input from user and start solving board till complete
				  if (!solution_check(0))
					alert("The input doesnot meet to a solution! Try different input");
			  }
			 this.make_board = function() // function for drawing the board structure!
			 { 
			  var hstyle, vstyle;      
			  for (var row=0; row<BOARD_SIZE; row++) 
			  {
				  document.write('<tr>');
				  hstyle = row % BOX_SIZE ? "" : "border-top: 1px solid #000;";
				  for (var col=0; col<BOARD_SIZE; col++) 
				  {
					  vstyle = col % BOX_SIZE ? "" : "border-left: 1px solid #000;";
					  document.write('<td style="' + hstyle + vstyle + '">');
					  document.write('<input type="text" size="1" maxlength="1" /></td>');
				  }
				  document.write('</tr>');
			  }
			}
	}
		
