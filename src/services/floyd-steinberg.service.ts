import * as Jimp from 'jimp';
import { IColor } from 'src/models/color.interface';

interface IQuantError {
    quantError: IColor;
    hex: number;
}

export class FloydSteinberg {
    run(image: Jimp, factor: number): Jimp {
        const MAX_HEX = 4294967295;
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        
        console.log(width);
        image.scan(0, 0, width, height, (x, y, index) => {
            const quantError = this.quantError(image, index, 256);  

            if (x + 1 < (width - 1)) {
                const oldColor = image.getPixelColor(x + 1, y);
                const newColor = oldColor + (quantError.hex * (7 / 16));                
                image.setPixelColor(newColor <= MAX_HEX ? newColor : 0, x + 1, y);
            }

            if (x - 1 >= 0 && y + 1 < (height - 1)) {
                const oldColor = image.getPixelColor(x - 1, y + 1);
                const newColor = oldColor + (quantError.hex * (3 / 16));
                image.setPixelColor(newColor <= MAX_HEX ? newColor : 0, x - 1, y + 1);
            }

            if (y + 1 < (height - 1)) {
                const oldColor = image.getPixelColor(x, y + 1);
                const newColor = oldColor + (quantError.hex * (5 / 16));
                image.setPixelColor(newColor <= MAX_HEX ? newColor : 0, x, y + 1);
            }

            if ( x + 1 < (width - 1) && y + 1 < (height -1)) {
                const oldColor = image.getPixelColor(x + 1, y + 1);
                const newColor = oldColor + (quantError.hex * (1 / 16));
                image.setPixelColor(newColor <= MAX_HEX ? newColor : 0, x + 1, y + 1);
            }
        });

        return image;
    }

    private quantError(image: Jimp, index: number, factor: number): IQuantError {
        const data = image.bitmap.data;
        const r = data[ index + 0 ];
        const g = data[ index + 1 ];
        const b = data[ index + 2 ];
        // const a = data[ index + 3 ];

        const oldColor: IColor = { r, g, b };
        const newColor: IColor = { r: r / factor, g: g / factor, b: b / factor };
        const quantError: IColor = {
            r: oldColor.r - newColor.r,
            g: oldColor.g - newColor.g,
            b: oldColor.b - newColor.b
        };
        const hex = Jimp.rgbaToInt(quantError.r, quantError.g, quantError.b, 1.0)
        return { quantError, hex };
    }
}

export const floydSteinberg = new FloydSteinberg();