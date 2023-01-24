package application.util;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDate;

public class PastDateValidator implements
        ConstraintValidator<PastDate, LocalDate> {

    @Override
    public void initialize(PastDate date) {
    }

    @Override
    public boolean isValid(LocalDate date,
                           ConstraintValidatorContext cxt) {
        return date.isBefore(LocalDate.now());
    }
}
