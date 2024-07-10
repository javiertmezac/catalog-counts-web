import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MatchPassword(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
        const passwordControl = formGroup.get(passwordKey);
        const confirmPasswordControl = formGroup.get(confirmPasswordKey);

        if (!passwordControl || !confirmPasswordControl) {
            return null;
        }

        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ mustMatch: true });
            return { mustMatch: true };
        } else {
            confirmPasswordControl.setErrors(null);
            return null;
        }
    };
};