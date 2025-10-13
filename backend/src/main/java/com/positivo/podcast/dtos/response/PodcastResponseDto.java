package com.positivo.podcast.dtos.response;

public record PodcastResponseDto(
    Long id,
    String titulo,
    String descricao,
    String capaUrl,
    String audioUrl
) {}
