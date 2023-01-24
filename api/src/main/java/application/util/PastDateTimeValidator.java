package application.util;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDateTime;

public class PastDateTimeValidator implements
        ConstraintValidator<PastDateTime, LocalDateTime> {

    @Override
    public void initialize(PastDateTime date) {
    }

    @Override
    public boolean isValid(LocalDateTime date,
                           ConstraintValidatorContext cxt) {
        return date.isBefore(LocalDateTime.now());
    }
}
