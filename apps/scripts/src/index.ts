
interface Grid {
  x_min: number;
  x_max: number;

  y_min: number;
  y_max: number;

  z_min: number;
  z_max: number;
}

const grids: Grid[] = [
  {
    x_min: 2,
    x_max: 8,

    y_min: 0,
    y_max: 2,

    z_min: 0,
    z_max: 2,
  }
];

function convert(A = 10) {
  grids.forEach((grid) => {
    const width = Math.abs(grid.x_max - grid.x_min);
    const height = Math.abs(grid.y_max - grid.y_min);
    const depth = Math.abs(grid.z_max - grid.z_min);

    const model = {
      width: 10,
      height: 2,
      depth: 2,
    }

    const scale = Math.max(width / model.width, height / model.height, depth / model.depth); 

    const new_model = {
      // 10 & 1 * 1
      width: model.width * (width / model.width) * (A / width),

      height: model.height * (height / model.height) * (A / height),

      depth: model.depth * (A / depth) * scale,
    }

    console.log(new_model);
  });
}

convert();
