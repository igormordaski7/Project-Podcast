package com.positivo.podcast.dtos.response;

public record AuthResponseDto(
    String token,
    UsuarioResponseDto usuario
) {}
