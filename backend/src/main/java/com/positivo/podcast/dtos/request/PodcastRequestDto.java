package com.positivo.podcast.dtos.request;

import org.hibernate.validator.constraints.URL;

import jakarta.validation.constraints.NotBlank;

public record PodcastRequestDto(
    @NotBlank String titulo,
    @NotBlank String descricao,
    @URL String capaUrl,
    @URL String audioUrl
) {}
