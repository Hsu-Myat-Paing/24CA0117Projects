<%@page contentType="text/html; charset=UTF-8" %>
<%@page import="java.util.ArrayList" %>
<%@page import="model.Post" %>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/decor.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>掲示板画面</title>
</head>
<body>
    <div class="bulletin-board"> <!-- Added container for bulletin board -->
        <h1>掲　示　板</h1>
        <h2>- BBS -</h2>
        <a href="index.html">メニューに戻る</a>

        <%
            ArrayList<Post> posts = (ArrayList<Post>) application.getAttribute("posts");

            if (posts == null || posts.isEmpty()) {
        %>  
            <div class="no-posts">
                <p>投稿されていません</p>
            </div>
        <%
            } else {
                for (Post post : posts) {
        %>
        <div class="post">
            <!-- Name and Date -->
            <p class="post-header">
                名前: <%= post.getName() %> - 日時: <%= post.getDate() %>
            </p>
            
            <!-- Message with user settings -->
            <p class="message" style="font-size: <%= post.getFontSize() %>; color: <%= post.getColor() %>; font-weight: <%= post.getFontWeight() %>;">
                <%= post.getMessage() %>
            </p>
        </div>
        <%
                }
            }
        %>  
    </div>
   
</body>
</html>
