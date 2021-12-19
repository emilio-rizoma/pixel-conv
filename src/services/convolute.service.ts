import * as Jimp from 'jimp';
import { floydSteinberg } from 'src/services/floyd-steinberg.service';
import { KernelType } from 'src/models/kernel.interface';
import { plasmaTexture } from './plasma-texture.service';
import { artik, kernels } from 'src/constants/kernel';

class Convolute {
  run = async (name = 'pixel-conv', path: string = null, type: KernelType = undefined, rounds = 1, floyd = 9) => {
    if (!path) {
      throw new Error("Null file");
    }
    const outPath = './public/output/';
    const typeName = type ?? 'midex';
    const outName = `${name.split('.')}[0]_${typeName}.jpg`;

    let img: Jimp;

    try {
      img = await Jimp.read(path);
      img.resize(Jimp.AUTO, 2880);
      let temp = img.clone();
      temp = plasmaTexture.run(temp);
      temp.convolute(artik.filter(x => x.name == KernelType.finger).pop().kernel);
      temp.convolute(kernels.filter(x => x.name == KernelType.edgeA).pop().kernel);
      for (let index = 0; index < rounds; index++) {
        temp.convolute(kernels.filter(x => x.name == type).pop().kernel);
        img.convolute(artik.filter(x => x.name == KernelType.cubism).pop().kernel);
      }
      img.composite(temp, 0, 0, { mode: Jimp.BLEND_OVERLAY, opacitySource: 0.5, opacityDest: 0.5 });
      img.write(outPath + new Date().getTime() + '_' + floyd + '_' + type + "_" + rounds + "_" + outName);
    } catch (error) {
      throw(new Error(`Algo fallò ${error}`));
    }
    return img;
    // async () => { return ""; };
    // return new Promise<string>((resolve, reject) => {
    //   if (!path) {
    //     console.log('Null file');
    //     return reject();      }
    //   const outPath = './public/output/';
    // const outName = `${name.split('.')[0]}_${type ? type : 'mixed'}.jpg`;
    // Jimp.read(path)
    //   .then((image) => {
    //     image.resize(Jimp.AUTO, 2880);


    //     // image = floydSteinberg.run(image, 255);


    //     let temp = image.clone();
    //     temp = plasmaTexture.run(temp);
    //     // temp.convolute(kernels.filter(x => x.name == KernelType.gauss).pop().kernel);
    // temp.convolute(artik.filter(x => x.name == KernelType.finger).pop().kernel);
    // temp.convolute(kernels.filter(x => x.name == KernelType.edgeA).pop().kernel);
    // for (let index = 0; index < rounds; index++) {
    //   temp.convolute(kernels.filter(x => x.name == type).pop().kernel);
    // }

    // image.composite(temp, 0, 0, { mode: Jimp.BLEND_OVERLAY, opacitySource: 0.5, opacityDest: 0.9});

    // image.write(outPath + new Date().getTime() + '_' + floyd + '_' + type + "_" + rounds + "_" + outName );
    // return resolve(outName);
    //   })
    //   .catch((err) => {
    //     throw(err);
    //   });
    // });
  }



}

export const convolute = new Convolute();