package com.dimativator.weblab4_backend.repository;

import com.dimativator.weblab4_backend.model.Shot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShotRepository extends JpaRepository<Shot, Long> {

}
