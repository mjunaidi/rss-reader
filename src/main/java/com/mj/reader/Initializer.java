package com.mj.reader;

import java.util.EnumSet;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class Initializer implements WebApplicationInitializer {

    public void onStartup(ServletContext servletContext) throws ServletException {

        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(WebAppConfig.class);
        servletContext.addListener(new ContextLoaderListener(ctx));

        ctx.setServletContext(servletContext);

        Dynamic servlet = servletContext.addServlet("dispatcher", new DispatcherServlet(ctx));

        if (servlet != null) {
            servlet.addMapping("/");
            servlet.setLoadOnStartup(1);
        }

        // security filter
        org.springframework.web.filter.DelegatingFilterProxy delegatingFilterProxy = new org.springframework.web.filter.DelegatingFilterProxy(
                "springSecurityFilterChain");
        FilterRegistration.Dynamic securityFilterDynamic = servletContext.addFilter("securityFilter", delegatingFilterProxy);

        if (securityFilterDynamic != null) {
            securityFilterDynamic.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");
        }
    }

}
