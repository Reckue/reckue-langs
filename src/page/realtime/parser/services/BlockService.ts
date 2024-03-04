import { SizeModel } from "../../../../lib/models/SizeModel";

// export class BlockService {

//     getSize = (ref: HTMLElement) => {
//         return new SizeModel(ref.offsetWidth, ref.offsetHeight);
//     }

// }

export const getSize = (ref: HTMLElement) :SizeModel => {
    return new SizeModel(ref.offsetWidth, ref.offsetHeight);
}