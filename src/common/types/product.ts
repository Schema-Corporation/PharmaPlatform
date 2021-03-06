import { IBranch } from './branch';
import { IProductType } from './productType';

export interface IProduct {
    id?: string;
    commercialName?: string;
    code?: string;
    labName?: string;
    useDescription?: string;
    stockId?: string;
    amount?: number;
    imgUrl?: string;
    productType?: string;
    branchId?: string;
    price?: number;
}
