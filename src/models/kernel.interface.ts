export interface IKernel {
    name: KernelType;
    kernel: number[][];
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