import { IBranch } from './branch';
import { IProductType } from './productType';

export interface IProduct {
    id?: number;
    name?: string;
    code?: number;
    useDescription?: string;
    stock?: number;
    productTypeId?: string;
    branchId?: string;
}
