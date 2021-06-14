import * as Jimp from 'jimp';
import { floydSteinberg } from 'src/services/floyd-steinberg.service';
import { KernelType } from 'src/models/kernel.interface';
import { plasmaTexture } from './plasma-texture.service';
import { artik } from 'src/constants/kernel';

class Convolute {
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
          // image.resize(Jimp.AUTO, 1440);
          image = floydSteinberg.run(image, 255);
          image = plasmaTexture.run(image);
          for (let index = 0; index < rounds; index++) {
            image.convolute(artik.filter(x => x.name == type).pop().kernel);
          }

          // this.plasmaSorter(image);
          image.write(outPath + new Date().getTime() + '_' + floyd + '_' + type + "_" + rounds + "_" + outName );
          return resolve(outName);
        })
        .catch((err) => {
          console.log(err);
          return reject();
        });
    });
  }



}

export const convolute = new Convolute();