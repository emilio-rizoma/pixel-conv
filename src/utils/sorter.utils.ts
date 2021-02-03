import * as Jimp from 'jimp';

interface IKernel {
  name: KernelType;
  kernel: number[][];
}

interface IColor {
  r, g, b: number;
}

export enum KernelType {

  edgeA = 'edgeA',
  edgeB = 'edgeB',
  cubism = 'cubism',
  finger = 'finger',
  waves = 'waves',
  lines = 'lines',
  gauss = 'gauss'
}

class Convolute {
  artik: IKernel[] = [
    {
      name: KernelType.cubism,
      kernel: [
        [-1, -1, -1],
        [-1, 9, -1],
        [-1, -1, -1],
      ]
    },
    {
      name: KernelType.finger,
      kernel: [
        [-1, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
      ]
    },
    {
      name: KernelType.waves,
      kernel: [
        [0, 0, 0],
        [1, -1, 1],
        [0, 0, 0],
      ]
    },
    {
      name: KernelType.lines,
      kernel: [
        [-2, -1, 3],
        [1, 0, 1],
        [-3, 1, 2],
      ]
    },
    {
      name: KernelType.gauss,
      kernel: [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
      ]
    }
  ];
  kernels: IKernel[] = [
    {
      name: KernelType.edgeA,
      kernel: [
        [1, 0, -1],
        [0, 0, 0],
        [-1, 0, 1],
      ],
    },
    {
      name: KernelType.edgeB,
      kernel: [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1]
      ],
    },
    {
      name: KernelType.gauss,
      kernel: [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
      ]
    }
  ];
  // edge: IKernel = { name: KernelType.edge, kernel: [[0, 1, 0], [1, 4, 1], [0, 1, 0]] };
  // focus: IKernel = { name: KernelType.focus, kernel: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]] };
  // gauss: IKernel = { name: KernelType.gauss, kernel: [[1, 2, 1], [2, 4, 2], [1, 2, 1]] };

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

      const outPath = './public/output/';
      const outName = `${name.split('.')[0]}_${type ? type : 'mixed'}.jpg`;
      Jimp.read(path)
        .then((image) => {

          // Will make a copy for later
          // const roll = image.clone();
          // roll.resize(Jimp.AUTO, 1440);
          image.resize(Jimp.AUTO, 1440);
          image.color([
            { apply: 'hue', params: [10] }
          ]);
          // this.floydSteinberg(roll,124);

          // this.kernels.forEach(el => {
          // roll.resize(Jimp.AUTO, 1440);
          // image.convolution(this.kernels[0].kernel)
          // });
          // this.plasmaSorter(image);
          // Need to focus?
          this.floydSteinberg(image, floyd);
          for (let index = 0; index < rounds; index++) {
            image.convolute(this.artik.filter(x => x.name == type).pop().kernel);
          }
          
          this.plasmaSorter(image);
          
          image.brightness(0.1);
          // image.convolute(this.artik.filter(x => x.name == KernelType.gauss).pop().kernel);
          // roll.scan(0, 0, roll.bitmap.width, roll.bitmap.height, (x, y, idx) => {
          //   const raw = roll.bitmap;
          //   const r = raw.data[idx + 0];
          //   const g = raw.data[idx + 1];
          //   const b = raw.data[idx + 2];
          //   const a = raw.data[idx + 3];
          //   const cur = Jimp.rgbaToInt(r, g, b, 1);  

          //   if (cur > 255) {              
          //     image.setPixelColour(cur, x, y);
          //   }
          // });

          // image.composite(roll, 100, 0, {
          //   mode: Jimp.BLEND_ADD,
          //   opacitySource: 0.5,
          //   opacityDest: 0.9
          // });
          image.write(outPath + outName);
          return resolve(outName);
        })
        .catch((err) => {
          console.log(err);
          return reject();
        });
    });
  }

  private randman(prim: number) {
    return Math.random() > 0.1 ? prim / 2 : prim / 4
  }

  private async plasmaSorter(image: Jimp) {
    let val = 1;
    const raw = image.bitmap;
    const width = raw.width;
    const randy = Math.floor(Math.random() * Math.floor(width / 2));
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      let newColor = 0x00000000;
      const a = raw.data[idx + 3];
      // if ((y % randy) !== 0) {
      if (x == image.bitmap.width - 1) {
        val = 6;
      }
      switch (val) {
        case 1:
          val++;
          const g = raw.data[idx + 1];
          const gCur = { r: this.randman(g), g, b: this.randman(g) };
          newColor = Jimp.rgbaToInt(gCur.r, gCur.g, gCur.b, a);
          break;
        case 2:
          val++;
          const r = raw.data[idx];
          const rCur = { r, g: this.randman(r), b: this.randman(r) };
          newColor = Jimp.rgbaToInt(rCur.r, rCur.g, rCur.b, a);
          break;
        case 3:
          val = 1;
          const b = raw.data[idx + 2];
          const bCur = { r: this.randman(b), g: this.randman(b), b };
          newColor = Jimp.rgbaToInt(bCur.r, bCur.g, bCur.b, a);
          break;
        default:
          val = 1;
          // newColor =  0x88F2041;
          // newColor = Jimp.rgbaToInt(0,0,0, a);
          break;
      }
      // } else {
      //   // newColor = 0x00000000;
      //   newColor = Jimp.rgbaToInt(0, 0, 0, 0.1);
      // }

      image.setPixelColor(newColor, x, y);


      // if (x == image.bitmap.width - 1 && y == image.bitmap.height - 1) {
      // }
    });

  }

  private async floydSteinberg(image: Jimp, factor: number) {
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      const r = image.bitmap.data[idx + 0];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      const a = image.bitmap.data[idx + 3];
      const oldColor = { r, g, b };
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
