<%@ page import="model.Point" %>
<%@ page import="java.util.Collections" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<jsp:useBean id="history" type="beans.History" scope="session"/>
<html>
<head>
    <meta charset="UTF-8">
    <title>Web Development 2</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/styles/main.css">
</head>
<body>
<div id="header">Лабораторная работа №1.
    Щербаков В.Ю. P3214. <span class="variant"> Вариант 214023.</span>
</div>
<div id="Wrapper">
    <div id="leftsidebar">
    </div>
    <div id="Top">
        ПОПАДАЕТ ЛИ ТВОЯ ТОЧКА В ЭТОТ ГРАФИК?
    </div>
</div>
<div id="Wrapper2">
    <div id="leftsidebar2">
    </div>
<div id="main">
    <form id="main-form" action="" method="post">
        <div class="step">
                <p>Шаг первый - выберите радиус.</p></br>
            <div id="buttons">
            <button type="button" class="r-button" value="1">1</button>
            <button type="button" class="r-button" value="1.5">1.5</button>
            <button type="button" class="r-button" value="2">2</button>
            <button type="button" class="r-button" value="2.5">2.5</button>
            <button type="button" class="r-button" value="3">3</button>
            </div>
            <span class="warn-checkbox"  hidden>Не выбрано значение радиуса</span>
            <input type="hidden" name="offset">
        </div>
        <div class="step">
                <p>Шаг второй - выберите Х.</p></br>
                Всего лишь введи число от -4 до 4 в это поле!</br>
            <label>
                <input type="text" name="X" placeholder="от -4 до 4" maxlength="15">
            </label></br>
            <span class="warn-checkbox" hidden>Введено не число</span>
            <span class="warn-checkbox" hidden>Число выходит за пределы интервала </span>
        </div>
        <div class="step">
            <p>Шаг третий - выберите Y.</p></br>
            Всего лишь введи число от -5 до 5 в это поле!</br>
            <label>
                <input type="text" name="Y" placeholder="от -5 до 5" maxlength="15">
            </label></br>
            <input type="hidden" name="R">
            <span class="warn-checkbox" hidden>Введено не число</span>
            <span class="warn-checkbox" hidden>Число выходит за пределы интервала </span>
        </div><br>
        <button type="submit" class="submit-button">Проверить</button>
        <button type="button" class="submit-button" style="margin-left: 20px">Очистить</button>
    </form><br>
    <%if (history.getList().size()>0){%>
    <div id="history-block">
    <span class="table-text">Результаты</span></br>
    <button type="button" onclick="clearHistory()" class="history-button">Очистить историю</button><br>
    <table id="result-table">
        <tr id="table-headers"><th>Координата X</th><th>Координата Y</th><th>Радиус R</th><th>Попадание</th><th>Дата и время запроса</th></tr>
        <%
            List<Point> list = new ArrayList<Point>(history.getList());
            Collections.reverse(list);
            for (Point p : list){%>
        <tr><td><%=p.getX()%></td><td><%=p.getY()%></td><td><%=p.getR()%></td><td><%=p.isInArea()%></td><td><%=p.getTime()%></td></tr>
        <%}%>
    </table>
    </div>
    <%}%>
</div>
    <div id="rightsidebar">
        <div class="canvas-container">
        <canvas height="300px" width="300px"></canvas>
        </div>
    </div>
</div>
<div id="footer">Copyright &copy;ItmoLabs all rights were broken</div>
<script src="${pageContext.request.contextPath}/scripts/drawing.js"></script>
<script src="${pageContext.request.contextPath}/scripts/main.js"></script>
<script src="${pageContext.request.contextPath}/scripts/ajax.js"></script>
</body>
</html>
