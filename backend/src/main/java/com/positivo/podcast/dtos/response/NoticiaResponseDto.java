package com.positivo.podcast.dtos.response;

public record NoticiaResponseDto(
    Long id,
    String titulo,
    String descricao,
    String capaUrl
) {}
