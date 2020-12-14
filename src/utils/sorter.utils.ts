import * as Jimp from 'jimp';

interface IKernel {
  name: KernelType;
  kernel: number[][];
}

interface IColor {
  r, g, b: number;
}

export enum KernelType {
  border = 'border',
  focus = 'focus',
  gauss = 'gauss',
  sharp = 'sharp',
  cubism = 'cubism',
  finger = 'finger',
  waves = 'waves',
  lines = 'lines',
}

class Convolute {
  kernels: IKernel[] = [
    {
      name: KernelType.cubism,
      kernel: [
        [-1, -1, -1],
        [-1, 9, -1],
        [-1, -1, -1],
      ],
    },
    {
      name: KernelType.finger,
      kernel: [
        [-1, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
    },
    {
      name: KernelType.waves,
      kernel: [
        [0, 0, 0],
        [1, -1, 1],
        [0, 0, 0],
      ],
    },
    {
      name: KernelType.lines,
      kernel: [
        [-2, -1, 3],
        [1, 0, 1],
        [-3, 1, 2],
      ],
    },
  ];
  focus: IKernel = { name: KernelType.focus, kernel: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]] };
  gauss: IKernel = { name: KernelType.gauss, kernel: [[1, 2, 1], [2, 4, 2], [1, 2, 1]] };

  run(
    name = 'pixel-conv',
    path: string = null,
    type: KernelType = null,
    rounds = 1,
    floyd = 9,
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!path) {
        console.log('Null file');
        return reject();
      }
      const selected: IKernel = this.kernels
        .filter((x) => x.name === type)
        .pop();
      const outPath = './public/output/';
      const outName = `${name.split('.')[0]}_${type ? type : 'mixed'}.jpg`;
      Jimp.read(path)
        .then((image) => {
          const roll = image.clone();
          this.floydSteinberg(image, floyd);
          if (!type) {
            for (let i = 0; i < rounds; i++) {
              for (let i = 0; i < this.kernels.length; i++) {
                image.convolute(this.kernels[i].kernel);
              }
            }
          } else {
            for (let i = 0; i < rounds; i++) {
              image.convolute(selected.kernel);
            }
          }
          image.convolute(this.focus.kernel);
          image.composite(roll, 0, 0, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 0.65,
            opacityDest: 0.85,
          });
          image.write(outPath + outName);
          return resolve(outName);
        })
        .catch((err) => {
          console.log(err);
          return reject();
        });
    });
  }

  private async floydSteinberg(image: Jimp, factor: number) {
    // let temp = image.clone();
    // temp.convolute(this.focus.kernel);
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      const r = image.bitmap.data[idx + 0];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      const a = image.bitmap.data[idx + 3];
      const oldColor = { r, g, b };

      // const rT = temp.bitmap.data[idx + 0];
      // const gT = temp.bitmap.data[idx + 1];
      // const bT = temp.bitmap.data[idx + 2];
      // const aT = temp.bitmap.data[idx + 3];
      // const tColor = { r: rT, g: gT, b: bT };

      const newColor = this.quantizeColor(oldColor, factor);
      const quant = this.quantizeError(oldColor, newColor);
      image.setPixelColor(Jimp.rgbaToInt(quant.r, quant.g, quant.b, a), x, y);

      // if (x == image.bitmap.width - 1 && y == image.bitmap.height - 1) {
      // }
    });

  }

  private quantizeColor(color: IColor, factor: number): IColor {
    let { r, g, b } = color;
    r = Math.round((factor * r) / 255) * (255 / factor);
    g = Math.round((factor * g) / 255) * (255 / factor);
    b = Math.round((factor * b) / 255) * (255 / factor);
    if (r < 0) {
      r = 0;
    } else if (r > 255) {
      r = 255;
    }
    if (g < 0) {
      g = 0;
    } else if (g > 255) {
      g = 255;
    }
    if (b < 0) {
      b = 0;
    } else if (b > 255) {
      b = 255;
    }
    return { r, g, b };
  }

  private quantizeError(oldColor: IColor, newColor: IColor): IColor {
    let r = oldColor.r - newColor.r;
    let g = oldColor.g - newColor.g;
    let b = oldColor.b - newColor.b;
    if (r < 0) {
      r = 0;
    } else if (r > 255) {
      r = 255;
    }
    if (g < 0) {
      g = 0;
    } else if (g > 255) {
      g = 255;
    }
    if (b < 0) {
      b = 0;
    } else if (b > 255) {
      b = 255;
    }

    return { r, g, b };
  }
}

export const convolute = new Convolute();
