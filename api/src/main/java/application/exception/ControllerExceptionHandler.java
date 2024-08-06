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
               .map(JsonMappingException.Reference::getFieldName)
                .findFirst()
                .orElse("unknown");
        String errorMessage = "Invalid value: " + e.getValue();
        errors.put(fieldName, errorMessage);
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }*/

   /* @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        Map<String, String> errors = new HashMap<>();

        Throwable mostSpecificCause = e.getMostSpecificCause();
        if (mostSpecificCause instanceof InvalidFormatException) {
            InvalidFormatException invalidFormatException = (InvalidFormatException) mostSpecificCause;
            String fieldName = invalidFormatException.getPath().stream()
                    .map(JsonMappingException.Reference::getFieldName)
                    .findFirst()
                    .orElse("unknown");
            String errorMessage = "Invalid value for field: " + fieldName + ". Provided value: " + invalidFormatException.getValue();
            errors.put(fieldName, errorMessage);
        } else {
            errors.put("error", "Invalid request payload");
        }

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }*/

    /*  @ExceptionHandler({SavedSearchException.class})
    public ResponseEntity<ErrorMsg> handleSavedSearchException(SavedSearchException e) {
        String message = e.getCause() != null ? e.getLocalizedMessage() + " : " + e.getCause().getLocalizedMessage() :
                e.getLocalizedMessage();
        return new ResponseEntity<>(new ErrorMsg(HttpStatus.INTERNAL_SERVER_ERROR,
                message),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }*/
}
