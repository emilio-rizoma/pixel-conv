import * as Jimp from 'jimp';
import { ColorI, IColor } from 'src/models/interfaces/color.interface';

function alter(image: Jimp, color: IColor, x: number, y: number, bias: number, length: number) {
    let newColor = Jimp.rgbaToInt(color.r, color.g, color.b, color.a);
    image.setPixelColor(newColor, x, y);
}
function randman(prim: number) {
    return Math.random() > 0.5 ? prim / 2 : prim / 4;
}
// const plasmaTexture = (image: Jimp): Jimp => {

//     let xVal = 0;
//     let yVal = 1;
//     let xList: number[] = []
//     const bitmap = image.bitmap;
//     const height = bitmap.height;
//     const width = bitmap.width;

//     image.scan(0, 0, width, height, (x, y, index) => {
//         let current: IColor;
//         const r = bitmap.data[ index ];
//         const g = bitmap.data[ index + 1 ];
//         const b = bitmap.data[ index + 2 ];
//         const a = bitmap.data[ index + 3 ];
//         image.setPixelColor(Jimp.rgbaToInt(randman(r), randman(g), randman(b), a), x, y);

//         if (x % (width / (width / 2)) == 0) {
//             if (y % (height / (height / 6)) != 0) {
//                 image.setPixelColor(Jimp.rgbaToInt(r, randman(g), randman(b), a), x, y);
//                 // if (x % 2 == 0) {
//                 //     image.setPixelColor(Jimp.rgbaToInt(r * 0.75, randman(g), randman(b), a), x, y);
//                 // }
//             }
//         }

//         if (x % (width / (width / 4)) == 0) {
//             if (y % (height / (height / 6)) != 0) {
//                 image.setPixelColor(Jimp.rgbaToInt(randman(r), g * 0.75, randman(b), a), x, y);
//             }
//         }

//         if (x % (width / (width / 8)) == 0) {
//             if (y % (height / (height / 6)) != 0) {
//                 image.setPixelColor(Jimp.rgbaToInt(randman(r), randman(g), b * 0.75, a), x, y);
//             }
//         }
//     });
//     return image;
// }

/** EXTRACTS 4 CH. RGBA FROM JIMP */
const scanColors = (index: number, image: Jimp): ColorI => {
    const bitmap = image.bitmap;
    const RED = bitmap.data[ index ];
    const GREEN = bitmap.data[ index + 1 ];
    const BLUE = bitmap.data[ index + 2 ];
    const ALPHA = bitmap.data[ index + 3 ];
    const color = Jimp.rgbaToInt(randman(RED), randman(GREEN), randman(BLUE), ALPHA);
    return { color, RED, GREEN, BLUE, ALPHA };
};

const ledTexture = async (image: Jimp): Promise<Jimp> => {
    const bitmap = image.bitmap;
    const height = bitmap.height;
    const width = bitmap.width;

    image.scan(0, 0, width, height, (x, y, index) => {
        const { RED, GREEN, BLUE, ALPHA, color } = scanColors(index, image);
        image.setPixelColor(color, x, y);

        if (y % (height / (height / 6)) != 0) {
            if (x % (width / (width / 2)) == 0) {
                image.setPixelColor(Jimp.rgbaToInt(RED, GREEN, BLUE, ALPHA), x, y);
                if (x % 2 == 0) {
                    image.setPixelColor(Jimp.rgbaToInt(RED, randman(GREEN), randman(BLUE), ALPHA), x, y);
                }
            }
            if (x % (width / (width / 4)) == 0) {
                image.setPixelColor(Jimp.rgbaToInt(randman(RED), GREEN, randman(BLUE), ALPHA), x, y);
            }

            if (x % (width / (width / 8)) == 0) {
                image.setPixelColor(Jimp.rgbaToInt(randman(RED), randman(GREEN), BLUE, ALPHA), x, y);
            }
        } 
        else {
            // 0xFF816F
            const altColor = 0xFFFFF;
            image.setPixelColor(altColor, x, y);
        }
    });
    return image;
}

export { ledTexture };