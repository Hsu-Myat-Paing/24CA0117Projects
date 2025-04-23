import model.Post;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletContext;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet("/PostServlet")
public class PostServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Retrieve the application context
        ServletContext context = getServletContext();

        // Retrieve or initialize the list of posts from the application scope
        @SuppressWarnings("unchecked")
        List<Post> posts = (List<Post>) context.getAttribute("posts");
        
        if (posts == null) {
            // If no posts exist, initialize the list
            posts = new ArrayList<>();
            context.setAttribute("posts", posts);
        }

        // Retrieve form data
        String name = request.getParameter("name");
        String message = request.getParameter("message");
        String fontSize = request.getParameter("fontSize");
        String color = request.getParameter("color");
        String fontWeight = request.getParameter("fontWeight");

        // Create a formatted date
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = formatter.format(new Date()); // Get the current date and time

        // Create a new Post object and add it to the list
        Post post = new Post(name, message, date, fontSize, color, fontWeight);
        posts.add(post);

        // Update the application context with the new posts list
        context.setAttribute("posts", posts);

        // Forward the request to bbs.jsp
        RequestDispatcher dispatcher = request.getRequestDispatcher("bbs.jsp");
        try {
            dispatcher.forward(request, response);
        } catch (Exception e) {
            // Handle the error gracefully
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "There was an error processing your request.");
        }
    }
}
