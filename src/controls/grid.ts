export type GridType = "square" | "honeycomb";

export interface Cell {
    centerX: number;
    centerY: number;
}

export interface GridConfiguration {
    gridType: GridType,
    cells: Cell[][];
    columnWidth: number;
    rowHeight: number;
    columnsPadding: number;
    rowsPadding: number;
    width: number;
    height: number;
}

export interface Grid {
    getConfiguration(width: number, height: number): GridConfiguration;
}

export function getGrid(gridType: GridType) {
    switch (gridType) {
        case "square": return getSquareGrid();
        case "honeycomb": return getHoneyCombGrid();
    }

    throw new Error("Unknown grid type " + gridType);
}

function getSquareGrid(): Grid {
    class SquareGrid implements Grid {
        aspect = 200 / 320;

        getConfiguration(width: number, height: number): GridConfiguration {
            const cols = this.getCols();
            const rows = this.getRows();
            const columnsPadding = width * 5 / 100 / 2;
            const rowsPadding = columnsPadding;
            const columnWidth = (width - columnsPadding * 2) / cols;
            const rowHeight = (height - rowsPadding * 2) / rows;
            const cells: Cell[][] = []; for (let row = 0; row < rows; ++row) {const cellRow: Cell[] = [];
                for (let col = 0; col < cols; ++col) {
                    cellRow.push({
                        centerX: columnsPadding + columnWidth * (col + 1 / 2),
                        centerY: rowsPadding + rowHeight * (row + 1 / 2),
                    });
                }
                cells.push(cellRow);
            }
            return {
                gridType: "square",
                cells,
                columnWidth,
                rowHeight,
                columnsPadding,
                rowsPadding,
                width,
                height,
            };
        }

        private getCols() {
            return 10;
        }

        private getRows() {
            return Math.floor(this.getCols() * this.aspect) + 1;
        }
    }

    return new SquareGrid();
}

function getHoneyCombGrid(): Grid {
    class SquareGrid implements Grid {
        aspect = 200 / 320;

        getConfiguration(width: number, height: number): GridConfiguration {
            const cols = this.getCols();
            const rows = this.getRows();
            const columnsPadding = width * 5 / 100 / 2;
            const rowsPadding = columnsPadding;
            const columnWidth = (width - columnsPadding * 2) / cols;
            const rowHeight = (height - rowsPadding * 2) / rows;
            const cells: Cell[][] = [];
            for (let row = 0; row < rows; ++row) {
                const cellRow: Cell[] = [];
                const cellCols = row % 2 == 0 ? cols : cols - 1;
                const padding = row % 2 == 0 ? 0 : columnWidth / 2;
                for (let col = 0; col < cellCols; ++col) {
                    cellRow.push({
                        centerX: padding + columnsPadding + columnWidth * (col + 1 / 2),
                        centerY: rowsPadding + rowHeight * (row + 1 / 2),
                    });
                }
                cells.push(cellRow);
            }
            return {
                gridType: "square",
                cells,
                columnWidth,
                rowHeight,
                columnsPadding,
                rowsPadding,
                width,
                height
            };
        }

        getCols() {
            return 10;
        }

        getRows() {
            return Math.floor(this.getCols() * this.aspect) + 1;
        }
    }

    return new SquareGrid();
}
