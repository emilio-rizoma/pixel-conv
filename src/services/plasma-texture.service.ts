import * as Jimp from 'jimp';
import { IColor } from 'src/models/color.interface';

class PlasmaTexture {

    alter(image: Jimp, color: IColor, x: number, y: number, bias: number, length: number) {
        let newColor = Jimp.rgbaToInt(color.r, color.g, color.b, color.a);
        image.setPixelColor(newColor, x, y);
    }

    run(image: Jimp): Jimp {
        let xVal = 0;
        let yVal = 1;
        let xList: number[] = []
        const bitmap = image.bitmap;
        const height = bitmap.height;
        const width = bitmap.width;

        image.scan(0, 0, width, height, (x, y, index) => {
            let current: IColor;
            const r = bitmap.data[ index ];
            const g = bitmap.data[ index + 1 ];
            const b = bitmap.data[ index + 2 ];
            const a = bitmap.data[ index + 3 ];
            image.setPixelColor(Jimp.rgbaToInt(this.randman(r),this.randman(g),this.randman(b),a), x, y);

            if (x % (width / (width / 2)) == 0) {
                if (y % (height / (height / 6)) != 0) {
                    image.setPixelColor(Jimp.rgbaToInt(r, this.randman(g), this.randman(b) , a), x, y);
                    // if (x % 2 == 0) {
                    //     image.setPixelColor(Jimp.rgbaToInt(r * 0.75, this.randman(g), this.randman(b), a), x, y);
                    // }
                }
            }

            if (x % (width / (width / 4)) == 0) {
                if (y % (height / (height / 6)) != 0) {
                    image.setPixelColor(Jimp.rgbaToInt(this.randman(r), g * 0.75, this.randman(b), a), x, y);
                }
            }

            if (x % (width / (width / 8)) == 0) {
                if (y % (height / (height / 6)) != 0) {
                    image.setPixelColor(Jimp.rgbaToInt(this.randman(r), this.randman(g), b * 0.75, a), x, y);
                }
            }

            // if (y % (height / 2) != 0) {
            //     // if (x < width / 2) {
            //     //     image.setPixelColor(Jimp.rgbaToInt(r, g, 255, a), x, y);
            //     // }
            //     // if (x > width / 2) {
            //     //     image.setPixelColor(Jimp.rgbaToInt(r, 255, b , a), x, y);
            //     // }
            // }




        //     if (x == 0) {
        //         xVal = 0;
        //     }
        //     switch (xVal) {
        //         case 0: //  GREEN
        //             current = { r: this.randman(r), g, b: this.randman(b), a };
        //             xVal++;
        //             break;
        //         case 1: //  RED
        //             current = { r, g: this.randman(g), b: this.randman(b), a };
        //             xVal++;
        //             break;
        //         case 2: //  BLUE
        //             current = { r: this.randman(r), g: this.randman(g), b, a };
        //             xVal++;
        //             break;
        //         case 3: //  GREEN
        //             current = { r: this.randman(r), g, b: this.randman(b), a };
        //             xVal++;
        //             break;
        //         case 4: //  RED
        //             current = { r, g: this.randman(g), b: this.randman(b), a };
        //             xVal++;
        //             break;
        //         case 5: //  BLUE
        //             current = { r: this.randman(r), g: this.randman(g), b, a };
        //             xVal = 0;
        //             break;
        //         default:
        //             xVal = 0;
        //             current = { r, g, b, a };
        //             break;
        //     }
        //     // this.alter(image, current, x, y, 0, width);
        });
        // console.log(xList);

        // image.scan(0, 0, width, height, (x, y, index) => {
        //     let newColor = 0x00000000;
        //     const a = bitmap.data[ index + 3 ];
        //     // if (yVal == height - 1) {
        //     //     yVal = 1;
        //     // }
        //     if (y % 6 != 0) {
        // if (xVal == width - 1) {
        //     xVal = 1;
        // }
        //         let current: IColor;
        // const r = bitmap.data[ index ];
        // const g = bitmap.data[ index + 1 ];
        // const b = bitmap.data[ index + 2 ];
        //         if (xVal == 1) {
        //             xVal++;
        // current = { r: this.randman(r), g, b: this.randman(b) };
        // newColor = Jimp.rgbaToInt(current.r, current.g, current.b, a);
        //             if (yVal == 1 || yVal == 2) {
        //                 newColor = Jimp.rgbaToInt(2, 2, 2, 255);
        //             }
        //         } else if (xVal == 2) {
        //             xVal++;
        //             current = { r, g: this.randman(g), b: this.randman(b) };
        //             newColor = Jimp.rgbaToInt(current.r, current.g, current.b, a);
        //             if (yVal == 1) {
        //                 newColor = Jimp.rgbaToInt(2, 2, 2, 255);
        //             }
        //         } else if (xVal == 3) {
        //             xVal++;
        //             current = { r: this.randman(r), g: this.randman(g), b };
        //             newColor = Jimp.rgbaToInt(current.r, current.g, current.b, a);
        //         } else if (xVal == 4) {
        //             xVal++;
        //             current = { r: this.randman(r), g, b: this.randman(b) };
        //             newColor = Jimp.rgbaToInt(current.r, current.g, current.b, a);
        //         } else if (xVal == 5) {
        //             xVal++;
        //             current = { r, g: this.randman(g), b: this.randman(b) };
        //             newColor = Jimp.rgbaToInt(current.r, current.g, current.b, a);
        //             if (yVal == 1) {
        //                 newColor = Jimp.rgbaToInt(2, 2, 2, 255);
        //             }
        //         } else if (xVal == 6) {
        //             xVal = 1;
        //             current = { r: this.randman(r), g: this.randman(g), b };
        //             newColor = Jimp.rgbaToInt(current.r, current.g, current.b, a);
        //             if (yVal == 1 || yVal == 2) {
        //                 newColor = Jimp.rgbaToInt(2, 2, 2, 255);
        //             }   
        //         }
        //     } else {
        //         yVal = 1;
        //         newColor = Jimp.rgbaToInt(2, 2, 2, 255);
        //     }
        //     console.log(yVal +", " + xVal);


        //     image.setPixelColor(newColor, x, y);
        // });
        return image;
    }

