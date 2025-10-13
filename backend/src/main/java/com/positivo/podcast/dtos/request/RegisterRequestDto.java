package com.positivo.podcast.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequestDto(
    @NotBlank(message = "Nome não pode ser vazio")
    String nome,

    @NotBlank(message = "Email não pode ser vazio")
    @Email(message = "Formato de email inválido")
    String email,

    @NotBlank(message = "Senha não pode ser vazia")
    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
    String senha
) {}
