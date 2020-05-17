import { ValidateSwitchType } from '../enums/ValidateSwitchType';
import { Credentials } from './Credentials';
export interface Options {
    verbose?: boolean;
    methods: ValidateSwitchType[];
    credentials: Credentials;
}
