import * as Jimp from 'jimp';
import * as Kernel from 'src/models/interfaces/kernel.interface';
import { ledTexture } from './plasma-texture.service';

const convolute = async (name = 'pixel-conv', path: string = null, type: Kernel.KernelE = undefined, rounds = 1, floyd = 9) => {
  if (!path) {
    throw new Error("Null file");
  }
  const outPath = './public/output/';
  const typeName = type ?? 'midex';
  const outName = `${name.split('.')[0]}_${typeName}.jpg`;
  
  let img: Jimp;
  try {
    img = await Jimp.read(path);
    img.resize(Jimp.AUTO, 2880);
    const temp = await cloneBuild(img);
    img = await ledTexture(img);
    for (let index = 0; index < rounds; index++) {
      temp.convolute(Kernel.find(type));
      // img.convolute(kernels.filter(x => x.name == KernelE.cubism).pop().kernel);
    }
    img.composite(temp, 0, 0, { mode: Jimp.BLEND_DIFFERENCE, opacitySource: 0.9, opacityDest: 0.5 });
    img.write(outPath + new Date().getTime() + '_' + floyd + '_' + type + "_" + rounds + "_" + outName);
  } catch (error) {
    throw (new Error(`Algo fallò ${error}`));
  }
  return img;
}

async function cloneBuild(img: Jimp) {
  let temp = img.clone();
  temp = await ledTexture(temp);
  temp.convolute(Kernel.find(Kernel.KernelE.edgeA));
  temp.convolute(Kernel.find(Kernel.KernelE.edgeB));
  return temp;
}

export { convolute };