package config;

import org.junit.jupiter.api.extension.AfterAllCallback;
import org.junit.jupiter.api.extension.BeforeAllCallback;
import org.junit.jupiter.api.extension.ExtensionContext;


public class DatabaseConfig implements AfterAllCallback, BeforeAllCallback {


    @Override
    public void beforeAll(ExtensionContext extensionContext) {
        System.out.println("Before the test class is executed");
    }


    @Override
    public void afterAll(ExtensionContext extensionContext) {
        System.out.println("After the test class is executed");
    }
}