import { IBranch } from './branch';
import { IProductType } from './productType';

export interface IProduct {
    id?: number;
    name?: string;
    code?: number;
    stock?: number;
    productType?: IProductType;
    branch?: IBranch;
}
