package com.positivo.podcast.exceptions;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

// Herda de StandardError e adiciona uma lista de erros de campo
public class ValidationError extends StandardError {
    private List<FieldMessage> errors = new ArrayList<>();

    public ValidationError(Instant timestamp, Integer status, String error, String message, String path) {
        super(timestamp, status, error, message, path);
    }

    public List<FieldMessage> getErrors() {
        return errors;
    }

    public void addError(String fieldName, String message) {
        errors.add(new FieldMessage(fieldName, message));
    }
}

// Classe auxiliar para cada erro de campo
record FieldMessage(String fieldName, String message) {}
