package com.sjtu.jpw.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class DemoController {

    @RequestMapping("/hi")
    public String Hello(HttpServletRequest request, HttpServletResponse response) {
        return "/index.html";
    }
}

/*
    demo- how to use service

    @Resource(name="demoService")
    private demoService demoService;
    @RequestMapping(value="/shows",produces="application/json;charset=UTF-8")
    public void Hello(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

       Integer demo=demoService.userValidation("asd","123");

        System.out.println(demo);
        out.print(demo);
        if(out!=null) {
            out.flush();
        }
    }
    */