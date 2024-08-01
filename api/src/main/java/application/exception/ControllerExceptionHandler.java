package application.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
@Slf4j
public class ControllerExceptionHandler {

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<ErrorMsg> handleConstraintViolationException(ConstraintViolationException e) {
        return new ResponseEntity<>(new ErrorMsg(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public  ResponseEntity<Map<String, String>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors,  HttpStatus.BAD_REQUEST);
    }

    /*@ExceptionHandler(InvalidFormatException.class)
    public ResponseEntity<Map<String, String>> handleInvalidFormatException(InvalidFormatException e) {
        Map<String, String> errors = new HashMap<>();
        String fieldName = e.getPath().stream()
                .map(ref -> ref.getFieldName())
                .findFirst()
                .orElse("unknown");
        String errorMessage = "Invalid value: " + e.getValue();
        errors.put(fieldName, errorMessage);
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }*/

}
