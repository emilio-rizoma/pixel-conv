import { IKernel, KernelType } from 'src/models/kernel.interface';

export const artik: IKernel[] = [
    {
        name: KernelType.cubism,
        kernel: [
            [ -1, -1, -1 ],
            [ -1, 9, -1 ],
            [ -1, -1, -1 ],
        ]
    },
    {
        name: KernelType.finger,
        kernel: [
            [ -1, 1, 0 ],
            [ 1, 1, 1 ],
            [ 0, 1, 0 ],
        ]
    },
    {
        name: KernelType.waves,
        kernel: [
            [ 0, 0, 0 ],
            [ 1, -1, 1 ],
            [ 0, 0, 0 ],
        ]
    },
    {
        name: KernelType.lines,
        kernel: [
            [ -2, -1, 3 ],
            [ 1, 0, 1 ],
            [ -3, 1, 2 ],
        ]
    },
    {
        name: KernelType.gauss,
        kernel: [
            [ 1, 2, 1 ],
            [ 2, 4, 2 ],
            [ 1, 2, 1 ]
        ]
    },
    {
        name: KernelType.plasma,
        kernel: [
            [ 0, 0, 0 ],
            [ 1, 0, 1 ],
            [ 0, 0, 0 ]
        ]
    }
];

export const kernels: IKernel[] = [
    {
        name: KernelType.edgeA,
        kernel: [
            [ 1, 0, -1 ],
            [ 0, 0, 0 ],
            [ -1, 0, 1 ],
        ],
    },
    {
        name: KernelType.edgeB,
        kernel: [
            [ -1, -1, -1 ],
            [ -1, 8, -1 ],
            [ -1, -1, -1 ]
        ],
    },
    {
        name: KernelType.gauss,
        kernel: [
            [ 1, 2, 1 ],
            [ 2, 4, 2 ],
            [ 1, 2, 1 ]
        ]
    },
    {
        name: KernelType.deform,
        kernel: [
            [ 0, -1, 0 ],
            [ -1, 0, -1 ],
            [ 0, 0, 1 ]
        ]
    }
];