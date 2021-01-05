function post() {
    var questionId = $("#question_id").val();
    var content = $("#comment_content").val();
    if (!content) {
        alert("不能回复空内容！");
        return;
    }
    comment2target(questionId, 1, content);
}

function comment2target(targetId, type, content) {

    if (!content) {
        alert("不能回复空内容！");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/comment",
        contentType: 'application/json',
        data: JSON.stringify({
            "parentId": targetId,
            "content": content,
            "type": type
        }),
        success: function (response) {
            if (response.code == 200) {
                window.location.reload();
            } else {
                if (response.code == 2003) {
                    var isAccepted = confirm(response.message);
                    if (isAccepted) {
                        window.open("https://github.com/login/oauth/authorize?client_id=d9c929b9090a1b880a67&redirect_uri=http://localhost:8887/callback&scope=user&state=1");
                        window.localStorage.setItem("closable", true);
                    }
                } else {
                    alert(response.message);
                }
            }
        },
        dataType: "json"
    });
}

function comment(e) {
    var commentId = e.getAttribute("data-id");
    var content = $("#input-" + commentId).val();
    comment2target(commentId, 2, content);
}

function collapseComments(e) {
    var id = e.getAttribute("data-id");
    var comments = $("#comment-" + id);

    var collapse = e.getAttribute("data-collapse");
    if (collapse) {
        comments.removeClass("in");
        e.removeAttribute("data-collapse");
        e.classList.remove("active");
    } else {
        var subCommentContainer = $("#comment-" + id);
        if (subCommentContainer.children().length != 1) {
            comments.addClass("in");
            e.setAttribute("data-collapse", "in");
            e.classList.add("active");
        } else {
            $.getJSON("/comment/" + id, function (data) {
                $.each(data.data, function (index, comment) {

                    var mediaLeftElement= $("<div/>",{
                        "class": "media-left"
                    }).append($("<img/>",{
                        "class": "media-object img-rounded",
                        "src":comment.user.avatarUrl
                    }));

                    var mediaBodyElement= $("<div/>",{
                        "class": "media-body"
                    }).append($("<h5/>",{
                        "class": "media-heading"
                    }).append($("<span/>",{
                        "html": comment.user.name + " | "
                    }).append($("<span/>",{
                        "class":"menu",
                        "html": moment(comment.gmtCreate).format('YYYY-MM-DD')
                    })).append($("<div/>",{
                        "html":comment.content
                    }))));

                    var mediaElement = $("<div/>",{
                        "class": "media"
                    }).append(mediaLeftElement).append(mediaBodyElement);

                    var commentElement = $("<div/>", {
                        "class": "comments"
                    }).append(mediaElement).append($("<hr/>"));
                    subCommentContainer.prepend(commentElement);
                });
                comments.addClass("in");
                e.setAttribute("data-collapse", "in");
                e.classList.add("active");
            });
        }
    }

}
