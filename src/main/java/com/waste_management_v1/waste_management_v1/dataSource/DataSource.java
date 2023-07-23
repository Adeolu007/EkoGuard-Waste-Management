package com.waste_management_v1.waste_management_v1.dataSource;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
public class DataSource {
    @Bean
    @ConfigurationProperties("spring.datasource")
    public HikariDataSource hikariDataSource(){
        return DataSourceBuilder
                .create()
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .url("jdbc:mysql://vitalityhub.c4honoauco01.us-east-1.rds.amazonaws.com:3306/wastemanagement")
                .username("root")
                .password("Adettob239")
                .type(HikariDataSource.class)
                .build();
    }
}
