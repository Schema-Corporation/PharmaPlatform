import { IBranch } from './branch';
import { IProductType } from './productType';

export interface IProduct {
    id?: string;
    name?: string;
    code?: string;
    labName?: string;
    useDescription?: string;
    stock?: number;
    productTypeId?: string;
    branchId?: string;
}
