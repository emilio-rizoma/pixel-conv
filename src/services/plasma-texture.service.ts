import * as Jimp from 'jimp';

class PlasmaTexture {
    run(image: Jimp): Jimp {
        let val = 1;
        const bitmap = image.bitmap;
        const height = bitmap.height;
        const width = bitmap.width;

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, index) => {
            let newColor = 0x00000000;
            const a = bitmap.data[ index + 3 ];
            if (y % 5 != 0) {
                if (x == width - 1) {
                    val = 6;
                }
                const r = bitmap.data[ index ];
                const g = bitmap.data[ index + 1 ];
                const b = bitmap.data[ index + 2 ];
                switch (val) {
                    case 1:
                        val++;
                        const gCur = { r: this.randman(r), g, b: this.randman(b) };
                        newColor = Jimp.rgbaToInt(gCur.r, gCur.g, gCur.b, a);
                        break;
                    case 2:
                        val++;
                        const rCur = { r, g: this.randman(g), b: this.randman(b) };
                        newColor = Jimp.rgbaToInt(rCur.r, rCur.g, rCur.b, a);
                        break;
                    case 3:
                        val = 1;
                        const bCur = { r: this.randman(r), g: this.randman(g), b };
                        newColor = Jimp.rgbaToInt(bCur.r, bCur.g, bCur.b, a);
                        break;
                    default:
                        val = 1;
                        break;
                }
            } else {
                newColor = Jimp.rgbaToInt(2, 2, 2, 255);
            }
            image.setPixelColor(newColor, x, y);
 
        });
        return image;
    }

    private randman(prim: number) {
        return Math.random() > 0.5 ? prim / 2 : prim / 4;
    }
}

export const plasmaTexture = new PlasmaTexture();