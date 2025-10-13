package com.positivo.podcast.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.positivo.podcast.entities.Podcast;

@Repository
public interface PodcastRepository extends JpaRepository<Podcast, Long> {

    Optional<Podcast> findByTitulo(String titulo);
}
