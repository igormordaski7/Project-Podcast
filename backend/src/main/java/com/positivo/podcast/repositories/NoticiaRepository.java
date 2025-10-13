package com.positivo.podcast.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.positivo.podcast.entities.Noticia;

public interface NoticiaRepository extends JpaRepository<Noticia, Long>{
    
}
