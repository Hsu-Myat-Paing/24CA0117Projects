Postimport jakarta.servlet.ServletException;
import jakarta.servlet.ServletContext;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Post;
import jakarta.servlet.RequestDispatcher;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

@WebServlet("/DelServlet")
public class DelServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) 
    throws IOException, ServletException {
        
        ServletContext context = getServletContext();
        context.removeAttribute("posts");
        //RequestDispatcher dispatcher = request.getRequestDispatcher("update.html");
        //dispatcher.include(request, response);
        response.sendRedirect("update.html");

    }
}

