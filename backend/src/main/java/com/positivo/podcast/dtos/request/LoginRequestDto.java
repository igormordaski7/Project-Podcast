package com.positivo.podcast.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDto(
    @NotBlank(message = "Email não pode ser vazio")
    @Email(message = "Formato de email inválido")
    String email,

    @NotBlank(message = "Senha não pode ser vazia")
    String senha
) {}
