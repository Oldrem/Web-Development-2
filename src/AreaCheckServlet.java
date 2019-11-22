import beans.History;
import model.Point;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        History history = (History) req.getSession().getAttribute("history");
        double x;
        double y;
        double r;
        int offset;
        try {
            x = Double.parseDouble(req.getParameter("X"));
            y = Double.parseDouble(req.getParameter("Y"));
            r = Double.parseDouble(req.getParameter("R"));
            if (x > 4 || x < -4 || y < -5 || y > 5 || (r != 1 && r != 1.5 && r != 2 && r != 2.5 && r != 3)) {
                throw new NumberFormatException();
            }
        } catch (NumberFormatException e) {
            resp.getWriter().println("<h1>Incorrect parameters</h1>");
            return;
        }
        try {
            offset = Integer.parseInt(req.getParameter("offset"));
        }
        catch (NumberFormatException e){
            offset = 0;
        }

        Point point = new Point(x, y, r, offset);
        if (req.getParameter("type") != null && req.getParameter("type").equals("ajax")) {
            history.addPoint(point);
            resp.setContentType("text/json; charset=UTF-8");
            PrintWriter out = resp.getWriter();
            out.println("{\"x\": " + point.getX() + ", \"y\": " + point.getY() + ", \"r\": " + point.getR() + ", \"inArea\": \"" + point.isInArea() + "\", \"time\": \"" + point.getTime() + "\"}");
        }
        else if(req.getParameter("type") != null && req.getParameter("type").equals("ajax-no-cache")){
            resp.setContentType("text/json; charset=UTF-8");
            PrintWriter out = resp.getWriter();
            out.println("{\"x\": " + point.getX() + ", \"y\": " + point.getY() + ", \"r\": " + point.getR() + ", \"inArea\": \"" + point.isInArea() + "\", \"time\": \"" + point.getTime() + "\"}");
        }
        else {
            history.addPoint(point);
            resp.setContentType("text/html; charset=UTF-8");
            PrintWriter out = resp.getWriter();
            out.println("<html>\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <title>Web Development 2</title>\n" +
                    "    <link rel=\"stylesheet\" href=\"" + req.getContextPath() + "/styles/main.css\">\n" +
                    "</head>\n" +
                    " <body>\n" +
                    "<div id=\"header\">Лабораторная работа №1.\n" +
                    "    Щербаков В.Ю. P3214. <span class=\"variant\"> Вариант 214023.</span>\n" +
                    "</div>\n" +
                    "<div id=\"Wrapper\">\n" +
                    "    <div id=\"leftsidebar\">\n" +
                    "    </div>\n" +
                    "    <div id=\"Top\">\n" +
                    "        ПОПАДАЕТ ЛИ ТВОЯ ТОЧКА В ЭТОТ ГРАФИК?\n" +
                    "    </div>\n" +
                    "</div>\n" +
                    "<div id=\"Wrapper2\">\n" +
                    "    <div id=\"leftsidebar2\">\n" +
                    "    </div>\n" +
                    "<div class=\"main\">\n" +
                    "<span class=\"table-text\">Результаты</span></br>\n" +
                    "<table id=\"result-table\">\n" +
                    " <tr><th>Координата X</th><th>Координата Y</th><th>Радиус R</th><th>Попадание</th></tr>\n" +
                    "  <tr><td>" + point.getX() + "</td><td>" + point.getY() + "</td><td>" + point.getR() + "</td><td>" + point.isInArea() + "</td>\n" +
                    " </table></br>\n" +
                    "<a href=\""+ req.getContextPath() +"\"><button class=\"submit-button\">Назад</button></a>\n" +
                    "</div>\n" +
                    "<div id=\"rightsidebar\">\n" +
                    "    </div>\n" +
                    "</div>\n" +
                    "<div id=\"footer\">Copyright &copy;ItmoLabs all rights were broken</div>\n" +
                    "</body></html>");
        }

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.sendRedirect(this.getServletContext().getContextPath());
    }
}
