package com.positivo.podcast.dtos.response;

public record UsuarioResponseDto(
    Long id,
    String nome,
    String email,
    String role
) {}
