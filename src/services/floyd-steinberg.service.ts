import * as Jimp from 'jimp';
import { IColor } from 'src/models/color.interface';

interface IQuantError {
    quantError: IColor;
    hex: number;
}

class FloydSteinberg {
    run(image: Jimp, factor: number): Jimp {
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        
        // console.log(width);
        image.scan(0, 0, width, height, (x, y, index) => {
            const quantError = this.quantError(image, index, factor);  

            if (x + 1 < width) {
                this.setColor(image, x + 1, y, quantError, 7);
            }

            if (x - 1 >= 0 && y + 1 < height) {
                this.setColor(image, x - 1, y + 1, quantError, 3);
            }

            if (y + 1 < height) {
                this.setColor(image, x, y + 1, quantError, 5);
            }

            if ( x + 1 < width && y + 1 < height) {
                this.setColor(image, x + 1, y + 1, quantError, 1);
            }
        });

        return image;
    }

    private setColor(image: Jimp, x: number, y: number, error: IQuantError, factor: number) {
        const hex = image.getPixelColor(x, y);
        const oldColor = Jimp.intToRGBA(hex);
        const r = ((oldColor.r + error.quantError.r) * factor) / 16;
        const g = ((oldColor.g + error.quantError.g) * factor) / 16;
        const b = ((oldColor.b + error.quantError.b) * factor) / 16;
        console.log(r + ", " + g + ", " + ", " + b);
        const newColor = Jimp.rgbaToInt(r, g, b, oldColor.a);
        image.setPixelColor(newColor, x, y);
    }

    private quantError(image: Jimp, index: number, factor: number): IQuantError {
        const data = image.bitmap.data;
        const r = data[ index ];
        const g = data[ index + 1 ];
        const b = data[ index + 2 ];
        const a = data[ index + 3 ];

        const oldColor: IColor = { r, g, b };
        const newColor: IColor = { r: r / factor, g: g / factor, b: b / factor };
        const quantError: IColor = {
            r: oldColor.r - newColor.r,
            g: oldColor.g - newColor.g,
            b: oldColor.b - newColor.b
        };
        const hex = Jimp.rgbaToInt(quantError.r, quantError.g, quantError.b, a)
        return { quantError, hex };
    }
}

export const floydSteinberg = new FloydSteinberg();