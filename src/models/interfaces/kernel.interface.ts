// import { kernels } from 'src/constants/kernel';
import { data } from 'src/models/data/kernels.json';

type MatrixT = number[][];

interface KernelI {
    name: KernelE;
    kernel: MatrixT;
}

enum KernelE {
    edgeA = 'edgeA',
    edgeB = 'edgeB',
    cubism = 'cubism',
    finger = 'finger',
    waves = 'waves',
    lines = 'lines',
    gauss = 'gauss',
    plasma = 'plasma',
    deform = 'deform'
}

function find(kernelName: KernelE): MatrixT {
    const kernel = data.filter(f => f.name === kernelName).map(m => m.kernel.map(k => k.map(km => km + getRandomInt(-1, 1)))).shift();
    return kernel ? kernel : [];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  


export { KernelI, MatrixT, KernelE, find };