    private randman(prim: number) {
        return Math.random() > 0.5 ? prim / 2 : prim / 4;
    }
}

export const plasmaTexture = new PlasmaTexture();

class LEDTexture {

    alter(image: Jimp, color: IColor, x: number, y: number, bias: number, length: number) {
        let newColor = Jimp.rgbaToInt(color.r, color.g, color.b, color.a);
        image.setPixelColor(newColor, x, y);
    }

    run(image: Jimp): Jimp {
        let xVal = 0;
        let yVal = 1;
        let xList: number[] = []
        const bitmap = image.bitmap;
        const height = bitmap.height;
        const width = bitmap.width;

        image.scan(0, 0, width, height, (x, y, index) => {
            let current: IColor;
            const r = bitmap.data[ index ];
            const g = bitmap.data[ index + 1 ];
            const b = bitmap.data[ index + 2 ];
            const a = bitmap.data[ index + 3 ];
            image.setPixelColor(Jimp.rgbaToInt(this.randman(r),this.randman(g),this.randman(b),a), x, y);

            if (x % (width / (width / 2)) == 0) {
                if (y % (height / (height / 6)) != 0) {
                    image.setPixelColor(Jimp.rgbaToInt(r, g, b , a), x, y);
                    if (x % 2 == 0) {
                        image.setPixelColor(Jimp.rgbaToInt(r, this.randman(g), this.randman(b), a), x, y);
                    }
                }
            }

            if (x % (width / (width / 4)) == 0) {
                if (y % (height / (height / 6)) != 0) {
                    image.setPixelColor(Jimp.rgbaToInt(this.randman(r), g, this.randman(b), a), x, y);
                }
            }

            if (x % (width / (width / 8)) == 0) {
                if (y % (height / (height / 6)) != 0) {
                    image.setPixelColor(Jimp.rgbaToInt(this.randman(r), this.randman(g), b, a), x, y);
                }
            }
        });
        return image;
    }

    private randman(prim: number) {
        return Math.random() > 0.5 ? prim / 2 : prim / 4;
    }
}

export const ledTexture = new LEDTexture();