package br.feevale.looky;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableZuulProxy
@SpringBootApplication
public class UIApplication {

    public static void main(String[] args) {
        SpringApplication.run(UIApplication.class, args);
    }
}
