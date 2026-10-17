
package com.campusfix.campusfixbackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class AIService {

    private final RestClient restClient;

    public AIService(
            @Value("${ai.service.url:http://127.0.0.1:8000}")
            String aiServiceUrl) {

        this.restClient = RestClient.builder()
                .baseUrl(aiServiceUrl)
                .build();
    }

    public Map<String, String> predictComplaint(String complaint) {

        Map<String, String> request = Map.of(
                "complaint", complaint
        );

        Map<?, ?> response = restClient.post()
                .uri("/predict")
                .body(request)
                .retrieve()
                .body(Map.class);

        return Map.of(
                "category", response.get("category").toString(),
                "priority", response.get("priority").toString()
        );
    }
}
