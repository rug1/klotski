import React from "react";
import styled from "styled-components";
import "./App.css";

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const KlotskiGrid = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(4, 80px);
  grid-template-rows: repeat(5, 80px);
  border: 5px solid black;
  grid-gap: 5px;
  background-color: black;
`;

const VerticalBlock = styled.div`
  background-color: blue;
  grid-row: ${({ row }) => `${row} / ${row + 2}`};
  grid-column: ${({ col }) => `${col} / ${col}`};
`;

const HorizontalBlock = styled.div`
  background-color: red;
  grid-row: ${({ row }) => `${row} / ${row + 1}`};
  grid-column: ${({ col }) => `${col} / ${col + 2}`};
`;

const SmallBlock = styled.div`
  background-color: purple;
  grid-row: ${({ row }) => `${row} / ${row}`};
  grid-column: ${({ col }) => `${col} / ${col}`};
`;

const BigBlock = styled.div`
  background-color: yellow;
  grid-row: ${({ row }) => `${row} / ${row + 2}`};
  grid-column: ${({ col }) => `${col} / ${col + 2}`};
`;

const SolveButton = styled.button`
  margin-top: 60px;
  font-size: 16px;
  font-weight: bold;
  padding: 8px;
  border-radius: 5px;
  background-color: #fa5783;
  color: white;
  width: 150px;
  height: 50px;
  cursor: pointer;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.smallBlock = 1;
    this.verticalBlock = 2;
    this.horizontalBlock = 3;
    this.bigBlock = 4;

    this.emptyCell = 0;
    this.borderCell = -1;

    this.blocks = [
      { row: 1, col: 2, shape: this.bigBlock },
      { row: 1, col: 1, shape: this.verticalBlock },
      { row: 1, col: 4, shape: this.verticalBlock },
      { row: 3, col: 1, shape: this.verticalBlock },
      { row: 3, col: 4, shape: this.verticalBlock },
      { row: 3, col: 2, shape: this.horizontalBlock },
      { row: 4, col: 2, shape: this.smallBlock },
      { row: 4, col: 3, shape: this.smallBlock },
      { row: 5, col: 1, shape: this.smallBlock },
      { row: 5, col: 4, shape: this.smallBlock }
    ];

    this.board = [
      [-1, -1, -1, -1, -1, -1],
      [-1, 2, 1, 1, 3, -1],
      [-1, 2, 1, 1, 3, -1],
      [-1, 4, 6, 6, 5, -1],
      [-1, 4, 7, 8, 5, -1],
      [-1, 9, 0, 0, 10, -1],
      [-1, -1, -1, -1, -1, -1]
    ];

    this.state = {
      blocks: this.blocks,
      board: this.board,
      moves: []
    };
  }

  isCellDownFree = (board, block) => {
    const { shape, row, col } = block;
    let cellIsFree = false;

    if (shape === this.smallBlock) {
      cellIsFree = board[row + 1][col] === this.emptyCell;
    } else if (shape === this.verticalBlock) {
      cellIsFree =
        board[row + 1][col] === this.emptyCell &&
        board[row + 2][col] === this.emptyCell;
    } else if (shape === this.horizontalBlock) {
      cellIsFree =
        board[row + 1][col] === this.emptyCell &&
        board[row + 1][col + 1] === this.emptyCell;
    } else if (shape === this.bigBlock) {
      cellIsFree =
        board[row + 1][col] === this.emptyCell &&
        board[row + 1][col + 1] === this.emptyCell &&
        board[row + 2][col] === this.emptyCell &&
        board[row + 2][col + 1] === this.emptyCell;
    } else {
      cellIsFree = false;
    }

    return cellIsFree;
  };

  moveBlock = () => {};

  updateBoard = () => {};

  solve = () => {
    this.state.blocks.forEach(block => {
      this.isCellDownFree(this.state.board, block);

      // TODO:
      // this.isCellUpFree(this.state.board, block);
      // this.isCellRightFree(this.state.board, block);
      // this.isCellLeftFree(this.state.board, block);
    });
  };

  render() {
    const verticalBlocks = this.state.blocks.filter(
      block => block.shape === this.verticalBlock
    );
    const horizontalBlocks = this.state.blocks.filter(
      block => block.shape === this.horizontalBlock
    );
    const bigBlocks = this.state.blocks.filter(
      block => block.shape === this.bigBlock
    );
    const smallBlocks = this.state.blocks.filter(
      block => block.shape === this.smallBlock
    );

    return (
      <PageContainer>
        <h1>Klotski</h1>
        <KlotskiGrid>
          {verticalBlocks.map((block, index) => (
            <VerticalBlock
              key={`${block.shape}-${index}`}
              row={block.row}
              col={block.col}
            />
          ))}
          {horizontalBlocks.map((block, index) => (
            <HorizontalBlock
              key={`${block.shape}-${index}`}
              row={block.row}
              col={block.col}
            />
          ))}
          {bigBlocks.map((block, index) => (
            <BigBlock
              key={`${block.shape}-${index}`}
              row={block.row}
              col={block.col}
            />
          ))}
          {smallBlocks.map((block, index) => (
            <SmallBlock
              key={`${block.shape}-${index}`}
              row={block.row}
              col={block.col}
            />
          ))}
        </KlotskiGrid>
        {/* <SolveButton onClick={this.solve}>Solve!</SolveButton> */}
      </PageContainer>
    );
  }
}

export default App;
