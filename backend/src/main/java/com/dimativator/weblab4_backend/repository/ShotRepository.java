package com.dimativator.weblab4_backend.repository;

import com.dimativator.weblab4_backend.model.Shot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShotRepository extends JpaRepository<Shot, Long> {
    @Query("SELECT s FROM Shot s WHERE s.username = :username")
    List<Shot> findByUsername(@Param("username") String username);

}
