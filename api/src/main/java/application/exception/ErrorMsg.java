package application.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
@AllArgsConstructor
public class ErrorMsg {

	private HttpStatus statusCode;
	private String message;
	private List<String> errors;

	public ErrorMsg(HttpStatus statusCode, String message) {
		this.statusCode = statusCode;
		this.message = message;
	}
}

